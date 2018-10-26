import React from 'react';
import '../../resource/css/404.css';
import BaseController from "../base/BaseController";

export default class NoFindPage extends BaseController {

	state = {
		levSecond: 5
	};

	componentDidMount() {
		let setInt = setInterval(() => {
			if (this.state.levSecond <= 1) {
				clearInterval(setInt);
				window.location.href = './';
			} else {
				this.setState({ levSecond: this.state.levSecond - 1 });
			}
		}, 1000);
	}

	render() {
		return (
			<div>
				<header className='nf_headerTitle'>
					<a href="./">
						<em className='nf_em_icon' />
					</a>404页面
				</header>
				<div className='nf_dv_main'>
					<img src={require('../../resource/images/tu404.png')} />
					<span>页面找不到了....</span>
					<span>{this.state.levSecond}秒后去首页</span>
				</div>
			</div>
		);
	}
}
