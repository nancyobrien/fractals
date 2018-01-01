import React, { Component } from 'react';
import { connect } from 'react-redux';


import Rectangle from './components/Rectangle';

function mapStateToProps(state) {
	return {

	};
}

class App extends Component {
	render() {
		const baseSize = 200;
		const basePosition = {x: 200, y: 0};

		return (
			<div>
				<svg width="1500" height="750" viewBox="0 0 500 1000" transform="rotate(180)"
					xmlns="http://www.w3.org/2000/svg">

					<Rectangle size={baseSize} anchorPoint={basePosition} rotation={0} isRoot={true} type="root" /> 
				</svg>
			</div>
		);
	}
}


export default connect(
	mapStateToProps,
)(App);
