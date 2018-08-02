import moment from 'moment-timezone';
import Base64Decode from "root/helpers/decoder-base64";

const getTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone
  || moment.tz.guess()
  || 'America/New_York';

const getLocation = timezones => {
  const currentTimezone = getTimezone();

  const defaultCountry = {
    "code": "US",    
    "label": "United States of America",
  };

  const country = Base64Decode(timezones).data
    .find(({timezones}) => timezones
      .find(timezone => timezone === currentTimezone));

      return country || defaultCountry;
};

export default getLocation;