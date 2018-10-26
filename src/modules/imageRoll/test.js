import React from 'react';
import BaseController from '../../support/base/BaseController';
import LogUtil from '../../support/utils/LogUtil';
import ImageRollView from './ImageRollView';

/**
 *
 */
export default class IndexController extends BaseController {
	constructor(props) {
		super(props);
		this.state = {
			picList: [],
			show2: false,
			show2Index: 1
		};
	}
	componentDidMount() {}

	render() {
		let picList = [
			{
				index: 0,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
				originalTitle: '外观1',
				group: '中控',
				imgDes: '中控有部分掉漆'
			},
			{
				index: 1,
				original:
					'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/image_set_default.jpg',
				thumbnail:
					'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/image_set_thumb.jpg',
				originalTitle: '外观2',
				group: '外观',
				imgDes: '外观太脏需要清洗'
			},
			{
				index: 2,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1t.jpg',
				originalTitle: '外观3',
				group: '外观',
				imgDes: '外观有磕碰痕迹'
			},
			{
				index: 3,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2t.jpg',
				originalTitle: '外观4',
				group: '内饰',
				imgDes: '外观有磕碰痕迹第三方'
			},
			{
				index: 4,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3t.jpg',
				originalTitle: '外观5',
				group: '内饰',
				imgDes: '外观有磕碰痕迹第三方1'
			},
			{
				index: 5,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4t.jpg',
				originalTitle: '外观6',
				group: '内饰',
				imgDes: '外观有磕碰痕迹第三方3'
			},
			{
				index: 6,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/5.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/5t.jpg',
				originalTitle: 'originalTitle',
				originalTitle: '外观7',
				group: '发动机',
				imgDes: '外观有发动机磕碰痕迹第三方'
			},
			{
				index: 7,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/6.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/6t.jpg',
				originalTitle: '外观8',
				group: '发动机',
				imgDes: '外观有发动机磕碰痕迹第三方'
			},
			{
				index: 8,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/7.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/7t.jpg',
				originalTitle: '外观8',
				group: '发动机',
				imgDes: '外发动机观有磕碰痕迹第三方'
			},
			{
				index: 9,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/8.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/8t.jpg',
				originalTitle: '外观8',
				group: '发动机',
				imgDes: '外观有磕碰发动机痕迹第三方'
			},
			{
				index: 10,
				original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/9.jpg',
				thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/9t.jpg',
				originalTitle: '外观8',
				group: '发动机',
				imgDes: '发动机有磕碰痕迹第三方'
			}
			// {
			// 	original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/10.jpg',
			// 	thumbnail: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/10t.jpg'
			// }
			// {
			//     "original": "https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/11.jpg",
			//     "thumbnail": "https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/11t.jpg"
			// }
		];

		return (
			<div style={{ marginTop: '0px' }}>
				<ImageRollView
					picList={picList}
					orderCode="12345678"
					isShowfooter={true}
					isShowAllPic={true}
					onClickGoback={() => {
						document.body.scrollIntoView();
					}}
				/>
				<div style={{ height: '800px ' }}>
					<br /> <br /> <br />
					<button
						onClick={() => {
							this.setState({ show2: !this.state.show2, show2Index: 2 });
						}}
					>
						点击
					</button>
					<button
						onClick={() => {
							this.setState({ show2: !this.state.show2, show2Index: 5 });
						}}
					>
						点击
					</button>
					{this.state.show2 ? (
						<ImageRollView
							picList={picList}
							orderCode=""
							isShowfooter={false}
							startIndex={1}
							isInitfullScreen={true}
							startIndex={this.state.show2Index}
							isShowImgeDesInfo={true}
							onClickGoback={(i) => {
								this.setState({ show2: !this.state.show2 });
							}}
						/>
					) : null}
				</div>
			</div>
		);
	}
}
