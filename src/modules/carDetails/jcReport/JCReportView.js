import React from "react";
import BaseView from "../../../support/base/BaseView";
import { Accordion, List } from 'antd-mobile';
import { isEmpty } from 'lodash';
import './JCReportStyle.css'

/**
 * 检测项头部
 */
const PresentationTit = ({checkItemName,index,totalNum}) => {
    return (
        <div className="spaceBetween" key={index}>
            <div className="PresentationList_tit">
                <span>{checkItemName}</span>
            </div>
            <div className="PresentationList_r">
                {/* <span className="Warning">74项</span> */}
                <span className="ml18 Checkmark">{totalNum}项</span>
            </div>
        </div>
    )
}

/**
 * 检测报告内容
 */
export default class JCReportView extends BaseView {

    constructor(props) {
        super(props);

    }

    handleScroll() {
        //console.log(this.state.navTop)

    }
    gotoVisable = (type, scrollTop) => {
        this.props.gotoVisable(type, scrollTop)
    }
    render() {

        
        const { styleFullName, newCarPrice, toCPrice, regDate, mileage,
            emissionStandardName, variableBoxName, report } = this.props.vehicleInfo
            let reportDetail =[]
            if (report != undefined) {
                reportDetail = report.Data.reportDetail
            }
        let showCon = this.props.showIndex === 2 ? 'block' : 'none'
        return (
            <div style={{ display: `${showCon}` }}>
                <header>
                    <div className="leftArrow" onClick={() => this.gotoVisable(0, this.props.sTop)}></div>
                    <div className="headTit">检测报告</div>
                </header>
                {/* 检测报告 */}
                <div className="testing mt20">
                    <div className="cont">
                        <div className="testingTit">
                            {styleFullName}
                        </div>
                        <div className="testingConclusion">
                            评估结论：经检测的发送到发送到发士大夫士大夫撒旦法是打发第三方打发士大夫撒电风扇大打发第三方大幅度欢迎试驾。
                        </div>
                    </div>


                    <div className="hr mt20"></div>

                    <div className="cont">
                        {reportDetail.map((item, index) => {
                            return (
                                <div className="mt20" key={index}>
                                    <div className="PublicTit">{item.checkProject}</div>
                                    <div className="PublicRemarks">修复需要一定成本，可能对车辆性能造成影响</div>
                                    <Accordion className="my-accordion" onChange={this.onChange}>
                                        <Accordion.Panel key={`ap` + index} header={<PresentationTit checkItemName={item.checkProject} index={index} totalNum={item.checkItems.length}/>} >
                                            <List className="my-list">
                                                {item.checkItems.map((info, idx) => {
                                                    return (<List.Item key={`listitem`+idx}>
                                                        <div className="spaceBetween">
                                                            <div className="PresentationList_tit">
                                                                <span>{info.checkItemName}</span>
                                                            </div>
                                                            <div className="PresentationList_r">
                                                                <span className="CheckmarkAfter"></span>
                                                            </div>
                                                        </div>
                                                    </List.Item>)
                                                })}
                                            </List>
                                        </Accordion.Panel>
                                    </Accordion>
                                </div>
                            )
                        })}
                        
                    </div>


                </div>
            </div>

        )
    }

}