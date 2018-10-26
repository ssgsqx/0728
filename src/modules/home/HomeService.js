import { domainUrl } from '../../support/web/HttpUrl';
import HttpUtil from "../../support/web/HttpUtil";
import ToastUtil from "../../support/utils/ToastUtil";

const searchAllShelfVehicleListUrl = 'http://svsp.jingzhengu.com/trade/api/trade/car/source/getVehicleInfo';
//`${domainUrl}/api/searchAllShelfVehicleListForMerchant`;

export default class HomeService {

    /** 查询商户所有已上架的车源 */
    static searchAllShelfVehicleListForMerchant(callBack) {

        const params = new Map();
        // params.set('customerId', '10');
        params.set('vehicleId', 28);
        // params.set('pageSize', 10);

        HttpUtil.requestPost(searchAllShelfVehicleListUrl,params)
            .then((result)=> {

                callBack(result);

            },(error)=>{

               ToastUtil.show(error);

            });

    }
}

