import React, { Component } from 'react';

/**
 * hu
 * @category view基类
 */
export default class BaseView extends Component {
  constructor(props) {
    super(props);
  }

  /**
     * 跳转页面监听RN是否有头部 （type=1 RN不显示头部）
     */
  sendIsShowHeaderMessage = (num) => {
    const message = { cmd: 31, type: num };
    window.postMessage(JSON.stringify(message), '*');
  }
  /**
   * 跳转页面
   */
  gotoUrl = (url) => {
    if (this.props) {
      this.props.history.push(url)
    }

  }
  /**
   * 返回页面
   */
  gotoBack = () => {
    if (this.props) {
      this.props.history.goBack();
    }
  }
}
