import React from "react";
import BaseController from "../../../support/base/BaseController";
import LogUtil from "../../../support/utils/LogUtil";
import JCReportView from "../jcReport/JCReportView";

/**
 *检测报告
 */
export default class JCReportController extends BaseController {
	constructor(props) {
		super(props);

	}


    componentDidMount() {

      
	}

	render() {

		return <JCReportView {...this.props}/>
	}
}
