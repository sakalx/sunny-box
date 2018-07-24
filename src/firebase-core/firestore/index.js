import firebase from 'firebase/app';
import 'firebase/firestore';

import initializeApp from '../initializeApp';

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});


export const getCountries = () => firestore.collection('countries').get()
  .then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => data.push(doc.id));

      return data;
    }
  );


export const getRadioByCountry = country =>
  firestore.doc(`countries/${country}`).get().then(doc => doc.data());


export const addRadio = ({country, genre, ...other}) => {
  const newRadio = {...other};

  return getRadioByCountry(country)
    .then(prevData => {

      const newData = {
        ...prevData,
        [genre]: [...prevData[genre], newRadio]
      };

      return firestore.doc(`countries/${country}`).update(newData);
    });
};

