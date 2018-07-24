import firebase from 'firebase/app';
import 'firebase/firestore';

import initializeApp from '../initializeApp';

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});


export const addRadio = ({country, genre, title, ...other}) => {
  const newRadio = {[title]: {title, ...other}};

  return firestore.doc(`${country}/${genre}`).set(newRadio, {merge: true});
};


export const getRadioByCountry = country => firestore.collection(country).get()
  .then(querySnapshot => {
      const data = [];

      querySnapshot.forEach(doc => {
        data.push({
          [doc.id]: Object.values(doc.data())
        })
      });

      return data;
    }
  );