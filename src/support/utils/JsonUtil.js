
import LogUtil from "../utils/LogUtil";
export default class JsonUtil {
  /**
     *map转化为对象（map所有键都是字符串，可以将其转换为对象）
     */
  static strMapToObj(strMap) {
      let obj = Object.create(null);
      strMap.forEach((v, k) => {
          obj[k] = v;
      });
    return obj;
  }

  /**
     *map转换为json
     */
  static mapToJson(map) {
    return JSON.stringify(this.strMapToObj(map));
  }
}

