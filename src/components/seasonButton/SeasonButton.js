import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isFalling, toggleSeason } from '../../modules/main';


function mapStateToProps(state) {
	return {
		isFalling: isFalling(state)
	};
}

class SeasonButton extends Component {
	toggleLeaves = () => {
		this.props.toggleSeason();
	}
	render() {
		const { isFalling } = this.props;
		const buttonText = (isFalling) ? 'Time for Spring' : 'Time for Autumn'
		return (
			<button className="seasonChanger" onClick={this.toggleLeaves}>{buttonText}</button>
		);
	}
}

export default connect(mapStateToProps, {
	toggleSeason
}
)(SeasonButton);
