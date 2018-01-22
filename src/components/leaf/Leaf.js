import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { isFalling , getWindSpeed } from '../../modules/main';


class Leaf extends Component {

	constructor(props) {
		super(props)

		this.state = {
			animating: true,
			opacity: (this.props.generation > 2) ? (Math.random() * .75 + .25) : 1,
			color: 'color'+ (Math.ceil(Math.random() * 7)),
			drawRadius: (this.props.generation < 5) ? this.props.size * 0.5 :  this.props.size,
			position: this.props.position,
			originalPosition: this.props.position,
			onGround: false,
			iteration: 0,
			timer: -1
		}
	}

	componentDidMount = () => {
		setTimeout(() => {
			this.setState({ animating: false });
		}, Math.min(10, this.props.animationDelay - 1));
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('leaf props', this.props, nextProps);
		if (this.props.falling && !nextProps.falling) {
			this.setState({ animating: true, onGround: false});

			setTimeout(() => {
				console.log('toggle bCK');
				this.setState({ animating: false });
			}, 1000);
		}

		if (nextProps.falling) {
			if (!this.state.onGround) setTimeout(this.updatePosition, 10);
		} else {
			clearTimeout(this.state.timer);
			this.setState({ position: this.state.originalPosition });
		}
	}
	
	updatePosition = () => {
		const wind = this.props.windSpeed * (Math.random() + .5);
		const angle = this.state.iteration * Math.PI / 180;
		const deltaY = 1 / (50 * Math.random() +0.1);

		let newY = Math.max(this.state.position.y * (1 - deltaY), 0);
		const changeY = 250 * Math.pow((this.state.originalPosition.y - newY) / this.state.originalPosition.y, 0.8);
		const newX = (Math.sin(angle) * (changeY * (Math.random() - 0.5))) + this.state.position.x + wind;

		let timer = this.state.timer;
		let onGround = true;
		if (newY > this.state.originalPosition.y * .05) {
			onGround = false;
			timer = setTimeout(this.updatePosition, 10);
		}  else {
			newY = 0;
		}
		this.setState({ onGround: onGround, position: { x: newX, y: newY }, timer, iteration: this.state.iteration + 3.6 })
		
	}

	render() {
		const { animating, opacity, color, drawRadius, position, onGround } = this.state;
		const { size, generation, falling } = this.props;

		const animationClass = (animating) ? 'start' : '';

		const fallingClass = (falling) ? 'falling' + ((onGround) ? ' decaying' : '')  : '';

		let leafStyle = {};
		let animationStyle = {};
		leafStyle = { transform: 'translate(' + position.x + 'px, ' + position.y + 'px)', transitionDelay: '0s' };

		if (falling) {
			//animation is color, transform
			//leafStyle = { transform: 'translate(' + position.x + 'px, 0px)', transitionDelay: 0 };
			animationStyle = { transitionDelay: '0s' };

		} else {
			//leafStyle = { transform: 'translate(' + position.x + 'px, ' + position.y + 'px)', transitionDelay:  '0s' };
			animationStyle = { transitionDelay: '0s' };
			//animationStyle = { transitionDelay: '0s, ' + ((20 - generation) * 5) + 'ms' };

		}

		return (
			<g style={leafStyle} className={'leafContainer ' + fallingClass}>
				<circle className={'leaf ' + color + ' ' + animationClass } style={animationStyle} cx={0} cy={0}  r={drawRadius} fillOpacity={opacity} />
			</g>
		);
	}
}

Leaf.propTypes = {
	position: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}).isRequired,
	size: PropTypes.number,
	generation: PropTypes.number,
	animationDelay: PropTypes.number
};

Leaf.defaultProps = {
	size: 100,
	generation: 1,
	animationDelay: 100,

};

const mapStateToProps = state => {
  	return {
		falling: isFalling(state),
		windSpeed: getWindSpeed(state)
  	}
}

export default connect(mapStateToProps,{})(Leaf)