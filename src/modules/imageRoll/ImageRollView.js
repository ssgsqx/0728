import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../support/base/BaseView';

import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import './ImageRollStyle.css';

import ImageAllView from './ImageAllView';
import ImageFooterBar from './ImageFooterBarView';

export default class ImageRollView extends BaseView {
	static propTypes = {
		picList: PropTypes.array,
		isShowAllPic: PropTypes.bool,
		orderCode: PropTypes.string,
		isShowfooter: PropTypes.bool,
		startIndex: PropTypes.number
	};
	static defaultProps = {
		picList: [],
		isShowAllPic: false,
		orderCode: '',
		isShowfooter: false,
		startIndex: 0,
		isInitfullScreen: false,
		isShowImgeDesInfo: false,
		onClickGoback: (i) => {}
	};
	state = {
		showThumbnails: false,
		isfullScreen: false,
		curImgTitle: '',
		curImgDes: '',
		allImgShow: false
	};

	componentDidMount() {
		if (this.props.isInitfullScreen) {
			this.setState({
				isfullScreen: true,
				showThumbnails: true,
				curImgTitle: this.props.picList[this.props.startIndex].group,
				curImgDes: this.props.picList[this.props.startIndex].imgDes
			});
			this.refs.ref_ImgRoll.fullScreen();
		}
	}

	render() {
		let { refId, startIndex, isShowAllPic, picList, orderCode, isShowfooter, isShowImgeDesInfo } = this.props;
		return (
			<div>
				<div className="PicRoll" style={{ touchAction: 'none', position: 'relative', zIndex: 1 }}>
					{this.state.isfullScreen ? (
						<div className="dq_imglistHeader clearfix">
							{this.state.curImgTitle}
							<span
								className="dq_left_back"
								onClick={() => {
									this.sendIsShowHeaderMessage(0);
									this.setState({ showThumbnails: false, isfullScreen: false });

									this.refs.ref_ImgRoll.exitFullScreen();
									this.props.onClickGoback(this.refs.ref_ImgRoll.getCurrentIndex());
								}}
							/>
							{this.props.isShowAllPic ? (
								<a
									className="dq_right"
									onClick={() => {
										this.setState({ allImgShow: !this.state.allImgShow });
										this.sendIsShowHeaderMessage(1);
									}}
								>
									全部图片
								</a>
							) : null}
						</div>
					) : null}

					<div className="dq_lbdiv">
						<ImageGallery
							ref="ref_ImgRoll"
							items={picList}
							startIndex={startIndex}
							showPlayButton={false}
							showBullets={false}
							showNav={false}
							showIndex={true}
							autoPlay={false}
							// slideDuration={100}
							showFullscreenButton={false}
							showThumbnails={this.state.showThumbnails}
							useBrowserFullscreen={false}
							additionalClass={isShowImgeDesInfo ? 'dq_Imglistyds' : ''}
							onClick={(event) => {
								this.sendIsShowHeaderMessage(1);
								let index = this.refs.ref_ImgRoll.getCurrentIndex();
								this.setState({
									isfullScreen: true,
									showThumbnails: true,
									curImgTitle: this.props.picList[index].group,
									curImgDes: this.props.picList[index].imgDes
								});
								this.refs.ref_ImgRoll.fullScreen();
							}}
							renderCustomControls={() => {
								return (
									<div>
										{isShowImgeDesInfo ? (
											<div className="dq_image_des">
												{this.state.curImgTitle}&nbsp;&nbsp;&nbsp;&nbsp;{this.state.curImgDes}{' '}
											</div>
										) : null}
									</div>
								);
							}}
							onSlide={(currentIndex) => {
								// console.log("onSlide", currentIndex, this.props.picList[currentIndex].group);
								this.setState({
									curImgTitle: this.props.picList[currentIndex].group,
									curImgDes: this.props.picList[currentIndex].imgDes
								});
							}}
						/>
						{orderCode != '' ? <div className="dq_ddbh">车源号：{orderCode}</div> : null}
					</div>
					{this.state.isfullScreen && isShowfooter ? <ImageFooterBar /> : null}
				</div>

				{isShowAllPic && this.state.allImgShow ? (
					<ImageAllView
						picList={this.props.picList}
						isShowfooter={isShowfooter}
						goback={(index) => {
							this.setState({ allImgShow: !this.state.allImgShow });
							if (index != undefined) {
								this.refs.ref_ImgRoll.slideToIndex(index);
							}
						}}
					/>
				) : null}
			</div>
		);
	}
}
