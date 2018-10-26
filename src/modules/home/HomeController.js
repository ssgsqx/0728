import React from "react";
import BaseController from "../../support/base/BaseController";
import HomeService from "./HomeService";
import LogUtil from "../../support/utils/LogUtil";
import HomeView from "./HomeView";

/**
 *
 */
export default class HomeController extends BaseController {
	constructor(props) {
		super(props);

	}


    componentDidMount() {

        HomeService.searchAllShelfVehicleListForMerchant(result=>{
        	LogUtil.log(result);
		})
	}

	render() {

		return <HomeView />
	}
}
