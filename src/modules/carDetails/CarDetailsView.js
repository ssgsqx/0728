import React from "react";
import { Accordion, List } from 'antd-mobile';
import { isEmpty } from 'lodash';
import BaseView from "../../support/base/BaseView";
import './CarDetailsStyle.css'
import ImageRollView from '../imageRoll/ImageRollView';
import LogUtil from "../../support/utils/LogUtil";
import { Modal, Button, Tabs, WhiteSpace, WingBlank } from 'antd-mobile';


const tabs = [
    { title: '车辆瑕疵图' },
    { title: '漆面修复图' }
];
/*
 * 点击查看相应的检测项信息
 */
const PresentationTit = () => {
    return (
        <div className="spaceBetween">
            <div className="PresentationList_tit">
                <span>底盘检查</span>
            </div>
            <div className="PresentationList_r">
                <span className="Warning">74项</span>
                <span className="ml18 Checkmark">74项</span>
            </div>
        </div>
    )
}

const nvaTabList = ['基本信息','检测报告','车辆图文','猜你喜欢']

export default class CarDetailsView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            num: props.num,
            navTop: false,
            basicPic: [],
            colorActive:''
        };
        this.offsetTop = 100
    }

    /*
     * 询底价 30
     */
    sendBasePriceMessage = () => {
        const message = { cmd: 30 };
        window.postMessage(JSON.stringify(message), '*');
    }
    //弹出窗口
    popup = () => {
        this.setState({
            popupShow: !this.state.popupShow
        })
    }



    componentDidMount() {


        window.addEventListener('scroll', () => {
            let sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (!this.state.navTop && sTop >= this.offsetTop) {
                this.setState({
                    navTop: true
                })
            }
            if (sTop < this.offsetTop) {
                this.setState({
                    navTop: false,
                    colorActive:''

                })
            }
        })

    }
    //滚动显示浮层
    windowOnScroll() {

        let _this = this;
        window.onscroll = function () {
            //获取滚动条滚动的距离
            let h = document.documentElement.scrollTop;
            console.log(h);
            if (h > 74) {
                _this.setState({
                    suctionTop: "SuctionTop_block"
                });
            } else {
                _this.setState({
                    suctionTop: "SuctionTop"
                });
            }
        }
    };
    //点击锚点点 
    scrollToAnchor = (anchorName) => {
        
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                anchorElement.scrollIntoView();
               this.setState({
                colorActive:anchorName+"_1"
               })
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                window.scrollTo(0, scrollTop - 70)
            }
        }
    }


    /**
     * 加载banner图片了
     */
    getBasicPicList = () => {
        let newBasicPic = []
        const { styleFullName, newCarPrice, toCPrice, regDate, mileage,
            emissionStandardName, variableBoxName, report } = this.props.vehicleInfo
        //basicPic
        if (report != undefined) {
            const { Data: { basicPic } } = report
            basicPic.map((item, index) => {
                newBasicPic.push({
                    index: index,
                    original: item.picLength,
                    thumbnail: item.picLength,
                    originalTitle: '外观1',
                    group: item.picName,
                    imgDes: '中控有部分掉漆'
                })
            })
        }
        return newBasicPic
    }


    /**
     * 检测报告信息
     */
    getReportItem = (item, index) => {
        let isNormal = false;
        let checkItems = item.checkItems;
        // console.log(checkItems)
        // if(checkItems.defectValueList!=null){isNormal=true}
        return (
            <li key={index}>
                <div className="PresentationList_tit">
                    <span>{item.checkProject}</span>
                </div>
                <div className="PresentationList_r" onClick={() => this.gotoVisable(2)}>
                    {isNormal && <span className="Warning">74项</span>}
                    <span className="ml18 Checkmark">{checkItems.length}项</span>
                    <span className="triangle right ml5"></span>
                </div>
            </li>
        )
    }

    //更多参配
    ReferenceMore = () => {

        let ScrollTop = document.documentElement.scrollTop
        console.log('ScrollTop', ScrollTop)
        this.props.history.push({ pathname: '/carConfig', state: ScrollTop })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    /**
     * 返回当前的滚动的Top
     */
    gotoVisable = (type) => {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        this.props.gotoVisable(type, scrollTop)
    }

    /**
     * 吸顶条渲染
     */
    getTapItem = (item, index) => {
        return (<li key={index}>
            <span onClick={() => this.scrollToAnchor('sptit_' + `${index + 1}`)} className={this.state.colorActive == 'sptit_' + `${index + 1}_1` ? 'sp_active' : ''}>{item}</span>
        </li>)
    }

    render() {
        const { navTop } = this.state
        let reportDetail = []
        let procedureDetail = []
        const { styleFullName, newCarPrice, toCPrice, regDate, mileage,
            emissionStandardName, variableBoxName, report } = this.props.vehicleInfo
        if (report != undefined) {
            procedureDetail = report.Data.procedureDetail
            reportDetail = report.Data.reportDetail
        }
        let piclist = this.getBasicPicList();
        let showCon = this.props.showIndex === 0 ? 'block' : 'none'
        return (
            <div style={{ display: `${showCon}` }}>
                <ImageRollView
                    picList={piclist}
                    orderCode="12345678"
                    isShowfooter={true}
                    isShowAllPic={true}
                    cancelable={false}
                    onClickGoback={() => {
                        document.body.scrollIntoView();
                    }}
                />
                <div className='cont'>
                    <div className="zxtitle mt20">
                        {styleFullName}
                    </div>
                    <div className="mt12 zxPriceCont">
                        <div className="left zxPrice">
                            <span className="ft20">8.80</span>
                            <span className="ft18">万</span>
                        </div>
                        <div className="left zxNewCarPrice">新车总价：{newCarPrice}万（含税)</div>
                        <div className="right zxBtnPrice" onClick={() => { this.sendBasePriceMessage() }}>询底价</div>
                    </div>
                    <div className="zxPriceContB">
                        <span>精真估参考价：6.34-8.45万</span>
                    </div>
                </div>
                {/* 基本信息 */}
                <div className="hr mt20"></div>
                <div className='cont mt20' id="sptit_1">
                    <div className="PublicTit">
                        基本信息
                    </div>

                    <section className="contTab">
                        <div>
                            <div className="contTabBox">

                                <ul className="contTabTxt">
                                    <li>
                                        <span>上牌</span>
                                        <p>{!isEmpty(regDate) ? regDate : "--"}</p>
                                    </li>
                                    <li>
                                        <span>表显里程</span>
                                        <p>{mileage}万公里</p>
                                    </li>
                                    <li>
                                        <span>车牌</span>
                                        <p>乌鲁木齐里<i></i></p>
                                    </li>
                                    <li>
                                        <span>排放</span>
                                        <p>{!isEmpty(emissionStandardName) ? emissionStandardName : "--"}</p>
                                    </li>
                                    <li>
                                        <span>排量</span>
                                        <p>{procedureDetail.exhaust}</p>
                                    </li>
                                    <li>
                                        <span>档位</span>
                                        <p>{variableBoxName}</p>
                                    </li>
                                    <li>
                                        <span>看车地点</span>
                                        <p>后盐车市</p>
                                    </li>
                                    <li>
                                        <span>车检到期</span>
                                        <p>2019-11</p>
                                    </li>
                                    <li>
                                        <span>交强险到期</span>
                                        <p>{procedureDetail.insurance}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="contTabRemarks mt20">
                                看车地点：大连甘井子区太皇太后点点滴滴后盐市
                            </div>
                            <div className="containerTap">
                                <div className="contTabPic">
                                    <ul>
                                        <li>
                                            <img src="" />
                                            <p>倒车影像</p>
                                        </li>
                                        <li>
                                            <img src="" />
                                            <p>座椅加热</p>
                                        </li>
                                        <li>
                                            <img src="" />
                                            <p>电动天窗</p>
                                        </li>
                                        <li>
                                            <img src="" />
                                            <p>倒车雷达</p>
                                        </li>
                                        <li>
                                            <img src="" />
                                            <p>真皮座椅</p>
                                        </li>
                                        <li>
                                            <img src="" />
                                            <p>GPS导航</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            
                        </div>
                    </section>
                </div>
                <div className="contMore">
                    <span onClick={() => this.gotoVisable(1)}>更多参数配置</span>
                    <i></i>
                </div>
                {/* 检测报告 */}
                <div className="hr"></div>
                <div className='cont mt20' id="sptit_2">
                    <div className="PublicTit">
                        检测报告
                    </div>
                    <div className="Presentation mt16">
                        <img src={'https://imgv5.jingzhengu.com/group3/M01/32/42/wKgUklvEXtSASswwAAJkYsdXwVs136.jpg'} />
                    </div>
                    <div className="PresentationList">
                        <ul>
                            {reportDetail.map((item, index) => this.getReportItem(item, index))}
                            {/* <li>
                                <div className="PresentationList_tit">
                                    <span>底盘检查</span>
                                </div>
                                <div className="PresentationList_r">
                                    <span className="Warning">74项</span>
                                    <span className="ml18 Checkmark">74项</span>
                                    <span className="triangle right ml5"></span>
                                </div>
                            </li>
                            <li>
                                <div className="PresentationList_tit">
                                    <span>底盘检查</span>
                                </div>
                                <div className="PresentationList_r">
                                    <span className="Warning">14项</span>
                                    <span className="ml18 Checkmark">74项</span>
                                    <span className="triangle right ml5"></span>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                    {/* 车辆瑕疵图 */}

                    <div className="cont">
                        <WhiteSpace />
                        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
                            <div>
                                <div className="carTabCont">
                                    <img src={require('../../resource/images/xiac.png')} />
                                </div>
                                <div className="carTabCont">
                                    <img src={require('../../resource/images/xiac_1.png')} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                暂无图片
                            </div>

                        </Tabs>
                        <WhiteSpace />
                    </div>
                </div>

                {/* 常见问题 */}
                <div className="hr mt20"></div>
                <div className='cont mt20'>
                    <div className="PublicTit">
                        常见问题
                    </div>
                    <div className="problem">
                        <ul>
                            <li>能否贷款</li>
                            <li>能否贷款</li>
                            <li>能否贷款</li>
                            <li>能否贷款</li>
                            <li>能否贷款</li>
                        </ul>
                    </div>
                </div>
                {/* 车辆实拍 */}
                <div className="hr"></div>
                <div className='cont mt20' id="sptit_3">
                    <div className="PublicTit">
                        车辆实拍
                    </div>
                    <div className="carRealBeat">
                        <ul>
                            <li>
                                <img src={'https://imgv5.jingzhengu.com/group3/M01/32/42/wKgUklvEXtSASswwAAJkYsdXwVs136.jpg'} />
                                <div className="carRealBeatTit">
                                    <span className="carRealBeatTitL">左前：</span>
                                    <span>车头及左侧车身部件有少量瑕疵</span>
                                </div>
                            </li>
                            <li>
                                <img src={'https://imgv5.jingzhengu.com/group3/M01/32/42/wKgUklvEXtSASswwAAJkYsdXwVs136.jpg'} />
                                <div className="carRealBeatTit">
                                    <span className="carRealBeatTitL">左前：</span>
                                    <span>车头及左侧车身部件有少量瑕疵</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 猜你喜欢 */}
                <div className="hr"></div>
                <div className='cont mt20'>
                    <div className="PublicTit" id="sptit_4">猜你喜欢</div>
                    {/*<TabExample />*/}
                    <div className="xscarlist">
                        <div className="xsimg"><img src="https://image.guazistatic.com/gz01181016/08/26/0a51246c69a5383f11e3467c9db5a61c.jpg@base@tag=imgScale&w=620&h=430&c=1&m=2&q=88" /></div>
                        <div className="xsright">
                            <div className="xstit"><span>雪弗兰大 科普三厢 2009款1.6手动SE</span></div>
                            <div className="xstit_2">2009年10月丨9.91万公里</div>
                            <div className="xstit_2 xsmoney"><span className="spxsmoney">8.31</span>万</div>
                        </div>
                    </div>
                </div>

                {/* 吸顶 */}
                {navTop ?
                    <div className="SuctionTop" >
                        <nav>
                            <ul className="navTab">
                                {nvaTabList.map((item, index) => this.getTapItem(item, index))}
                                {/* <li className="on">
                                    <span onClick={() => this.scrollToAnchor('sptit_1')} className={this.state.colorActive=='sptit_1_1'?'sp_active':''}>基本信息</span>
                                </li>
                                <li>
                                    <span onClick={() => this.scrollToAnchor('sptit_2')} className={this.state.colorActive=='sptit_2_1'?'sp_active':''}>检测报告</span>
                                </li>
                                <li>
                                    <span onClick={() => this.scrollToAnchor('sptit_3')} className={this.state.colorActive=='sptit_3_1'?'sp_active':''}>车辆图文</span>
                                </li>
                                <li>
                                    <span onClick={() => this.scrollToAnchor('sptit_4')} className={this.state.colorActive=='sptit_4_1'?'sp_active':''}>猜你喜欢</span>
                                </li> */}
                            </ul>
                        </nav>
                    </div>
                    : null
                }
            </div>
        )
    }

}