
import '../../resource/css/Toast.css';

export default class ToastUtil {

  static show(message: String, duration = 3000, options) {

      let timeOut = duration;
      let toast = document.createElement('DIV');
      toast.classList.add('toast-it');
      let content = document.createTextNode(message);
      toast.appendChild(content);
      toast.style.animationDuration = timeOut / 1000 + 's';

      for (let prop in options) {
          toast.style[prop] = options[prop];
      }

      document.body.appendChild(toast);
      let timer = setTimeout(function() {
          document.body.removeChild(toast);
          clearTimeout(timer);
      }, timeOut);
  }
}
