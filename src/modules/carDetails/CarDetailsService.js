import { domainUrl } from '../../support/web/HttpUrl';
import HttpUtil from "../../support/web/HttpUtil";
import ToastUtil from "../../support/utils/ToastUtil";
import LogUtil from "../../support/utils/LogUtil";

// 车源详情url
const carResourceDetailUrl = "http://atrade.jingzhengu.com/api/trade/car/source/getVehicleInfoWithReport";//"http://svsp.jingzhengu.com/service/api/getVehicleInfoWithReport"

/**
 * zhang
 * @category 获取车源详情
 */
export default class CarDetailsService {

    static getCarResourceDetailInfo(carSourceId,resCallBack,errCallBack) {
        const params = new Map();
        // params.set('customerId', 0);
        // params.set('pageNo', '0');
        // params.set('pageSize', '0');
        // params.set('toBDeposit', '0');
        // params.set('toBPrice', 0);
        // params.set('toCDeposit', '0');
        // params.set('vehicleStatus', '0');
        params.set('vehicleId', carSourceId);

        HttpUtil.requestPost(carResourceDetailUrl, params)
            .then((result) => {
                resCallBack(result);
                LogUtil.log(result, 'CarDetailsService');
            })
            .catch((error) => {
                errCallBack(error)
                LogUtil.log(error);
            });
    }

}

