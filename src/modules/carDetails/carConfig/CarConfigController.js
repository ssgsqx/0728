import React from "react";
import BaseController from "../../../support/base/BaseController";
import LogUtil from "../../../support/utils/LogUtil";
import CarConfigView from "../carConfig/CarConfigView";

/**
 *检测报告
 */
export default class CarConfigController extends BaseController {
	constructor(props) {
		super(props);

	}


    componentDidMount() {

      
	}

	render() {
		
		return <CarConfigView
		{...this.props}
		/>
	}
}
