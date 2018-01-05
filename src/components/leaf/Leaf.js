import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { isFalling } from '../../modules/main';

class Leaf extends Component {

	constructor(props) {
		super(props)

		this.state = {
			animating: true,
			opacity: (this.props.generation > 2) ? (Math.random() * .75 + .25) : 1,
			color: 'color'+ (Math.ceil(Math.random() * 7)),
			drawRadius: (this.props.generation < 5) ? this.props.size * 0.5 :  this.props.size,
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
			this.setState({animating: true});

			setTimeout(() => {
				console.log('toggle bCK');
				this.setState({ animating: false });
			}, 1000);
		}
	}


	render() {
		const { animating, opacity, color, drawRadius } = this.state;
		const { position, size, generation, falling } = this.props;

		const animationClass = (animating) ? 'start' : '';

		const fallingClass = (falling) ? 'falling' : '';

		let leafStyle = {};
		let animationStyle = {};
		if (falling) {
			//animation is color, transform
			leafStyle = { transform: 'translate(' + position.x + 'px, 0px)', transitionDelay: ((20 - generation) * 50) + 'ms' };
			animationStyle = { transitionDelay: '0s' };

		} else {
			leafStyle = { transform: 'translate(' + position.x + 'px, ' + position.y + 'px)', transitionDelay:  '0s' };
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
    falling: isFalling(state)
  }
}

export default connect(mapStateToProps,{})(Leaf)