import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../support/base/BaseView';
import './ImageFooterBarStyle.css';

export default class ImageFooterBarView extends BaseView {
	static defaultProps = {
		otherCss: ''
	};

	render() {
		let { otherCss } = this.props;
		return (
			<div className={'dq_imglistFooter clearfix ' + otherCss}>
				<a
					className="dq_btn"
					onClick={() => {
						alert('咨询车况');
					}}
				>
					咨询车况
				</a>
				<a
					className="dq_btn dq_btn1"
					onClick={() => {
						alert('预约看车');
					}}
				>
					预约看车
				</a>
			</div>
		);
	}
}
