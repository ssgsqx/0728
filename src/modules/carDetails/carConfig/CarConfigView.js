import React from "react";
import BaseView from "../../../support/base/BaseView";
import { Accordion, List, Modal } from 'antd-mobile';
import { isEmpty } from 'lodash';
import './CarConfigStyle.css'

/**
 * 参数配置
 */
export default class CarConfigView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            modal2: false,
        }
    }
    //浮层显示
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    //浮层关闭
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    gotoVisable = (type, scrollTop) => {
        this.props.gotoVisable(type, scrollTop)
    }

    /**
     * 数据输出
     */
    carConfigMap = (item, index) => {
        return (
            <li key={index}>
                <div className="referenceListL">
                    <span>{item.configName}</span>
                    {/* <i onClick={this.showModal('modal2')} className="warningIco ml5"></i> */}
                </div>
                <span className="referenceListR">{item.configValue}</span>
            </li>
        )
    }

    render() {
        const { styleFullName, newCarPrice, toCPrice, regDate, mileage,
            emissionStandardName, variableBoxName, report } = this.props.vehicleInfo
        let carConfig = []
        if (report != undefined) {
            carConfig = report.Data.carConfig
        }
        let showCon = this.props.showIndex === 1 ? 'block' : 'none'
        return (
            <div style={{ display: showCon }}>
                <header>
                    <div onClick={() => this.gotoVisable(0, this.props.sTop)} className="leftArrow"></div>
                    <div className="headTit">参数配置</div>
                </header>
                <div className="reference">
                    <div className="referenceName">{styleFullName}</div>
                    <div className="referenceTit">基础参数</div>
                    <div className="cont referenceList">
                        <ul>
                            {carConfig.map((item, index) => this.carConfigMap(item, index))}
                            <li>
                                <div className="referenceListL">
                                    <span>证件品牌型号</span>
                                    <i onClick={this.showModal('modal2')} className="warningIco ml5"></i>
                                </div>
                                <span className="referenceListR">东风标致牌DC7126TSAB</span>
                            </li>


                        </ul>
                    </div>
                    <div className="comments cont">
                        <span>基本信息为车辆初评时录入，实际情况以看车时为准</span>
                    </div>
                </div>
                {/* 浮层 */}
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"
                >
                    <div className="floatingLayerPopup">
                        <div className="floatingLayerPopup-Tit">证件品牌型号提示</div>
                        <div className="floatingLayerPopup-Cont">此信息为机动车行驶证上的品牌型号信息，品牌型号信息以此为准</div>
                    </div>
                </Modal>
            </div>

        )
    }

}