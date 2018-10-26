
import React, { Component } from 'react';
import CacheUtil from "../utils/CacheUtil";
import 'core-js/es6/symbol'

/**
 * hu
 * @category component基类
 */
export default class BaseController extends Component {


    //监听器
    componentDidMount() {

    }

    //卸载前移除通知
    componentWillUnmount() {

    }

}
export function connection(store) {

    return {
        /** 请求结果状态 */
        requestIsSuccess: store.ActionReducer.requestIsSuccess,
        actionType: store.ActionReducer.actionType,
        status: store.ActionReducer.status,
        result: CacheUtil.getInstance().get(store.ActionReducer.actionType)
    }
}
