import React from "react";
import BaseController from "../../support/base/BaseController";
import CarDetailsService from "./CarDetailsService";
import LogUtil from "../../support/utils/LogUtil";
import CarDetailsView from "./CarDetailsView";
import CarConfigView from "./carConfig/CarConfigView";
import JCReportView from './jcReport/JCReportView'
import { isEmpty } from 'lodash';

/**
 *
 */
export default class CarDetailsController extends BaseController {
    constructor(props) {
        super(props);
        this.state = {
            vehicleInfo: [],
            // isShow: true,
            // isShowConfig: false,
            // isShowJCReport: false,
            isTop: 0,
            showIndex: 0,//0:详情 1：配置 2：检测报告

        }

    }
    /**
     * 请求数据
     */
    componentDidMount() {

        this.getCarResourceDetailInfo();


    }

    // componentWillUnmount(){
    //     this.setState({
    //         vehicleInfo: []
    //     })
    // }
    // 获取车源详情
    getCarResourceDetailInfo = () => {
        const { carSourceId } = this.props.match.params;
        // console.log("carSourceId", carSourceId)
        CarDetailsService.getCarResourceDetailInfo(carSourceId, (res) => {
            this.setState({ vehicleInfo: res });
        }, (err) => {
            this.setState({ vehicleInfo: err });
        });
    };


    showDetail = (type, sTop) => {
        console.log("sTop", sTop)
        this.setState({
            showIndex: type,
            sTop
        })
        if (type == 1 || type == 2) {
            window.scrollTo(0, 0)
        } else {
            setTimeout(() => {
                window.scrollTo(0, sTop)
            }, 100);
        }
    }


    render() {
        return (
            <div >
                <CarDetailsView
                    {...this.props}
                    vehicleInfo={this.state.vehicleInfo}
                    showIndex={this.state.showIndex}
                    gotoVisable={(info, sTop) => this.showDetail(info, sTop)}
                />
                <CarConfigView
                    {...this.props}
                    vehicleInfo={this.state.vehicleInfo}
                    sTop={this.state.sTop}
                    showIndex={this.state.showIndex}
                    gotoVisable={(info, sTop) => this.showDetail(info, sTop)}
                />
                <JCReportView
                    {...this.props}
                    vehicleInfo={this.state.vehicleInfo}
                    sTop={this.state.sTop}
                    showIndex={this.state.showIndex}
                    gotoVisable={(info, sTop) => this.showDetail(info, sTop)}
                />
            </div>

        )
    }
}
