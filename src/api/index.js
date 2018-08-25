import firebase from 'firebase/app';
import 'firebase/firestore';

import firebaseConfig from 'root/config/firebase';
import cacheConfig from 'root/config/cache';

import Base64Decode from 'root/helpers/decoder-base64';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});

/*
const TOKEN = '146861067c97180b6e3fc79f34';
const SPARE_TOKEN = '2227bc9dbeeea2063129a72a3d';
const api = `https://api.dirble.com/v2/countries/ru/stations/?token=${TOKEN}&per_page=30`;
*/

const checkStatus = response =>
  response.status === 200
    ? Promise.resolve(response)
    : Promise.reject(new Error(response.statusText));

export const getCache = config => {
  const value = localStorage.getItem(config.key);

  if (!value) {
    const fileReader = new FileReader();

    return fetch(config.src)
      .then(checkStatus)
      .then(isBlob => isBlob.blob())
      .then(blob =>
        new Promise(resolve => {
          fileReader.readAsDataURL(blob);

          fileReader.onload = event => {
            localStorage.setItem(config.key, event.target.result);
            resolve(Base64Decode(event.target.result));
          };
        })
      )
      .catch(err => console.error(err));
  }

  return new Promise(resolve => resolve(Base64Decode(value)));
};

export const getCountriesList = () => {
  const list = localStorage.getItem(cacheConfig.countriesList);

  if (!list) {
    return firestore.collection('stations').get()
      .then(querySnapshot => {
        const list = [];

        querySnapshot.forEach(doc => list.push(doc.id));
        localStorage.setItem(cacheConfig.countriesList.key, JSON.stringify(list));

        return list;
      })
      .catch(err => console.error(err));
  }

  return new Promise(resolve => resolve(list));
};

export const getStationsByCountry = country => {
  const value = localStorage.getItem(country);

  if (!value) {
    return firestore.doc(`stations/${country}`).get()
      .then(doc => {
        const value = doc.data();

        localStorage.setItem(country, JSON.stringify(value));

        localStorage.length >= 21 &&
        localStorage.removeItem(localStorage.key(7));

        return value;
      });
  }

  return new Promise(resolve => resolve(JSON.parse(value)));
};