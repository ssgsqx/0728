

import { isDebug } from '../constant/gloable/RNData';

const releaseUrl = '';
const debugUrl = 'http://atrade.jingzhengu.com';

export const domainUrl = isDebug ? debugUrl : releaseUrl;

