import * as types from "../../redux/actions/ActionType";
import HttpUtil from "../../support/web/HttpUtil";
import ToastUtil from "../../support/utils/ToastUtil";
import LogUtil from "../../support/utils/LogUtil";
import CacheUtil from "../../support/utils/CacheUtil";


export default class ActionService {

    static requestPostService(actionType: String, requestUrl: String, params: Map) {

        return dispatch => {

            dispatch(this.startLoading());

            HttpUtil.requestPost(requestUrl, params)
                .then((result) => {
                    LogUtil.log(result);

                    let timer = setTimeout(() => {

                        clearTimeout(timer);
                        CacheUtil.getInstance().put(actionType, result);
                        dispatch(ActionService.excuteRequest(actionType, true));
                    }, 10);
                })
                .catch((error) => {

                    LogUtil.log('error: '+error);
                    ToastUtil.show(error);
                    dispatch(ActionService.excuteRequest(actionType, false));

                });
        }
    };

    static startLoading(actionType: String) {

        return {
            actionType: actionType,
            type: types.LOADING_START
        }
    };

    static excuteRequest(actionType: String, requestState: Boolean) {

        return {
            requestIsSuccess: requestState,
            actionType: actionType,
            type: types.LOADING_DONE,
            result: CacheUtil.getInstance().get(actionType)
        }


    };

}
