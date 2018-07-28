import moment from 'moment-timezone';
import Base64Decode from "root/helpers/decoder-base64";

const getTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone
  || moment.tz.guess()
  || 'America/New_York';

const getLocation = timezones =>
  Base64Decode(timezones).timezones
    .find(({timezones}) => timezones
      .find(timezone => timezone === getTimezone()));

export default getLocation;