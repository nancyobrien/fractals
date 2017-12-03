import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
	return {

	};
}

class App extends Component {
	render() {
		return (
			<div>
				App
			</div>
		);
	}
}

App.propTypes = {

};

export default connect(
	mapStateToProps,
)(App);
