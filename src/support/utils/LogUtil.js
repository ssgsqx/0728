import * as RNData from '../constant/gloable/RNData';


/**
 * 调试日志
 * @param message
 */
export default class LogUtil {
  static log(message) {
    RNData.isDebug && console.log(message);
  }

  static warn(message) {
    RNData.isDebug && console.warn(message);
  }

  static info(message) {
    RNData.isDebug && console.info(message);
  }
}
