import React from 'react';
import { Route, Switch, BrowserRouter, HashRouter, Redirect } from 'react-router-dom';
import NoFindPage from './404';
import BaseController from '../base/BaseController';

import HomeController from '../../modules/home/HomeController';
// import TestPicRoll from '../../modules/imageRoll/test';
import AppraiseReport from '../../modules/carDetails/appraiseReport/AppraisalReportController';
import CarDetailsController from '../../modules/carDetails/CarDetailsController';
import JCReportController from '../../modules/carDetails/jcReport/JCReportController';
import CarConfigController from '../../modules/carDetails/carConfig/CarConfigController';

export default class RNRouter extends BaseController {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route exact path="/" component={HomeController} />
					<Route path="/index.html" component={HomeController} />
					<Route path="/JCReport" component={JCReportController} />
					<Route path="/cardetail/:carSourceId" component={CarDetailsController} />
					{/* <Route path="/testpicroll" component={TestPicRoll} /> */}
					<Route
						path="/appraisereport/:reporttype-s:styleId-r:regDate-m:mileage-c:cityId"
						component={AppraiseReport}
					/>
					<Route path="/carConfig" component={CarConfigController} />
					<Route path="/JCReport" component={JCReportController} />
					<Route path="/404" component={NoFindPage} /> <Redirect to="/404" />
				</Switch>
			</HashRouter>
		);
	}
}
