import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../support/base/BaseView';
import './ImageAllStyle.css';
import ImageFooterBar from './ImageFooterBarView';

export default class ImageAllView extends BaseView {
	static defaultProps = {
		picList: [],
		isShowfooter: false,
		goback: () => {}
	};
	render() {
		let { picList, isShowfooter } = this.props;
		console.log(picList);
		let picHtml = [];
		let groupList = [];
		if (picList.length > 0) {
			// picList = picList.map((it, idx) => {
			// 	return { index: idx, ...it };
			// });
			picList.forEach((it, k) => {
				if (!groupList.includes(it.group)) {
					groupList.push(it.group);
					var pl2 = picList.filter((a) => a.group == it.group);
					let lihtm = [];
					pl2.forEach((e, i) => {
						lihtm.push(
							<li key={'li_' + i} className="dq_pclli">
								<a
									onClick={() => {
										this.props.goback(e.index);
									}}
								>
									<img src={e.thumbnail} />
								</a>
							</li>
						);
					});

					picHtml.push(
						<div key={'pl_' + k} className="clearfix">
							<h3>{it.group}</h3> <ul className="dq_pclul">{lihtm}</ul>
						</div>
					);
					// picHtml.push(phtml);
					console.log(picHtml);
				}
			});
		}
		return (
			<div className="dq_pcaList">
				<div className="dq_pcaheader clearfix">
					全部图片
					<span
						className="dq_pcahd_back"
						onClick={() => {
							this.sendIsShowHeaderMessage(1)
							this.props.goback();
						}}
					/>
				</div>
				<div className="dq_pcacont">{picHtml}</div>
				{isShowfooter ? <ImageFooterBar otherCss="dq_ftoth" /> : null}
			</div>
		);
	}
}
