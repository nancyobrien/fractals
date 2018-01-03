import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/index.scss';

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
				<svg width="1500" height="750" viewBox="0 0 500 1000" transform="rotate(180.1)"
					xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0" style={{stopColor:"slategrey", stopOpacity:1}} />
							<stop offset="1" style={{stopColor:"slategrey", stopOpacity:1}} >
								<animate 
									attributeName="offset" 
									from="0"
									to="1"
									dur="2s"
									repeatCount="0"
								/>
							</stop>
							<stop offset="1" style={{stopColor:"white", stopOpacity:0}} />
						</linearGradient>
					</defs>
					<Rectangle size={baseSize} anchorPoint={basePosition} rotation={0} isRoot={true} type="root" /> 
				</svg>
			</div>
		);
	}
}


export default connect(
	mapStateToProps,
)(App);
