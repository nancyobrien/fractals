import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Rectangle extends Component {


	getMidPoint = (x, y, width, height, angle_degrees) => {
		var angle_rad = angle_degrees * Math.PI / 180;
		var cosa = Math.cos(angle_rad);
		var sina = Math.sin(angle_rad);
		var wp = width / 2;
		var hp = height / 2;
		return {
			x: (x + wp * cosa - hp * sina),
			y: (y + wp * sina + hp * cosa)
		};
	}

	render() {
		const { size, anchorPoint, rotation, color, type, isRoot, parentType, parentRotation } = this.props;
		const rotationRadians = rotation * Math.PI / 180;
		const stepAngle = 45;

		let childPosition1 = {};


		let childPosition2 = {};


		const points = [];
		points[0] = anchorPoint;

		if (parentType === 'root') {
			if (type === 'left' || type === 'root') {
				points[1] = { x: anchorPoint.x + (size * Math.cos(rotationRadians)), y: anchorPoint.y + (size * Math.sin(rotationRadians)) };
				points[2] = { x: anchorPoint.x - size * (Math.sin(rotationRadians) - Math.cos(rotationRadians)), y: anchorPoint.y + size * (Math.sin(rotationRadians) + Math.cos(rotationRadians)) };
				points[3] = { x: anchorPoint.x - size * Math.sin(rotationRadians), y: anchorPoint.y + size * Math.cos(rotationRadians) };

				childPosition1 = {
					anchorPoint: points[3],
					angle: (rotation + stepAngle)
				};


				childPosition2 = {
					anchorPoint: points[2],
					angle: (rotation + stepAngle)
				};
			} else {
				points[1] = { x: anchorPoint.x + size * Math.sin(rotationRadians), y: anchorPoint.y + size * Math.cos(rotationRadians) };			  
				points[2] = { x: anchorPoint.x - size * (Math.cos(rotationRadians) - Math.sin(rotationRadians)), y: anchorPoint.y + size * (Math.sin(rotationRadians) + Math.cos(rotationRadians)) };
				points[3] = { x: anchorPoint.x - (size * Math.cos(rotationRadians)), y: anchorPoint.y + (size * Math.sin(rotationRadians)) };

				childPosition1 = {
					anchorPoint: points[2],
					angle: (rotation - stepAngle)
				};


				childPosition2 = {
					anchorPoint: points[1],
					angle: (rotation - stepAngle)
				};
			}

			

		} else if (parentType === 'left') {
			if (type === 'left') {
				points[1] = { x: anchorPoint.x + (size * Math.cos(rotationRadians)), y: anchorPoint.y + (size * Math.sin(rotationRadians)) };
				points[2] = { x: anchorPoint.x - size * (Math.sin(rotationRadians) - Math.cos(rotationRadians)), y: anchorPoint.y + size * (Math.sin(rotationRadians) + Math.cos(rotationRadians)) };
				points[3] = { x: anchorPoint.x - size * Math.sin(rotationRadians), y: anchorPoint.y + size * Math.cos(rotationRadians) };
				childPosition1 = {
					anchorPoint: points[3],
					angle: (rotation + stepAngle)
				};


				childPosition2 = {
					anchorPoint: points[2],
					angle: (rotation + stepAngle)
				};
			} else {
				points[1] = { x: anchorPoint.x - size * Math.sin(rotationRadians), y: anchorPoint.y + size * Math.cos(rotationRadians) };			  
				points[2] = { x: anchorPoint.x + size * (Math.cos(rotationRadians) - Math.sin(rotationRadians)), y: anchorPoint.y + size * (Math.sin(rotationRadians) + Math.cos(rotationRadians)) };
				points[3] = { x: anchorPoint.x + (size * Math.cos(rotationRadians)), y: anchorPoint.y + (size * Math.sin(rotationRadians)) };
				childPosition1 = {
					anchorPoint: points[2],
					angle: (rotation - stepAngle) - 0
				};


				childPosition2 = {
					anchorPoint: points[3],
					angle: (rotation - stepAngle) + 0
				};
			}


		} else {
			if (type === 'left') {
				points[1] = { x: anchorPoint.x + (size * Math.cos(rotationRadians)), y: anchorPoint.y + (size * Math.sin(rotationRadians)) };
				points[2] = { x: anchorPoint.x - size * (Math.sin(rotationRadians) - Math.cos(rotationRadians)), y: anchorPoint.y + size * (Math.sin(rotationRadians) + Math.cos(rotationRadians)) };
				points[3] = { x: anchorPoint.x - size * Math.sin(rotationRadians), y: anchorPoint.y + size * Math.cos(rotationRadians) };
				childPosition1 = {
					anchorPoint: points[3],
					angle: (rotation + stepAngle)
				};


				childPosition2 = {
					anchorPoint: points[2],
					angle: (rotation + stepAngle)
				};
			} else {
				points[1] = { x: anchorPoint.x - size * Math.sin(rotationRadians), y: anchorPoint.y + size * Math.cos(rotationRadians) };			  
				points[2] = { x: anchorPoint.x + size * (Math.cos(rotationRadians) - Math.sin(rotationRadians)), y: anchorPoint.y + size * (Math.sin(rotationRadians) + Math.cos(rotationRadians)) };
				points[3] = { x: anchorPoint.x + (size * Math.cos(rotationRadians)), y: anchorPoint.y + (size * Math.sin(rotationRadians)) };
				childPosition1 = {
					anchorPoint: points[2],
					angle: (rotation - stepAngle)
				};


				childPosition2 = {
					anchorPoint: points[3],
					angle: (rotation - stepAngle)
				};
			}
		}

		const childSize = Math.sqrt(2) * 0.5 * size;

		const midPoint = this.getMidPoint(points[0].x, points[0].y, size, size, rotation);
		const midPoint1 = this.getMidPoint(childPosition1.anchorPoint.x, childPosition1.anchorPoint.y, childSize, childSize, childPosition1.angle);
		const midPoint2 = this.getMidPoint(childPosition2.anchorPoint.x, childPosition2.anchorPoint.y, childSize, childSize, childPosition2.angle);



		const polyString = points.map(function(pt) {
			return pt.x + ',' + pt.y
		}).join(',');


		const opacity = (size < 190) ? (Math.random() * .75 + .25) : 1;
		const branchWidth = (size > 20) ? (size / 10) : 2;
		const lineGreen = {
			stroke: 'grey',
			strokeWidth: branchWidth
		};
		const lineRed = {
			stroke: 'slategray',
			strokeWidth: branchWidth
		};

		let circle = <circle cx={midPoint.x} cy={midPoint.y} r={size * .75} fill={color} fillOpacity={opacity} />;
		if (size > 100) { 
			circle = <circle cx={midPoint.x} cy={midPoint.y} r={branchWidth * .75} fill='slategray' />;
		}

		
		return (
			<Fragment>
				<g>
					<line x1={midPoint.x} y1={midPoint.y} x2={midPoint1.x} y2={midPoint1.y} style={lineGreen} />
					<line x1={midPoint.x} y1={midPoint.y} x2={midPoint2.x} y2={midPoint2.y} style={lineRed} />
					{/* <polygon className={size + '-' + rotation + type + '-' + parentType + parentRotation} points={polyString} fill={color} /> 
					<circle cx={points[0].x} cy={points[0].y} r={5} fill="purple" /> */}
					{circle}
					{/* <text x={midPoint.x} y={midPoint.y} fontFamily="Verdana" fontSize="18" fill="blue">{rotation}</text> */}
				</g>

				{(() => {
					if (size >= 2) {  
						return (
							<Fragment>
								<Rectangle parentType={type} parentRotation={rotation} color='green' size={childSize} anchorPoint={childPosition1.anchorPoint} rotation={childPosition1.angle} type='left' />
								<Rectangle parentType={type} parentRotation={rotation} color='greenyellow' size={childSize} anchorPoint={childPosition2.anchorPoint} rotation={childPosition2.angle} type='right' />

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
	anchorPoint: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
	type: PropTypes.string,
	parentType: PropTypes.string,
	rotation: PropTypes.number,
	rotationPoint: PropTypes.object,
	color: PropTypes.string,
	isRoot: PropTypes.bool
};

Rectangle.defaultProps = {
	size: 100,
	anchorPoint: { x: 0, y: 0 },
	type: 'left',
	parentType: 'root',
	rotation: 0,
	rotationPoint: null,
	color: "black",
	isRoot: false
};

export default Rectangle; 