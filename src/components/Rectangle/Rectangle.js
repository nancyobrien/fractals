import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Leaf from '../Leaf';

class Rectangle extends Component {
	cutoff = 25;
	defaultAngle = 45;
	pi180 = Math.PI / 180;
	sqrt2over2 = Math.sqrt(2)/2;



	constructor(props) {
		super(props)

		const rotationRadians = this.props.rotation * this.pi180;
		const rotCos = Math.cos(rotationRadians);
		const rotSin = Math.sin(rotationRadians);
		const { size, anchorPoint, rotation, type, generation, falling } = this.props;

		const colorClass = 'color'+ (Math.ceil(Math.random() * 7));


		let stepAngle = this.defaultAngle;
		if  (this.props.generation > 3) {
			stepAngle = Math.ceil(Math.random() * 18) * 5;
		}

		let childPosition1 = {};
		let childPosition2 = {};
		const childAngle = (type === 'left' || type === 'root') ? (rotation + stepAngle) : (rotation - (90 - stepAngle));
		const childSize = this.sqrt2over2 * size;


		const pointsArray = [];
		pointsArray[0] = anchorPoint;
		pointsArray[2] = { x: anchorPoint.x + size * (rotCos - rotSin), y: anchorPoint.y + size * (rotSin + rotCos) };
		if (type === 'left' || type === 'root') {
			pointsArray[1] = { x: anchorPoint.x + (size * rotCos), y: anchorPoint.y + (size * rotSin) };
			pointsArray[3] = { x: anchorPoint.x - size * rotSin, y: anchorPoint.y + size * rotCos };
			
			childPosition1 = {
				anchorPoint: pointsArray[3],
				angle: childAngle
			};

			childPosition2 = {
				anchorPoint: pointsArray[2],
				angle: childAngle
			};
		} else {
			pointsArray[1] = { x: anchorPoint.x - size * rotSin, y: anchorPoint.y + size * rotCos };
			pointsArray[3] = { x: anchorPoint.x + (size * rotCos), y: anchorPoint.y + (size * rotSin) };

			childPosition1 = {
				anchorPoint: pointsArray[2],
				angle: childAngle
			};

			childPosition2 = {
				anchorPoint: pointsArray[3],
				angle: childAngle
			};
		}


		const thisMid = (typeof this.props.midPoint !== 'undefined') ? this.props.midPoint : this.getMidPoint(pointsArray[0].x, pointsArray[0].y, size, size, rotation);
		const midPoint1 = this.getMidPoint(childPosition1.anchorPoint.x, childPosition1.anchorPoint.y, childSize, childSize, childPosition1.angle);
		const midPoint2 = this.getMidPoint(childPosition2.anchorPoint.x, childPosition2.anchorPoint.y, childSize, childSize, childPosition2.angle);



		this.state = {
			loadChildren: false,
			animating: false,
			stepAngle: stepAngle,
			opacity: (this.props.size < 190) ? (Math.random() * .75 + .25) : 1,
			points: pointsArray,
			thisMid: thisMid,
			midPoint1: midPoint1,
			midPoint2: midPoint2,
			childPosition1: childPosition1,
			childPosition2: childPosition2,
			childSize: childSize,
			colorClass: colorClass,
		}
	}

	componentDidMount = () => {
		const childDelay = (this.props.childDelay / this.props.generation);
		setTimeout(() => {
			this.setState({ animating: true });
		}, Math.max(1, childDelay - 1));

		setTimeout(() => {
			this.setState({ loadChildren: true });
		}, childDelay);

	}

	getMidPoint = (x, y, width, height, angle_degrees) => {
		var angle_rad = angle_degrees * this.pi180;
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
		const { stepAngle, opacity, points, childPosition1, childPosition2, thisMid, midPoint1, midPoint2, childSize, colorClass } = this.state;
		const { size, anchorPoint, rotation, type, generation, falling } = this.props;

		const branchWidth = Math.max((size / 10), 2);
		const lineLeft = {
			stroke: 'grey', 
			strokeWidth: branchWidth
		};
		const lineRight = {
			stroke: 'slategray',
			strokeWidth: branchWidth
		};


		let circle = null;
		if (this.props.generation < 3) { 
			circle = <circle cx={thisMid.x} cy={thisMid.y} r={branchWidth * .75} fill='slategray' />;
		} else {
			circle = <Leaf size={size} position={thisMid} generation={this.props.generation}  />;
		}


		return (
			<Fragment>
				<g>
					<line x1={thisMid.x} y1={thisMid.y} x2={midPoint1.x} y2={midPoint1.y} style={lineLeft} />
					<line x1={thisMid.x} y1={thisMid.y} x2={midPoint2.x} y2={midPoint2.y} style={lineRight} />
					{/* <polygon className={size + '-' + rotation + type + '-' + parentType + parentRotation} points={polyString} fill={color} /> 
					<circle cx={points[0].x} cy={points[0].y} r={5} fill="purple" /> */}
					{circle}
					{/* <text x={thisMid.x} y={thisMid.y} fontFamily="Verdana" fontSize="18" fill="blue">{rotation}</text> */}
				</g>

				{(() => {
					if (this.state.loadChildren && (size >= this.cutoff)) {  
						return (
							<Fragment>
								<Rectangle generation={this.props.generation + 1} size={childSize} anchorPoint={childPosition1.anchorPoint} midPoint={midPoint1} rotation={childPosition1.angle} type='left' falling={falling} />
								<Rectangle generation={this.props.generation + 1} size={childSize} anchorPoint={childPosition2.anchorPoint} midPoint={midPoint2} rotation={childPosition2.angle} type='right' falling={falling} />
							</Fragment>
						)
						
					}
				})()}
			</Fragment>
		);
	}
}

Rectangle.propTypes = {
	generation: PropTypes.number,
	size: PropTypes.number,
	anchorPoint: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
	type: PropTypes.string,
	rotation: PropTypes.number,
	rotationPoint: PropTypes.object,
	color: PropTypes.string,
	isRoot: PropTypes.bool,
	childDelay: PropTypes.number,
	falling: PropTypes.bool
};

Rectangle.defaultProps = {
	generation: 1,
	size: 100,
	anchorPoint: { x: 0, y: 0 },
	type: 'left',
	rotation: 0,
	rotationPoint: null,
	color: "black",
	isRoot: false,
	childDelay: 0,
	falling: false
};

export default Rectangle