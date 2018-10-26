import { domainUrl } from '../../../support/web/HttpUrl';
import HttpUtil from '../../../support/web/HttpUtil';
import ToastUtil from '../../../support/utils/ToastUtil';

const searchAllShelfVehicleListUrl = 'http://atrade.jingzhengu.com/api/trade/car/source/fastAppraise';

export default class AppraisalReportService {
	static urlParams;
	/** 获取估值报告 */
	static getAppraiseRpoetData(callBack) {
		console.log('urlParams', this.urlParams);
		const params = new Map();

		params.set('styleId', this.urlParams.styleId);
		params.set('regDate', this.urlParams.regDate);
		params.set('mileage', this.urlParams.mileage);
		params.set('cityId', this.urlParams.cityId);
		params.set('monthFuture', 36);
		params.set('step', 6);
		HttpUtil.requestPost(searchAllShelfVehicleListUrl, params).then(
			(result) => {
				callBack(result);
			},
			(error) => {
				ToastUtil.show(error);
			}
		);
	}
}
