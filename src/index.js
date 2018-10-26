import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import 'antd-mobile/dist/antd-mobile.css'
import './index.css';
import registerServiceWorker from './support/utils/registerServiceWorker';

render(<App />, document.getElementById('app'));

registerServiceWorker();
