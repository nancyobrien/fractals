import React, { Component } from 'react';
import { connect } from 'react-redux';


import Rectangle from './components/Rectangle';

function mapStateToProps(state) {
	return {

	};
}

class App extends Component {
	render() {
		const baseSize = 100;
		const basePosition = {x: 200, y: 350};

		return (
			<div>
				<svg width="500" height="500" viewBox="0 0 500 500"
					xmlns="http://www.w3.org/2000/svg">

					<Rectangle size={baseSize} position={basePosition} rotation={0} /> 
				</svg>
			</div>
		);
	}
}


export default connect(
	mapStateToProps,
)(App);
