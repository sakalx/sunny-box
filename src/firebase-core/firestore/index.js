import firebase from 'firebase/app';
import 'firebase/firestore';

import FIREBASEConfig from 'root/config/firebase';

firebase.initializeApp(FIREBASEConfig);

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});


export const getCountries = () => firestore.collection('countries').get()
  .then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => data.push(doc.id));

      return data;
    }
  );

export const getStationsByCountry = country =>
  firestore.doc(`countries/${country}`).get().then(doc => doc.data());

export const getSvgAlphabet = () =>
  firestore.doc('svg/alphabet').get().then(doc => doc.data());

export const addRadio = ({country, genre, ...other}) => {
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