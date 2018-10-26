/*
  折线图标
*/
import React, { Component } from 'react';
import BaseController from '../base/BaseController';
import { Chart, Axis, Geom, Label } from 'bizcharts';

export default class LineChart extends BaseController {
	static defaultProps = {
		data: [], // 图标数据 { x: '', y: '' }
		minY: 0, // y轴刻度最小值
		rangeX: [ 0, 1 ], // x轴取值范围
		height: 200, // 图标高度
		backgroundColor: '#FFFFFF', // 图标背景色
		xTickLineColor: '#F5F5F5', // 竖轴线颜色
		lineColor: 'red', // 折线颜色
		pointColor: 'red', // 折点颜色,
		pointStrokeColor: '#fff', //折点边框颜色
		pointSize: 2, // 折点大小,
		labelUnit: '' //y数据单位
	};

	render() {
		const {
			data,
			minY,
			rangeX,
			height,
			backgroundColor,
			xTickLineColor,
			lineColor,
			pointColor,
			pointStrokeColor,
			pointSize,
			labelUnit
		} = this.props;
		const cols = {
			y: { min: minY },
			x: { range: rangeX }
		};
		return (
			<Chart
				padding={{ top: 25, right: 20, bottom: 50, left: 18 }}
				height={height}
				data={data}
				scale={cols}
				forceFit
				background={{ fill: backgroundColor }}
			>
				<Axis name="x" tickLine={{ lineWidth: 1, stroke: xTickLineColor, length: -(height - 60) }} />
				<Axis name="y" label={null} />
				<Geom type="line" position="x*y" size={2} color={lineColor} />
				<Geom
					type="point"
					position="x*y"
					size={pointSize}
					color={pointColor}
					shape={'circle'}
					style={{ stroke: pointStrokeColor, lineWidth: 1 }}
				>
					<Label
						content="y"
						formatter={(text, item, index) => {
							return text + labelUnit;
						}}
					/>
				</Geom>
			</Chart>
		);
	}
}
