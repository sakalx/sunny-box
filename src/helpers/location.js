import cacheConfig from 'root/config/cache';
import {getCache} from 'root/api';

const getTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';

const getLocation = () => {
  const currentTimezone = getTimezone();

  return getCache(cacheConfig.geographyMap)
    .then(geo => {
      const country = geo.objects.countries1.geometries.find(({timezones}) =>
        timezones.some(timezone => timezone === currentTimezone));

      return country ? country.properties.name : 'United States of America';
    });
};

export default getLocation;