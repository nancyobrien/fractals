import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 

import { getWindSpeed, setWindSpeed } from '../../modules/main';


function mapStateToProps(state) {
	return {
		windSpeed: getWindSpeed(state)
	};
}

class WindSock extends Component {

	handleChange = (value) => {
		this.props.setWindSpeed(value);
	};

	render() {
		const { min, max, step, defaultValue, windSpeed } = this.props;

		return (
			<div className='slider'>
				<Slider
					min={min}
					max={max}
					step={step}
					defaultValue={defaultValue}
					onChange={this.handleChange}
				/>
				<div className='value'>{windSpeed}</div>
			</div>
		)
	}
}

WindSock.propTypes = {
	max: PropTypes.number,
	min: PropTypes.number,
	step: PropTypes.number,
	defaultValue: PropTypes.number
};

WindSock.defaultProps = {
	max: 10,
	min: -10,
	step: 0.1,
	defaultValue: 0
};

export default connect(mapStateToProps, {
	setWindSpeed
}
)(WindSock);

