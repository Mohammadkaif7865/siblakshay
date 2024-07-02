import moment from 'moment-timezone';

import * as CONSTANTS from "../constants/constants";

export var formatDate = (date, format) => {
  return moment(date).tz(CONSTANTS.TIMEZONE).format(format);
}
