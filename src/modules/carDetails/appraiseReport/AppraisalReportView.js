import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../../support/base/BaseView';
import LineChart from '../../../support/views/LineChart';
import './AppraisalReportStyle.css';

export default class AppraisalReportView extends BaseView {
	constructor(props) {
		super(props);

		this.state = {
			curLeveL: 'b',
			appraisePrice: null,
			curPrice: null,
			priceType: 0
		};
	}
	static propTypes = {
		reportType: PropTypes.oneOf([ 'sellcar', 'buycar' ]).isRequired,
		apprValue: PropTypes.object
	};
	// static defaultProps = {
	// 	reportType: 'sellcar'
	// };
	componentWillReceiveProps(nexprops) {
		// console.log('nexprops', nexprops);
		let { reportType, apprValue } = nexprops;
		let appraisePrice = apprValue != null ? apprValue.appraisePrice : null;
		let curPrice = null;
		if (appraisePrice != null) {
			if (reportType == 'sellcar') {
				curPrice = appraisePrice.c2BPrices;
			} else if (reportType == 'buycar') {
				curPrice = appraisePrice.b2CPrices;
			}
		}
		this.setState({
			appraisePrice,
			curPrice
		});
	}

	componentDidMount() {}

	changeLevel(lev) {
		this.setState({
			curLeveL: lev
		});
	}
	changePriceType(pt) {
		let curPrice;
		if (pt == 0) {
			curPrice = this.state.appraisePrice != null ? this.state.appraisePrice.c2BPrices : null;
		} else if (pt == 1) {
			curPrice = this.state.appraisePrice != null ? this.state.appraisePrice.c2CPrices : null;
		}
		this.setState({
			priceType: pt,
			curLeveL: 'b',
			curPrice: curPrice
		});
	}
	render() {
		let { curLeveL, curPrice } = this.state;
		let { reportType, apprValue } = this.props;
		let styleName, imgUrl, regdate, milage, cityName, modelName, ncmsrp;
		let charData1 = [],
			charData2 = [];

		if (apprValue != null) {
			styleName = apprValue.styleFullName;
			imgUrl = apprValue.img;
			regdate = apprValue.regDate;
			milage = apprValue.mileage;
			cityName = apprValue.cityName;
			ncmsrp = apprValue.ncmsrp;
			if (apprValue.residual != null) {
				apprValue.residual.forEach((ele) => {
					let month = ele.month.split('-')[0].substr(2) + '/' + ele.month.split('-')[1];
					let price = ele.b2CPrices;
					if (reportType == 'sellcar') {
						price = ele.c2BPrices;
					}
					// console.log({ x: month, y: price });
					charData1.push({ x: month, y: price });
				});
			}
		}

		return (
			<div className="dq_rpt">
				<header className="dq_rptheader">
					<div className="per_tit">
						<a
							onClick={() => {
								this.gotoBack();
							}}
						>
							<i className="per_icon_tit jtx" />
						</a>
						{reportType == 'sellcar' ? (
							<span className="per_tit_span">估值报告</span>
						) : (
							<span className="per_tit_span">卖车估值报告</span>
						)}
					</div>
				</header>
				<div className="cont">
					<div className="">
						<div className="clearfix cl_owner_top">
							<div className="cl_owner_top_img">
								<img src={imgUrl} alt="" />
							</div>

							{reportType == 'sellcar' ? (
								<div className="cl_owner_top_text">
									<span className="cl_owner_top_title">{styleName}</span>
									<span className="cl_owner_top_information">
										{regdate}｜{milage}万公里｜{cityName}
									</span>
									<span className="cl_owner_top_information clfont_12">新车指导价：{ncmsrp}万元</span>
								</div>
							) : (
								<div className="cl_owner_top_text">
									<span className="cl_owner_top_title">{styleName}</span>
								</div>
							)}
						</div>
					</div>
					<div className="cl_grays" />
					<div className="">
						{reportType == 'sellcar' ? (
							<div className="clearfix cl_tab">
								<a
									href="javascript:void(0)"
									onClick={() => {
										this.changePriceType(0);
									}}
									className={this.state.priceType == 0 ? 'active' : ''}
								>
									车商报价<span />
								</a>
								<a
									href="javascript:void(0)"
									onClick={() => {
										this.changePriceType(1);
									}}
									className={this.state.priceType == 1 ? 'active' : ''}
								>
									个人报价
								</a>
							</div>
						) : null}
						<div className="">
							{reportType == 'sellcar' ? this.state.priceType == 0 ? (
								<span className="cl_car_title">估值偏低是因车商需保留利润空间，但成交速度快（约1-2天）</span>
							) : (
								<span className="cl_car_title">卖给个人价格较高，但成交速度慢（约3-15天）</span>
							) : (
								<span className="cl_car_title" />
							)}

							<ul className="clearfix cl_carlist">
								<li
									className={curLeveL == 'c' ? 'active' : ''}
									onClick={() => {
										this.changeLevel('c');
									}}
								>
									<div className="cl_carlist_top">
										<span>
											<em>车况一般</em>
											<em className={curLeveL == 'c' ? 'cl_center' : ''}>
												<i className={curLeveL == 'c' ? 'cl_carprice' : ''}>
													{curPrice ? curPrice['c']['mid'] : ''}
												</i>万
											</em>
											{curLeveL == 'c' ? <em>建议售价</em> : null}
										</span>
									</div>
									<div className="cl_border">
										<i />
									</div>
								</li>
								<li
									className={curLeveL == 'b' ? 'active' : ''}
									onClick={() => {
										this.changeLevel('b');
									}}
								>
									<div className="cl_carlist_top">
										<span>
											<em>车况良好</em>
											<em className={curLeveL == 'b' ? 'cl_center' : ''}>
												<i className={curLeveL == 'b' ? 'cl_carprice' : ''}>
													{curPrice ? curPrice['b']['mid'] : ''}
												</i>万
											</em>
											{curLeveL == 'b' ? <em>建议售价</em> : null}
										</span>
									</div>
									<div className="cl_border">
										<i />
									</div>
								</li>
								<li
									className={curLeveL == 'a' ? 'active' : ''}
									onClick={() => {
										this.changeLevel('a');
									}}
								>
									<div className="cl_carlist_top">
										<span>
											<em>车况极好</em>
											<em className={curLeveL == 'a' ? 'cl_center' : ''}>
												<i className={curLeveL == 'a' ? 'cl_carprice' : ''}>
													{curPrice ? curPrice['a']['mid'] : ''}
												</i>万
											</em>
											{curLeveL == 'a' ? <em>建议售价</em> : null}
										</span>
									</div>
									<div className="cl_border">
										<i />
									</div>
								</li>
							</ul>
						</div>
						<div className="cl_range">
							精真估建议价格区间:<span>
								<em>
									{curPrice ? curPrice[curLeveL]['low'] : ''}-{curPrice ? curPrice[curLeveL]['up'] : ''}
								</em>万
							</span>
						</div>
					</div>
					<div className="cl_grays" />
					<div className="cl_owner_bottom pb17 clearfix">
						<h3>价格走势</h3>
						<div className="pos_rev">
							<div id="line">
								<LineChart
									lineColor="#ED3946"
									pointColor="#fff"
									pointStrokeColor="#ED3946"
									pointSize={4}
									data={charData1}
									labelUnit="万"
								/>
							</div>
							{/* <div className="zw_qu_line">
								<i />
							</div> */}
						</div>
						{reportType == 'buycar' ? (
							<div>
								<h3>{modelName} 车主换车分析</h3>
								<div className="pos_rev">
									<div id="line">
										<LineChart
											lineColor="#ED3946"
											pointColor="#fff"
											pointStrokeColor="#ED3946"
											pointSize={4}
											data={charData2}
											labelUnit="%"
										/>
									</div>
								</div>
							</div>
						) : null}
					</div>
					<div className="cl_grays" />
					{reportType == 'sellcar' ? (
						<div className="cl_owner_bottom pb17 clearfix">
							<h3>卖高价技巧</h3>
							<div className="dq_mgjinfo">
								<p>
									<span>1</span>卖车之前，保持车内外干净整洁
								</p>
								<p>
									<span>2</span>如果外观有可见伤（划痕、凹陷等）建议进行抛光封釉，或补漆处理
								</p>
								<p>
									<span>3</span>车辆在保修期内，可高价成交
								</p>
								<a className="gmyba">
									购买延保服务 <em />
								</a>
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
