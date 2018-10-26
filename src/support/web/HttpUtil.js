
'use strict';

import * as ReturnCode from './ReturnCode';
import JsonUtil from "../utils/JsonUtil";
import LogUtil from "../utils/LogUtil";
// import fetch from './FetchTimer';


export default class HttpUtil {

    /** get请求 */
    static requestGet(url, params) {

        if (params) {
            let paramsArray = [];
            for(let item of params.entries()){
                paramsArray.push(item[0] + '=' + encodeURIComponent(item[1]));
            }
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        return this.request(url, 'get', undefined, params);
    }

    /** pos请求 */
    static requestPost(url, params) {

        let body = '';
        // for (let item of params.entries()) {
        //     body += item[0] + "=" + item[1] + "&";
        // }
        //
        // body = body.substring(0, body.length - 1);

        return this.request(url, 'post', body, params);
    }

    /** delete请求 */
    static requestDelete(url, params) {


        let body = '';
        for (let item of params.entries()) {
            body += item[0] + "=" + item[1] + "&";
        }
        body = body.substring(0, body.length - 1);
        return this.request(url, 'delete', body, params);
    }

    /** put请求 */
    static requestPut(url, params) {

        let body = '';
        for (let item of params.entries()) {
            body += item[0] + "=" + item[1] + "&";
        }
        body = body.substring(0, body.length - 1);

        return this.request(url, 'put', body, params);
    }

    /** 请求封装 */
    static async request(url, method, body, params) {

        const errorMsg = '请求网络数据异常！';

        const result = JsonUtil.mapToJson(params);
        return new Promise((resolve, reject)=> {

            fetch(url, {
                method,
                body: result,
                mode: 'cors',
                headers: new Headers({
                    // 'token': token,
                    // 'sign': sign,//签名
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'ACCEPT': 'application/json',
                    'Connection': 'close',
                })
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject(errorMsg);
                    }
                })
                .then((json) => {

                    try {
                        const { status, msg, data } = json;
                        if (status === ReturnCode.SUCCESS) {
                            resolve({ ...data, msg });
                        } else {
                            reject(msg);
                        }
                    }catch (error) {
                        reject(errorMsg);
                    }
                })
                .catch((error) => {

                    reject(errorMsg);
                    LogUtil.warn("#RESPONSE# ["+method+"] url = "+url+", body = "+body+", error="+error);

                });
        });
    }

}