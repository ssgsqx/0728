import React, { Component } from 'react';
import BaseController from '../../../support/base/BaseController';
import AppraisalRptService from './AppraisalReportService';
import LogUtil from '../../../support/utils/LogUtil';
import AppraisalRptView from './AppraisalReportView';

/**
 *
 */
export default class AppraisalReportController extends BaseController {
	constructor(props) {
		super(props);
		this.state = {
			apprValueResult: null
		};
	}

	componentDidMount() {
		let { styleid, regdate, milage, cityid, reporttype } = this.props.match.params;

		let params = this.props.match.params;
		AppraisalRptService.urlParams = this.props.match.params;
		AppraisalRptService.getAppraiseRpoetData((result) => {
			console.log('result', result);
			this.setState({ apprValueResult: result });
		});
	}

	render() {
		let { reporttype } = this.props.match.params;
		return <AppraisalRptView apprValue={this.state.apprValueResult} reportType={reporttype} />;
	}
}
