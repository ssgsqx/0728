
/**
 * 清除空字符串
 */
export default class TrimUtil {
   static trimOut =(string: String) => {
     String.prototype.trim = function () {
       return this.replace(/\s+/g, '');
     };

     return string.trim();
   }
}
