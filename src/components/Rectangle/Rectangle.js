import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Rectangle extends Component {

	render() {
		const { size, position, rotation, color, rotationPoint } = this.props;
		const rotationRadians = rotation * Math.PI / 180;
		const stepAngle = 45 * Math.PI / 180;
		let rotPt = rotationPoint;
		if (rotationPoint === null) {
			rotPt = position;
		}
		const transform = 'rotate(' + rotation + ' ' + rotPt.x + ' ' + rotPt.y + ')'
		const childSize = Math.sqrt(2) * 0.5 * size;
		//const childPosition1 = { x: position.x, y: position.y - childSize, rotationPoint: { x: position.x, y: position.y } };

		let childPosition1 = {
			x: position.x + (size * Math.sin(rotationRadians)),
			y: position.y + (size - size * Math.cos(rotationRadians)) - childSize, //- (size * Math.sin(rotationRadians)),
			angle: (rotation - 45)
		};
		childPosition1.rotationPoint = { x: (childPosition1.x), y: childPosition1.y + childSize };



		let childPosition2 = {
			x: position.x + (size * Math.cos(rotationRadians)) - childSize,
			y: position.y + (size * Math.sin(rotationRadians)) - childSize,
			angle: (rotation + 45)
		};
		childPosition2.rotationPoint = { x: (childPosition2.x + childSize), y: childPosition2.y + childSize};

		console.log(size, position, childPosition1, childPosition2);

		return (
			<Fragment>
				<rect x={position.x} y={position.y} width={size} height={size} fill={color} transform={transform} ></rect>

				{(() => {
					if (size >= 60) { 
						return (
							<Fragment>
								<Rectangle color='green' size={childSize} position={childPosition1} rotation={childPosition1.angle} rotationPoint={childPosition1.rotationPoint} />
								<Rectangle color='red' size={childSize} position={childPosition2} rotation={childPosition2.angle}  rotationPoint={childPosition2.rotationPoint}/>
							</Fragment>
						)
						
					}
				})()}
			</Fragment>
		);
	}
}

Rectangle.propTypes = {
	size: PropTypes.number,
	position: PropTypes.object,
	rotation: PropTypes.number,
	rotationPoint: PropTypes.object,
	color: PropTypes.string
};

Rectangle.defaultProps = {
	size: 100,
	position: {x: 0, y: 0},
	rotation: 0,
	rotationPoint: null,
	color: "black"
};

export default Rectangle; 