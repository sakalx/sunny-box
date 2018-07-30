import 'root/static/json/geography-map.json';
import 'root/static/json/timezones.json';

const cacheConfig = {
  "version": {
    "key": "cache-version",
    "value": "0.0.1",
  },
  "geographyMap": {
    "key": "geography-map",
    "src": "static/json/geography-map.json",
  },
  "alphabet": {
    "key": "alphabet-svg",
  },
  "countryList": {
    "key": "country-list",
  },
  "timezones": {
    "key": "timezones",
    "src": "static/json/timezones.json",
  },
  "lastStation": {
    "key": "last-station",
  },
};

export default cacheConfig;