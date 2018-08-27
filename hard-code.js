const axios = require('axios');

require('firebase/firestore');
const firebase = require('firebase/app');

const geo = require('./src/static/json/geography-map.json');

firebase.initializeApp({
  apiKey: "AIzaSyCQc4tLTpdJOrUzXwqq04rXJZYvfkrWMm8",
  authDomain: "sunny-box.firebaseapp.com",
  databaseURL: "https://sunny-box.firebaseio.com",
  projectId: "sunny-box",
  storageBucket: "sunny-box.appspot.com",
  messagingSenderId: "560323853096"
});

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});


function merge(responses) {
  const merged = [];

  responses.forEach(({data}) => merged.push(...data));
  return merged;
}

function createOurData(stations) {

  return stations
    .map(s => ({
      country: s.country,
      genre: s.categories[0].slug,
      image: s.image.thumb.url,
      name: s.name,
      src: s.streams.map(({stream}) => stream),
      uid: s.id,
      website: s.website,
    }))
    .reduce((acc, next) => {
      acc[next.genre] = acc[next.genre]
        ? [...acc[next.genre], next]
        : [next];

      return acc
    }, {});
}

function sendToFirestore(country, data) {
  firestore.doc(`stations/${country}`).set(data)
    .then(() => console.log('should be good'))
    .catch(error => console.error('Firebase:', error));
}

function getData(countryCode, pages) {
  const country = geo.objects.countries1.geometries
    .find(({properties}) => properties['Alpha-2'] === countryCode);

  if (!country) {
    console.log('hmm... country name not found');
    return
  }

  const url = page => `http://api.dirble.com/v2/countries/${countryCode.toLowerCase()}/stations/?token=146861067c97180b6e3fc79f34&per_page=2&page=${page}`;
  const api = Array.from(Array(pages)).map((x, i) => axios.get(url(i + 1)));

  axios.all(api)
    .then(axios.spread((...responses) => merge(responses)))
    .then(stations => createOurData(stations))
    .then(data => sendToFirestore(country.properties.name, data))
    .catch(error => console.error('api', error));
}


getData('RU', 1);