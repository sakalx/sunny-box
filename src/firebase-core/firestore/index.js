import firebase from 'firebase/app';
import 'firebase/firestore';

import FIREBASEConfig from 'root/config/firebase';

firebase.initializeApp(FIREBASEConfig);

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});


export const getCountries = () => firestore.collection('stations').get()
  .then(querySnapshot => {
      const list = {};

      querySnapshot.forEach(doc => list[doc.id] = null);
      return list;
    }
  );

export const getStationsByCountry = country =>
  firestore.doc(`stations/${country}`).get().then(doc => doc.data());

export const getSvgAlphabet = () =>
  firestore.doc('svg/alphabet').get().then(doc => doc.data());

const addRadio = ({country, genre, ...other}) => {
  const newRadio = {...other};

  return getStationsByCountry(country)
    .then(prevData => {

      const newData = {
        ...prevData,
        [genre]: [...prevData[genre], newRadio]
      };

      return firestore.doc(`stations/${country}`).update(newData);
    });
};

const add = data => firestore.doc(`stations/${country}`).set(data);