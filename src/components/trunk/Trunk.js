import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Leaf from '../Leaf';

class Trunk extends Component {



	render() {
		const { size, anchorPoint, width } = this.props;

		const lineLeft = {
			stroke: 'grey',
			strokeWidth: width
		};


		return (
			<Fragment>
				<g>
					<line x1={anchorPoint.x} y1={anchorPoint.y} x2={anchorPoint.x} y2={anchorPoint.y + size} style={lineLeft} />
				</g>

			</Fragment>
		);
	}
}

Trunk.propTypes = {
	size: PropTypes.number,
	anchorPoint: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
	width: PropTypes.number
};

Trunk.defaultProps = {
	size: 100,
	anchorPoint: { x: 0, y: 0 },
	width: 30
};

export default Trunk
