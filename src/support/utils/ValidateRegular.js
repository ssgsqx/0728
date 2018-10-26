import TrimUtil from './TrimUtil';

/**
 * 手机号码验证规则
 */
export default class ValidateRegular {
    static validatePhoneNumber = (pNumber, callback) => {
      const split = ' ';

      let result = String(pNumber);

      if (result) {
        const valueTrim = TrimUtil.trimOut(result);
        const len = valueTrim.length;

        if (len <= 3) {
          result = valueTrim;
        } else if (len <= 7) {
          result = valueTrim.substring(0, 3) + split + valueTrim.substring(3, len);
        } else {
          result = valueTrim.substring(0, 3) + split + valueTrim.substring(3, 7) + split + valueTrim.substring(7, len);
        }

        callback(result);
      }
    }
}

