import firebase from 'firebase/app';
import 'firebase/firestore';

import FIREBASEConfig from 'root/config/firebase';

firebase.initializeApp(FIREBASEConfig);

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});


export const getCountries = () => firestore.collection('stations').get()
  .then(querySnapshot => {
      const list = [];

      querySnapshot.forEach(doc => list.push(doc.id));

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


//http://api.dirble.com/v2/countries/ru/stations/?token=146861067c97180b6e3fc79f34&per_page=3
//http://api.dirble.com/v2/countries/ru/0/20/stations?token=146861067c97180b6e3fc79f34

const foo = [{
  "id": 58750,
  "name": "BrooklynFM (BFM)",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/58750/19716ad5-6eff-4c97-bfbf-29c82ddb4cd0.jpg",
    "thumb": {"url": "https://img.dirble.com/station/58750/thumb_19716ad5-6eff-4c97-bfbf-29c82ddb4cd0.jpg"}
  },
  "slug": "brooklynfm-bfm",
  "website": "bfmradio.us",
  "twitter": "@bfmradionyc",
  "facebook": "https://www.facebook.com/bfmradioru/",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://stream.bfmradio.us:8070/radio",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://stream-24.bfmradio.us",
    "bitrate": 24,
    "content_type": "audio/aacp",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2018-05-08T03:48:31+02:00",
  "updated_at": "2018-05-08T03:48:31+02:00"
}, {
  "id": 58742,
  "name": "KEXXX.Rocks",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/58742/091fb48a-1b5e-43d7-9835-7857bfc6c065.jpg",
    "thumb": {"url": "https://img.dirble.com/station/58742/thumb_091fb48a-1b5e-43d7-9835-7857bfc6c065.jpg"}
  },
  "slug": "kexxxrocks",
  "website": "http://kexxx.rocks/",
  "twitter": "",
  "facebook": "https://www.facebook.com/KEKSFMKiev/",
  "total_listeners": 0,
  "categories": [{
    "id": 2,
    "title": "Rock",
    "description": "simple rock. from elvis to metallica and like hardrock as iron maiden.",
    "slug": "rock",
    "ancestry": null
  }, {
    "id": 8,
    "title": "Hard Rock",
    "description": "stations that plays simple and clean hardrock",
    "slug": "hard-rock",
    "ancestry": "2"
  }, {"id": 18, "title": "Classic Rock", "description": "", "slug": "classic-rock", "ancestry": "2"}, {
    "id": 19,
    "title": "Modern Rock",
    "description": "",
    "slug": "modern-rock",
    "ancestry": "2"
  }],
  "streams": [{
    "stream": "http://listen6.myradio24.com:9000/51020",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 4
  }],
  "created_at": "2018-05-06T20:07:56+02:00",
  "updated_at": "2018-07-13T20:21:58+02:00"
}, {
  "id": 58733,
  "name": "Radio Company 1",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/58733/f1c188f6-79ee-490c-ae17-f7a6648f8ff0.jpg",
    "thumb": {"url": "https://img.dirble.com/station/58733/thumb_f1c188f6-79ee-490c-ae17-f7a6648f8ff0.jpg"}
  },
  "slug": "radio-company-1",
  "website": "http://company.radio.fm",
  "twitter": "@radiocompany1",
  "facebook": "https://www.facebook.com/Radio-Company-160909787921609/",
  "total_listeners": 0,
  "categories": [{"id": 43, "title": "70s", "description": "", "slug": "70s", "ancestry": "40"}],
  "streams": [{
    "stream": "http://listen.shoutcast.com/radiocompany64",
    "bitrate": 64,
    "content_type": "audio/aacp",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://listen.shoutcast.com/radiocompany32",
    "bitrate": 32,
    "content_type": "audio/aacp",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://listen.shoutcast.com/radiocompany16",
    "bitrate": 16,
    "content_type": "audio/aacp",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2018-05-05T15:58:41+02:00",
  "updated_at": "2018-05-05T15:58:41+02:00"
}, {
  "id": 58682,
  "name": "Cosmic Waves - Pulsar",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/58682/26af4062-88f1-4838-b2d0-09ecbdb1d6a6.jpg",
    "thumb": {"url": "https://img.dirble.com/station/58682/thumb_26af4062-88f1-4838-b2d0-09ecbdb1d6a6.jpg"}
  },
  "slug": "cosmic-waves-pulsar",
  "website": "http://cosmicwaves.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 3,
    "title": "Dance",
    "description": "dance music, the new from 80's and 90's, like bubblegum and more.",
    "slug": "dance",
    "ancestry": "14"
  }, {"id": 23, "title": "House", "description": "", "slug": "house", "ancestry": "14"}],
  "streams": [{
    "stream": "http://cosmicwaves.ru:8000/pulsar",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2018-04-25T20:51:09+02:00",
  "updated_at": "2018-04-25T20:51:09+02:00"
}, {
  "id": 58681,
  "name": "Cosmic Waves",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/58681/fe23e598-4217-4410-b2f3-61eb2e901044.jpg",
    "thumb": {"url": "https://img.dirble.com/station/58681/thumb_fe23e598-4217-4410-b2f3-61eb2e901044.jpg"}
  },
  "slug": "cosmic-waves",
  "website": "http://cosmicwaves.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 69, "title": "Ambient", "description": "", "slug": "ambient", "ancestry": "14"}],
  "streams": [{
    "stream": "http://cosmicwaves.ru:8000/cosmicwaves",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2018-04-25T20:43:02+02:00",
  "updated_at": "2018-04-25T20:43:02+02:00"
}, {
  "id": 58666,
  "name": "Волхов VFM",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/58666/2243a570-272a-4d03-80bc-44df94c12580.jpg",
    "thumb": {"url": "https://img.dirble.com/station/58666/thumb_2243a570-272a-4d03-80bc-44df94c12580.jpg"}
  },
  "slug": "volhov-vfm",
  "website": "vfmradio.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://player.vfmradio.ru/stream.ogg",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2018-04-23T19:32:44+02:00",
  "updated_at": "2018-04-24T02:15:57+02:00"
}, {
  "id": 58371,
  "name": "Станция 3.0",
  "country": "RU",
  "image": {"url": null, "thumb": {"url": null}},
  "slug": "stantsiya-30",
  "website": "https://station30.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 23, "title": "House", "description": "", "slug": "house", "ancestry": "14"}],
  "streams": [{
    "stream": "https://myradio24.org/station30",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2018-03-25T08:59:03+02:00",
  "updated_at": "2018-03-25T08:59:03+02:00"
}, {
  "id": 58208,
  "name": "Донбасс ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/58208/e15d9bef-c7ad-4cfc-afe2-64a281c72bff.jpg",
    "thumb": {"url": "https://img.dirble.com/station/58208/thumb_e15d9bef-c7ad-4cfc-afe2-64a281c72bff.jpg"}
  },
  "slug": "donbass-fm",
  "website": "http://radiodonbassfm.com",
  "twitter": "",
  "facebook": "",
  "total_listeners": 2,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://194.145.216.43:8000/128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 2
  }],
  "created_at": "2018-02-24T05:53:38+01:00",
  "updated_at": "2018-02-24T05:53:38+01:00"
}, {
  "id": 58154,
  "name": "PhonAir - LilacStation",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/58154/4173eda1-7c40-4620-b592-7e4f6a723ccb.jpg",
    "thumb": {"url": "https://img.dirble.com/station/58154/thumb_4173eda1-7c40-4620-b592-7e4f6a723ccb.jpg"}
  },
  "slug": "phonair-lilacstation",
  "website": "http://www.radionomy.com/en/radio/phonair-lilacstation/index",
  "twitter": "@antonodincov",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://titan.shoutca.st:8282",
    "bitrate": 192,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2018-02-17T07:46:40+01:00",
  "updated_at": "2018-02-17T08:08:43+01:00"
}, {
  "id": 57965,
  "name": "Direct Drumz FM",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/57965/8f634e2a-dae8-40cb-af30-ae330eb773c5.jpg",
    "thumb": {"url": "https://img.dirble.com/station/57965/thumb_8f634e2a-dae8-40cb-af30-ae330eb773c5.jpg"}
  },
  "slug": "direct-drumz-fm",
  "website": "http://www.ddfm.org/",
  "twitter": "https://twitter.com/Storozh_Yurshin",
  "facebook": "https://www.facebook.com/radioddfm",
  "total_listeners": 0,
  "categories": [{
    "id": 14,
    "title": "Electronic",
    "description": "all computeriz made.",
    "slug": "electronic",
    "ancestry": null
  }],
  "streams": [{
    "stream": "https://streamer.radio.co/sd9fef18ef/listen",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }, {
    "stream": "https://streamer.radio.co/sd9fef18ef/low",
    "bitrate": 64,
    "content_type": "audio/aac",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2018-01-15T11:52:08+01:00",
  "updated_at": "2018-07-09T02:22:34+02:00"
}, {
  "id": 57940,
  "name": "Славянский Мир",
  "country": "RU",
  "image": {"url": null, "thumb": {"url": null}},
  "slug": "slavyanskii-mir",
  "website": "http://www.slavmir.tv/audio/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://83.217.203.197/stream/2/",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 10
  }],
  "created_at": "2018-01-13T02:08:36+01:00",
  "updated_at": "2018-01-13T02:08:36+01:00"
}, {
  "id": 57657,
  "name": "InSTYLE",
  "country": "RU",
  "image": {"url": null, "thumb": {"url": null}},
  "slug": "instyle-2f037902-0498-4b86-8e1d-5cf5304c7b2c",
  "website": "http://instyleradio.ru",
  "twitter": "",
  "facebook": "https://www.facebook.com/groups/instyleradio/",
  "total_listeners": 0,
  "categories": [{
    "id": 3,
    "title": "Dance",
    "description": "dance music, the new from 80's and 90's, like bubblegum and more.",
    "slug": "dance",
    "ancestry": "14"
  }, {
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }, {"id": 17, "title": "Top 40", "description": "", "slug": "top-40", "ancestry": "5"}, {
    "id": 42,
    "title": "90s",
    "description": "",
    "slug": "90s",
    "ancestry": "40"
  }],
  "streams": [{
    "stream": "http://s02.radio-tochka.com:5060/radio",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-11-22T21:22:00+01:00",
  "updated_at": "2017-11-22T21:22:00+01:00"
}, {
  "id": 57637,
  "name": "Radio SPB1",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/57637/f100a1d3-bd60-4c1e-a4f8-afbb5ada2e08.jpg",
    "thumb": {"url": "https://img.dirble.com/station/57637/thumb_f100a1d3-bd60-4c1e-a4f8-afbb5ada2e08.jpg"}
  },
  "slug": "radio-spb1-4575334d-cfd3-4a1e-b564-252cd1b3a334",
  "website": "http://www.radio-spb1.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 1,
    "title": "Trance",
    "description": "stations that plays commercial and other things in trance-music genre.",
    "slug": "trance",
    "ancestry": "14"
  }],
  "streams": [{
    "stream": "https://listen2.myradio24.com/2666",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://myradio24.org/2666",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-11-18T19:47:13+01:00",
  "updated_at": "2017-11-18T19:47:13+01:00"
}, {
  "id": 57541,
  "name": "Devilzz Radio",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/57541/29b74b07-6eb3-4a8c-9efc-5c5ac5b7916a.jpg",
    "thumb": {"url": "https://img.dirble.com/station/57541/thumb_29b74b07-6eb3-4a8c-9efc-5c5ac5b7916a.jpg"}
  },
  "slug": "devilzz-radio",
  "website": "http://www.devilzzradio.com",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 8,
    "title": "Hard Rock",
    "description": "stations that plays simple and clean hardrock",
    "slug": "hard-rock",
    "ancestry": "2"
  }, {"id": 18, "title": "Classic Rock", "description": "", "slug": "classic-rock", "ancestry": "2"}, {
    "id": 39,
    "title": "Light Rock",
    "description": "",
    "slug": "light-rock",
    "ancestry": "2"
  }],
  "streams": [{
    "stream": "http://188.40.135.197:8509/stream",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-11-02T23:12:48+01:00",
  "updated_at": "2017-11-03T07:08:30+01:00"
}, {
  "id": 57248,
  "name": "|----- GIRLS VOCAL PROGRESSIVE TRANCE -----|",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/57248/ff57957d-2392-4748-a8eb-6e9da25d899b.jpg",
    "thumb": {"url": "https://img.dirble.com/station/57248/thumb_ff57957d-2392-4748-a8eb-6e9da25d899b.jpg"}
  },
  "slug": "girls-vocal-progressive-trance",
  "website": "http://zerofm.org/",
  "twitter": "",
  "facebook": "https://www.facebook.com/zerofmstream/",
  "total_listeners": 0,
  "categories": [{
    "id": 1,
    "title": "Trance",
    "description": "stations that plays commercial and other things in trance-music genre.",
    "slug": "trance",
    "ancestry": "14"
  }],
  "streams": [{
    "stream": "http://213.141.136.16:8000/",
    "bitrate": 192,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 10
  }],
  "created_at": "2017-08-11T07:48:42+02:00",
  "updated_at": "2017-08-11T07:48:44+02:00"
}, {
  "id": 56815,
  "name": "Радио Пилот Lounge - Екатеринбург (Pilot Yekaterinburg)",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/56815/a37d497c-9f9a-40f7-855b-f44dac0a1932.jpg",
    "thumb": {"url": "https://img.dirble.com/station/56815/thumb_a37d497c-9f9a-40f7-855b-f44dac0a1932.jpg"}
  },
  "slug": "radio-pilot-lounge-ekaterinburg-pilot-yekaterinburg",
  "website": "https://pilotfm.ru",
  "twitter": "@pilotfm_ekb",
  "facebook": "https://www.facebook.com/pilotfm.ru",
  "total_listeners": 0,
  "categories": [{"id": 69, "title": "Ambient", "description": "", "slug": "ambient", "ancestry": "14"}],
  "streams": [{
    "stream": "http://online.pilotfm.ru:8000/pilot_lounge_mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }, {
    "stream": "http://online.pilotfm.ru:8000/pilot_lounge",
    "bitrate": null,
    "content_type": "audio/aacp",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-04-28T15:34:41+02:00",
  "updated_at": "2018-05-29T14:12:24+02:00"
}, {
  "id": 56814,
  "name": "Радио Пилот Secret - Екатеринбург (Pilot Yekaterinburg)",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/56814/47be8f17-73b6-4f4a-8c98-bc2a8c62bb2c.jpg",
    "thumb": {"url": "https://img.dirble.com/station/56814/thumb_47be8f17-73b6-4f4a-8c98-bc2a8c62bb2c.jpg"}
  },
  "slug": "radio-pilot-secret-ekaterinburg-pilot-yekaterinburg",
  "website": "https://pilotfm.ru",
  "twitter": "@pilotfm_ekb",
  "facebook": "https://www.facebook.com/pilotfm.ru",
  "total_listeners": 0,
  "categories": [{
    "id": 71,
    "title": "Adult Contemporary",
    "description": "",
    "slug": "adult-contemporary",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://online.pilotfm.ru:8000/pilot_secret_mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://online.pilotfm.ru:8000/pilot_secret",
    "bitrate": 64,
    "content_type": "audio/aacp",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-04-28T15:22:24+02:00",
  "updated_at": "2017-12-28T19:08:47+01:00"
}, {
  "id": 56813,
  "name": "Радио СИ 103.7 FM - Екатеринбург (Si Yekaterinburg)",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/56813/5d283a3a-9b85-472b-b685-02d9c5b8ddda.jpg",
    "thumb": {"url": "https://img.dirble.com/station/56813/thumb_5d283a3a-9b85-472b-b685-02d9c5b8ddda.jpg"}
  },
  "slug": "radio-si-1037-fm-ekaterinburg-si-yekaterinburg",
  "website": "http://www.radioc.ru",
  "twitter": "@radioc_ru",
  "facebook": "https://www.facebook.com/RadioC103.7/",
  "total_listeners": 0,
  "categories": [{
    "id": 71,
    "title": "Adult Contemporary",
    "description": "",
    "slug": "adult-contemporary",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://online.radioc.ru:8000/radioc",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }, {
    "stream": "http://online.radioc.ru:8000/radioc32",
    "bitrate": 32,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://online.radioc.ru:8000/radioc_aacplus",
    "bitrate": 64,
    "content_type": "audio/aacp",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-04-28T14:58:01+02:00",
  "updated_at": "2017-05-16T14:27:11+02:00"
}, {
  "id": 56812,
  "name": "Радио Джем 102.5 FM - Екатеринбург (Jam Yekaterinburg)",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/56812/8046ad3c-d2d7-4503-be26-70714eaf09a9.jpg",
    "thumb": {"url": "https://img.dirble.com/station/56812/thumb_8046ad3c-d2d7-4503-be26-70714eaf09a9.jpg"}
  },
  "slug": "radio-dzhem-1025-fm-ekaterinburg-jam-yekaterinburg",
  "website": "http://www.radiojamfm.ru",
  "twitter": "",
  "facebook": "https://www.facebook.com/Jam1025Fm/",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://online.radiojamfm.ru:8000/jam",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }, {
    "stream": "http://online.radiojamfm.ru:8000/jam32",
    "bitrate": 32,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://online.radiojamfm.ru:8000/jam_aacplus",
    "bitrate": 64,
    "content_type": "audio/aacp",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-04-28T14:54:34+02:00",
  "updated_at": "2017-05-14T20:41:02+02:00"
}, {
  "id": 56790,
  "name": "Radio Imagine",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/56790/cfd967ea-9df0-4eb2-b167-8dd670e77ab9.jpg",
    "thumb": {"url": "https://img.dirble.com/station/56790/thumb_cfd967ea-9df0-4eb2-b167-8dd670e77ab9.jpg"}
  },
  "slug": "radio-imagine-94b34c0b-77b3-493d-8478-63d3c1a50d8f",
  "website": "http://imagineradio.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 2,
    "title": "Rock",
    "description": "simple rock. from elvis to metallica and like hardrock as iron maiden.",
    "slug": "rock",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://broad1.imagineradio.ru:8000/light_stream128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 1
  }, {
    "stream": "http://broad1.imagineradio.ru:8000/full_stream128.aac",
    "bitrate": 128,
    "content_type": "audio/aacp",
    "status": 0,
    "listeners": 1
  }, {
    "stream": "http://broad1.imagineradio.ru:8000/light_stream64.mp3",
    "bitrate": 80,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://broad1.imagineradio.ru:8000/full_stream64.aac",
    "bitrate": 64,
    "content_type": "audio/aacp",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-04-24T11:04:27+02:00",
  "updated_at": "2017-07-18T14:21:16+02:00"
}, {
  "id": 56693,
  "name": "PriMuzFM",
  "country": "RU",
  "image": {"url": null, "thumb": {"url": null}},
  "slug": "primuzfm",
  "website": "http://primuzfm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 3,
    "title": "Dance",
    "description": "dance music, the new from 80's and 90's, like bubblegum and more.",
    "slug": "dance",
    "ancestry": "14"
  }, {
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }, {"id": 52, "title": "Oldies", "description": "", "slug": "oldies", "ancestry": "44"}],
  "streams": [{
    "stream": "http://radiohost.artem-catv.ru:8001/artemtv",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 13
  }],
  "created_at": "2017-02-26T12:23:10+01:00",
  "updated_at": "2017-07-18T14:27:35+02:00"
}, {
  "id": 56285,
  "name": "Radio AMICI",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/56285/onlinelogomaker-012217-2331-.png",
    "thumb": {"url": "https://img.dirble.com/station/56285/thumb_onlinelogomaker-012217-2331-.png"}
  },
  "slug": "radio-amici",
  "website": "http://volnorez.com/radio-amici",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 3,
    "title": "Dance",
    "description": "dance music, the new from 80's and 90's, like bubblegum and more.",
    "slug": "dance",
    "ancestry": "14"
  }],
  "streams": [{
    "stream": "http://s04.volnorez.com:8000/live/radio-amici/5d3f3f6486e88031400589da86336589cfb52.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-18T00:06:54+01:00",
  "updated_at": "2017-02-18T00:06:56+01:00"
}, {
  "id": 55274,
  "name": "Vesti FM Вести.RU",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/55274/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/55274/thumb_c175.png"}
  },
  "slug": "vesti-fm-vestiru",
  "website": "http://www.vesti.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://icecast.vgtrk.cdnvideo.ru/vestifm_mp3_128kbps",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-17T13:44:29+01:00",
  "updated_at": "2017-07-15T13:29:33+02:00"
}, {
  "id": 51457,
  "name": "Radio Stalingrad Ð Ð°Ð´Ð¸Ð¾ Ð¡ÑÐ°Ð»Ð¸Ð½Ð³ÑÐ°Ð´",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51457/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51457/thumb_c175.png"}
  },
  "slug": "radio-stalingrad-ð-ðððð-ðñðððððñðð",
  "website": "http://dom-druzhbi.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream.makradio.ru/stalingrad.mp3/title",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-17T11:23:11+01:00",
  "updated_at": "2017-07-15T13:43:25+02:00"
}, {
  "id": 51350,
  "name": "Radio SHOCK",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51350/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51350/thumb_c175.png"}
  },
  "slug": "radio-shock",
  "website": "http://radioshock.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://spb.radioshock.ru/radioshock",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-17T11:19:14+01:00",
  "updated_at": "2017-02-17T11:19:17+01:00"
}, {
  "id": 51145,
  "name": "Radio Rocket  Радио Ракета",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51145/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51145/thumb_c175.png"}
  },
  "slug": "radio-rocket-radio-raketa",
  "website": "http://radioraketa.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://ca2.radioboss.fm:8200/stream",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-17T11:11:58+01:00",
  "updated_at": "2017-07-15T13:43:18+02:00"
}, {
  "id": 51079,
  "name": "Radio Record Vip Mix",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51079/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51079/thumb_c175.png"}
  },
  "slug": "radio-record-vip-mix",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/vip_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 61
  }],
  "created_at": "2017-02-17T11:09:35+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51078,
  "name": "Radio Record Trap",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51078/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51078/thumb_c175.png"}
  },
  "slug": "radio-record-trap",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/trap_128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 34
  }],
  "created_at": "2017-02-17T11:09:34+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51077,
  "name": "Radio Record Superdiskoteka 90",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51077/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51077/thumb_c175.png"}
  },
  "slug": "radio-record-superdiskoteka-90",
  "website": "http://www.radiorecord.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/sd90_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 496
  }],
  "created_at": "2017-02-17T11:09:30+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51076,
  "name": "Radio Record Russian Mix",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51076/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51076/thumb_c175.png"}
  },
  "slug": "radio-record-russian-mix",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/rus_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 637
  }],
  "created_at": "2017-02-17T11:09:29+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}];
const foo2 = [{
  "id": 51075,
  "name": "Radio Record Rock",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51075/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51075/thumb_c175.png"}
  },
  "slug": "radio-record-rock",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/rock_128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 58
  }],
  "created_at": "2017-02-17T11:09:26+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51074,
  "name": "Radio Record Pump'n'Klubb",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51074/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51074/thumb_c175.png"}
  },
  "slug": "radio-record-pumpnklubb",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/pump_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 11
  }],
  "created_at": "2017-02-17T11:09:24+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51073,
  "name": "Radio Record Pirate Station",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51073/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51073/thumb_c175.png"}
  },
  "slug": "radio-record-pirate-station",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/ps_128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 42
  }],
  "created_at": "2017-02-17T11:09:22+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51072,
  "name": "Radio Record Medlyak FM",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51072/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51072/thumb_c175.png"}
  },
  "slug": "radio-record-medlyak-fm",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/mdl_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 114
  }],
  "created_at": "2017-02-17T11:09:21+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51071,
  "name": "Radio Record Hardstyle",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51071/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51071/thumb_c175.png"}
  },
  "slug": "radio-record-hardstyle",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/teo_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 12
  }],
  "created_at": "2017-02-17T11:09:19+01:00",
  "updated_at": "2017-07-18T14:20:41+02:00"
}, {
  "id": 51070,
  "name": "Radio Record Gop FM",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51070/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51070/thumb_c175.png"}
  },
  "slug": "radio-record-gop-fm",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/gop_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 168
  }],
  "created_at": "2017-02-17T11:09:18+01:00",
  "updated_at": "2017-07-18T14:26:53+02:00"
}, {
  "id": 51069,
  "name": "Radio Record Dubstep",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51069/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51069/thumb_c175.png"}
  },
  "slug": "radio-record-dubstep",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/dub_128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 17
  }],
  "created_at": "2017-02-17T11:09:16+01:00",
  "updated_at": "2017-07-18T14:26:53+02:00"
}, {
  "id": 51068,
  "name": "Radio Record Deep",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51068/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51068/thumb_c175.png"}
  },
  "slug": "radio-record-deep",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/deep_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 139
  }],
  "created_at": "2017-02-17T11:09:14+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51067,
  "name": "Radio Record Dancecore",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51067/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51067/thumb_c175.png"}
  },
  "slug": "radio-record-dancecore",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/dc_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 19
  }],
  "created_at": "2017-02-17T11:09:12+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51066,
  "name": "Radio Record Club",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51066/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51066/thumb_c175.png"}
  },
  "slug": "radio-record-club",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/club_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 59
  }],
  "created_at": "2017-02-17T11:09:10+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51065,
  "name": "Radio Record Chill-Out",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51065/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51065/thumb_c175.png"}
  },
  "slug": "radio-record-chill-out",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/chil_320",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 113
  }],
  "created_at": "2017-02-17T11:09:08+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 51064,
  "name": "Radio Record Breaks",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/51064/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/51064/thumb_c175.png"}
  },
  "slug": "radio-record-breaks",
  "website": "http://www.radiorecord.ru",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/brks_128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 12
  }],
  "created_at": "2017-02-17T11:09:06+01:00",
  "updated_at": "2017-07-18T14:26:52+02:00"
}, {
  "id": 49353,
  "name": "Radio Dom Druzhbi",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/49353/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/49353/thumb_c175.png"}
  },
  "slug": "radio-dom-druzhbi",
  "website": "http://dom-druzhbi.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream.makradio.ru/dom_druzhby128.mp3",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-17T10:07:15+01:00",
  "updated_at": "2017-07-15T13:42:46+02:00"
}, {
  "id": 47553,
  "name": "Permlive",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/47553/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/47553/thumb_c175.png"}
  },
  "slug": "permlive",
  "website": "http://russian-world-citizens.blogspot.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://listen.radionomy.com/Permlive",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-17T08:57:52+01:00",
  "updated_at": "2017-07-15T13:33:30+02:00"
}, {
  "id": 46836,
  "name": "Noise FM",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/46836/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/46836/thumb_c175.png"}
  },
  "slug": "noise-fm-1e868a18-a0ae-40f8-8207-fbf4555e9c33",
  "website": "http://noisefm.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://play.sas-media.ru/play",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-17T08:32:24+01:00",
  "updated_at": "2017-02-17T08:32:25+01:00"
}, {
  "id": 46631,
  "name": "Nashe Radio",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/46631/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/46631/thumb_c175.png"}
  },
  "slug": "nashe-radio-ððñðµ-ð-ðððð",
  "website": "http://www.nashe.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://nashe1.hostingradio.ru/nashe-128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 942
  }],
  "created_at": "2017-02-17T08:24:36+01:00",
  "updated_at": "2017-07-18T14:26:12+02:00"
}, {
  "id": 46045,
  "name": "Love Radio Moskau",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/46045/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/46045/thumb_c175.png"}
  },
  "slug": "love-radio-moskau",
  "website": "http://www.loveradio.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream2.loveradio.ru/12_love_24?",
    "bitrate": 28,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-17T08:03:07+01:00",
  "updated_at": "2017-07-15T13:32:56+02:00"
}, {
  "id": 46044,
  "name": "Love Radio Moskau - Top 40",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/46044/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/46044/thumb_c175.png"}
  },
  "slug": "love-radio-moskau-top-40",
  "website": "http://www.loveradio.ru/online.htm",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream2.loveradio.ru/9_top40_24?",
    "bitrate": 28,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-17T08:03:05+01:00",
  "updated_at": "2017-07-15T13:32:57+02:00"
}, {
  "id": 46043,
  "name": "Love Radio Moskau - Russian",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/46043/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/46043/thumb_c175.png"}
  },
  "slug": "love-radio-moskau-russian",
  "website": "http://www.loveradio.ru/online.htm",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream2.loveradio.ru/8_russian_24?",
    "bitrate": 28,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-17T08:03:03+01:00",
  "updated_at": "2017-07-15T13:32:56+02:00"
}, {
  "id": 46042,
  "name": "Love Radio Moskau - R'n'B",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/46042/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/46042/thumb_c175.png"}
  },
  "slug": "love-radio-moskau-rnb",
  "website": "http://www.loveradio.ru/online.htm",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream2.loveradio.ru/6_rnb_24?",
    "bitrate": 28,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-17T08:03:01+01:00",
  "updated_at": "2017-07-15T13:32:56+02:00"
}, {
  "id": 46041,
  "name": "Love Radio Moskau - Chill",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/46041/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/46041/thumb_c175.png"}
  },
  "slug": "love-radio-moskau-chill",
  "website": "http://www.loveradio.ru/online.htm",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream2.loveradio.ru/4_chill_24?",
    "bitrate": 28,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-17T08:02:59+01:00",
  "updated_at": "2017-07-15T13:32:56+02:00"
}, {
  "id": 46040,
  "name": "Love Radio Moskau - Alternative",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/46040/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/46040/thumb_c175.png"}
  },
  "slug": "love-radio-moskau-alternative",
  "website": "http://www.loveradio.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream2.loveradio.ru/10_alternative_24?",
    "bitrate": 28,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-17T08:02:58+01:00",
  "updated_at": "2017-07-15T13:32:56+02:00"
}, {
  "id": 45150,
  "name": "Heavy Music Atmospheric Radio",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/45150/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/45150/thumb_c175.png"}
  },
  "slug": "heavy-music-atmospheric-radio",
  "website": "http://www.heavy-music.ru/?radio",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://radio.heavy-music.ru:8107/;stream/1",
    "bitrate": 320,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 9
  }],
  "created_at": "2017-02-17T07:34:30+01:00",
  "updated_at": "2017-07-18T14:25:58+02:00"
}, {
  "id": 44520,
  "name": "Gagarin Radio",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/44520/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/44520/thumb_c175.png"}
  },
  "slug": "gagarin-radio",
  "website": "http://permliveradio.blogspot.ru/p/gagarin.html",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://listen.radionomy.com/Gagarin",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-17T07:11:12+01:00",
  "updated_at": "2017-07-15T13:32:26+02:00"
}, {
  "id": 43824,
  "name": "Europa Plus Residance",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/43824/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/43824/thumb_c175.png"}
  },
  "slug": "europa-plus-residance",
  "website": "http://uae.europaplus.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://emg02.hostingradio.ru/ep-residance128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 10
  }],
  "created_at": "2017-02-17T01:34:32+01:00",
  "updated_at": "2017-07-18T14:25:48+02:00"
}, {
  "id": 43822,
  "name": "Europa Plus New",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/43822/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/43822/thumb_c175.png"}
  },
  "slug": "europa-plus-new",
  "website": "http://uae.europaplus.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://emg02.hostingradio.ru/ep-new128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 37
  }],
  "created_at": "2017-02-17T01:34:27+01:00",
  "updated_at": "2017-07-18T14:25:48+02:00"
}, {
  "id": 43820,
  "name": "Europa Plus Light",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/43820/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/43820/thumb_c175.png"}
  },
  "slug": "europa-plus-light",
  "website": "http://uae.europaplus.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://emg02.hostingradio.ru/ep-light128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 56
  }],
  "created_at": "2017-02-17T01:34:22+01:00",
  "updated_at": "2017-07-18T14:19:48+02:00"
}, {
  "id": 43677,
  "name": "Enigmatic Station",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/43677/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/43677/thumb_c175.png"}
  },
  "slug": "enigmatic-station",
  "website": "http://enigmatic.su/en/radio-station/station-1",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://listen2.myradio24.com:9000/8226?44",
    "bitrate": 192,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 79
  }],
  "created_at": "2017-02-17T01:28:20+01:00",
  "updated_at": "2017-07-18T14:25:49+02:00"
}, {
  "id": 41238,
  "name": "BREAKBEATZONE RADIO STATION",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/41238/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/41238/thumb_c175.png"}
  },
  "slug": "breakbeatzone-radio-station",
  "website": "http://www.bbz.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://streaming.radio.co/s9ad0ff120/listen",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-16T23:04:56+01:00",
  "updated_at": "2017-07-15T13:31:18+02:00"
}, {
  "id": 41046,
  "name": "Black Coffee Radio",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/41046/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/41046/thumb_c175.png"}
  },
  "slug": "black-coffee-radio",
  "website": "http://radiocoffee.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://stream.budemradio.ru/coffee",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-16T22:56:48+01:00",
  "updated_at": "2017-07-15T13:31:18+02:00"
}];
const foo3 = [{
  "id": 40819,
  "name": "Best FM Moscow",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/40819/c175.png",
    "thumb": {"url": "https://img.dirble.com/station/40819/thumb_c175.png"}
  },
  "slug": "best-fm-moscow",
  "website": "http://bestfm.ru/",
  "twitter": null,
  "facebook": null,
  "total_listeners": 0,
  "categories": [{
    "id": 45,
    "title": "Variety",
    "description": "Variety or various, playing more or less everything.",
    "slug": "variety",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://nashe1.hostingradio.ru/best-128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 73
  }],
  "created_at": "2017-02-16T22:48:15+01:00",
  "updated_at": "2017-07-18T14:25:11+02:00"
}, {
  "id": 39311,
  "name": "Disco Star",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/39311/Disco_Funk_Voyage_128x128.png",
    "thumb": {"url": "https://img.dirble.com/station/39311/thumb_Disco_Funk_Voyage_128x128.png"}
  },
  "slug": "disco-star",
  "website": "http://discostar.playtheradio.com",
  "twitter": "",
  "facebook": "http://streaming.radionomy.com/DiscoStar?lang=pt-BR%2cpt%3bq%3d0.8%2cen-US%3bq%3d0.6%2cen%3bq%3d0.4",
  "total_listeners": 0,
  "categories": [{"id": 37, "title": "Funk", "description": "", "slug": "funk", "ancestry": "34"}],
  "streams": [{
    "stream": "http://streaming.radionomy.com/DiscoStar?lang=pt-BR%2cpt%3bq%3d0.8%2cen-US%3bq%3d0.6%2cen%3bq%3d0.4",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2017-02-09T21:29:26+01:00",
  "updated_at": "2018-07-11T20:18:12+02:00"
}, {
  "id": 39280,
  "name": "Big City Radio",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/39280/bigcity8.jpg",
    "thumb": {"url": "https://img.dirble.com/station/39280/thumb_bigcity8.jpg"}
  },
  "slug": "big-city-radio-07ed5b14-02d1-4957-b75f-7e2b59653a5c",
  "website": "http://bigcity.mnogoradio.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 40, "title": "Decades", "description": "", "slug": "decades", "ancestry": null}],
  "streams": [{
    "stream": "http://178.33.138.231:8058/BigCityRadio192",
    "bitrate": 192,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-02-05T01:02:06+01:00",
  "updated_at": "2017-07-15T13:30:43+02:00"
}, {
  "id": 39149,
  "name": "Radio SPB1",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/39149/F9UFh5IFBYM.jpg",
    "thumb": {"url": "https://img.dirble.com/station/39149/thumb_F9UFh5IFBYM.jpg"}
  },
  "slug": "radio-spb1",
  "website": "https://spb1.jimdo.com/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 1,
    "title": "Trance",
    "description": "stations that plays commercial and other things in trance-music genre.",
    "slug": "trance",
    "ancestry": "14"
  }],
  "streams": [{
    "stream": "http://listen2.myradio24.com:9000/2666",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 1
  }],
  "created_at": "2017-01-17T22:29:38+01:00",
  "updated_at": "2018-07-10T08:15:27+02:00"
}, {
  "id": 38998,
  "name": "Radio ExciteBit",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38998/REB_LOGO.png",
    "thumb": {"url": "https://img.dirble.com/station/38998/thumb_REB_LOGO.png"}
  },
  "slug": "radio-excitebit-9c61ddfc-5ead-47da-8a30-205533ecc4f0",
  "website": "http://oldcityretrogames.ru/index/0-59",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 42, "title": "90s", "description": "", "slug": "90s", "ancestry": "40"}, {
    "id": 52,
    "title": "Oldies",
    "description": "",
    "slug": "oldies",
    "ancestry": "44"
  }],
  "streams": [{
    "stream": "http://46.105.180.202:8100/stream",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://46.105.180.202:8100/stream\n",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2017-01-02T04:48:49+01:00",
  "updated_at": "2017-07-15T13:30:37+02:00"
}, {
  "id": 38830,
  "name": "Радио Шоколад",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38830/iOXRWDCNA.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38830/thumb_iOXRWDCNA.jpg"}
  },
  "slug": "radio-shokolad",
  "website": "http://www.chocoradio.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://81.19.85.204/chocolad128.mp3",
    "bitrate": 131,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 113
  }],
  "created_at": "2016-12-03T17:11:25+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38829,
  "name": "РадиоК",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38829/1458637367_re_jsx.png",
    "thumb": {"url": "https://img.dirble.com/station/38829/thumb_1458637367_re_jsx.png"}
  },
  "slug": "radiok",
  "website": "http://radiok.pro",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 2,
    "title": "Rock",
    "description": "simple rock. from elvis to metallica and like hardrock as iron maiden.",
    "slug": "rock",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://radiok.pro:8000/128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 16
  }],
  "created_at": "2016-12-03T17:08:39+01:00",
  "updated_at": "2017-07-18T14:24:40+02:00"
}, {
  "id": 38828,
  "name": "Радио Татарстан Радиосы",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38828/tatarstan-radiosy.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38828/thumb_tatarstan-radiosy.jpg"}
  },
  "slug": "radio-tatarstan-radiosy",
  "website": "http://radiotatarstana.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://94.180.249.163:8000/tatar64kbps.mp3",
    "bitrate": 64,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 2
  }],
  "created_at": "2016-12-03T17:04:57+01:00",
  "updated_at": "2017-07-18T13:57:44+02:00"
}, {
  "id": 38823,
  "name": "Радио Моя Удмуртия",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38823/Moya-Udmurtiya.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38823/thumb_Moya-Udmurtiya.jpg"}
  },
  "slug": "radio-moya-udmurtiya",
  "website": "http://www.myudm.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://radio.myudm.ru:10010/efir",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-12-02T03:14:25+01:00",
  "updated_at": "2017-07-15T13:30:34+02:00"
}, {
  "id": 38822,
  "name": "Радио Юлдаш - Башкортостан",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38822/radio-yuldash.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38822/thumb_radio-yuldash.jpg"}
  },
  "slug": "radio-uldash-bashkortostan",
  "website": "http://yuldashfm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://player.bonus-tv.ru:8090/radio1.mp3",
    "bitrate": 0,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2016-12-02T03:11:30+01:00",
  "updated_at": "2016-12-02T03:11:32+01:00"
}, {
  "id": 38814,
  "name": "Радио Для Двоих",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38814/radio_dlya_dvoih.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38814/thumb_radio_dlya_dvoih.jpg"}
  },
  "slug": "radio-dlya-dvoih",
  "website": "http://www.rddfm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://icecast.piktv.cdnvideo.ru/rdd128",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2016-11-30T16:37:57+01:00",
  "updated_at": "2016-11-30T16:37:58+01:00"
}, {
  "id": 38813,
  "name": "Радио Вышка - Екатеринбург",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38813/f1701794.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38813/thumb_f1701794.jpg"}
  },
  "slug": "radio-vyshka-ekaterinburg",
  "website": "http://вышка24.рф",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://stream.vyshka24.ru/128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 6
  }],
  "created_at": "2016-11-30T16:35:01+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38812,
  "name": "Радио Нестандарт",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38812/0220455.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38812/thumb_0220455.jpg"}
  },
  "slug": "radio-nestandart",
  "website": "http://radionestandart.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://s5.radioheart.ru:8013/nestandart",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 9
  }],
  "created_at": "2016-11-30T16:32:35+01:00",
  "updated_at": "2017-07-15T22:09:54+02:00"
}, {
  "id": 38810,
  "name": "Радио Народная Волна - Екатеринбург",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38810/iR8Y1K5FZ.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38810/thumb_iR8Y1K5FZ.jpg"}
  },
  "slug": "radio-narodnaya-volna-ekaterinburg",
  "website": "http://www.intervolna.com",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://intervolna.com:8000/rnv",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 13
  }],
  "created_at": "2016-11-30T03:15:30+01:00",
  "updated_at": "2017-07-18T14:31:52+02:00"
}, {
  "id": 38809,
  "name": "Радио Интерволна - Челябинск",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38809/inter.png",
    "thumb": {"url": "https://img.dirble.com/station/38809/thumb_inter.png"}
  },
  "slug": "radio-intervolna-chelyabinsk",
  "website": "http://intervolna.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://online.intervolna.ru:8001/live",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-30T03:13:12+01:00",
  "updated_at": "2017-07-15T13:30:34+02:00"
}, {
  "id": 38808,
  "name": "Радио Владивосток ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38808/13801346649409_vladivostokfm.png",
    "thumb": {"url": "https://img.dirble.com/station/38808/thumb_13801346649409_vladivostokfm.png"}
  },
  "slug": "radio-vladivostok-fm",
  "website": "http://vladivostok.fm",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://95.154.100.168:8000/vfm1064_128k",
    "bitrate": 192,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-30T03:06:00+01:00",
  "updated_at": "2017-07-15T13:30:35+02:00"
}, {
  "id": 38807,
  "name": "Радио Сибирь - Томск",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38807/preview_660_193_radiosib1jpg5454.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38807/thumb_preview_660_193_radiosib1jpg5454.jpg"}
  },
  "slug": "radio-sibir-tomsk",
  "website": "http://radiosibir.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://radiosibir.ru:8090/liveradio",
    "bitrate": 112,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 1
  }],
  "created_at": "2016-11-30T03:04:26+01:00",
  "updated_at": "2017-07-18T14:31:52+02:00"
}, {
  "id": 38806,
  "name": "Радио Городская Волна - Новосибирск",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38806/maksim_na_radio_volnah.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38806/thumb_maksim_na_radio_volnah.jpg"}
  },
  "slug": "radio-gorodskaya-volna-novosibirsk",
  "website": "",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://online.gorvolna.ru:8000/gorvolna",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 25
  }],
  "created_at": "2016-11-30T03:02:05+01:00",
  "updated_at": "2017-07-17T09:33:23+02:00"
}, {
  "id": 38802,
  "name": "Радио Супердискотека 90х",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38802/SD-01.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38802/thumb_SD-01.jpg"}
  },
  "slug": "radio-superdiskoteka-90h",
  "website": "",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 42, "title": "90s", "description": "", "slug": "90s", "ancestry": "40"}],
  "streams": [{
    "stream": "http://air.radiorecord.ru:8102/sd90_128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 577
  }],
  "created_at": "2016-11-29T02:54:26+01:00",
  "updated_at": "2017-07-18T14:31:51+02:00"
}, {
  "id": 38801,
  "name": "Радио За Облаками - Курган",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38801/logo_zao_vyrezannoy_bez_chastoty.png",
    "thumb": {"url": "https://img.dirble.com/station/38801/thumb_logo_zao_vyrezannoy_bez_chastoty.png"}
  },
  "slug": "radio-za-oblakami-kurgan",
  "website": "http://www.zaoblakami.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://195.88.63.114:8000/zaoblakami",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-29T02:51:26+01:00",
  "updated_at": "2017-07-15T13:30:33+02:00"
}, {
  "id": 38800,
  "name": "Радио СИТИ 100.6 FM - Тюмень (City Tyumen)",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38800/3cb53a3f-f03a-42a4-acd2-fbcee5d9710f.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38800/thumb_3cb53a3f-f03a-42a4-acd2-fbcee5d9710f.jpg"}
  },
  "slug": "radio-siti",
  "website": "http://www.100i6fm.ru",
  "twitter": "radiocitytyumen",
  "facebook": "https://www.facebook.com/RadioSiti",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://online.100i6fm.ru:8000/city_mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }, {
    "stream": "http://online.100i6fm.ru:8000/city",
    "bitrate": 64,
    "content_type": "audio/aacp",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-29T02:48:09+01:00",
  "updated_at": "2017-05-03T02:08:33+02:00"
}, {
  "id": 38799,
  "name": "Радио Релакс ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38799/relaxfm.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38799/thumb_relaxfm.jpg"}
  },
  "slug": "radio-relaks-fm",
  "website": "http://relax-fm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://ic2.101.ru:8000/v13_1",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 515
  }],
  "created_at": "2016-11-29T02:44:24+01:00",
  "updated_at": "2017-07-18T14:31:52+02:00"
}, {
  "id": 38798,
  "name": "Радио Хит ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38798/35218856_987ubkil2f.png",
    "thumb": {"url": "https://img.dirble.com/station/38798/thumb_35218856_987ubkil2f.png"}
  },
  "slug": "radio-hit-fm",
  "website": "http://hitfm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://icecast.radiohitfm.cdnvideo.ru/hit.mp3",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-29T02:41:30+01:00",
  "updated_at": "2017-07-15T14:27:21+02:00"
}, {
  "id": 38797,
  "name": "Радио Кекс ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38797/img1533.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38797/thumb_img1533.jpg"}
  },
  "slug": "radio-keks-fm",
  "website": "http://chameleon.fm/keksfm",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 42, "title": "90s", "description": "", "slug": "90s", "ancestry": "40"}],
  "streams": [{
    "stream": "http://stream01.emgsound.ru/keks128.mp3",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2016-11-29T02:38:31+01:00",
  "updated_at": "2016-11-29T02:38:31+01:00"
}, {
  "id": 38796,
  "name": "Радио Ретро фм",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38796/retro.png",
    "thumb": {"url": "https://img.dirble.com/station/38796/thumb_retro.png"}
  },
  "slug": "radio-retro-fm",
  "website": "http://retrofm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 41, "title": "80s", "description": "", "slug": "80s", "ancestry": "40"}],
  "streams": [{
    "stream": "http://retro128.streamr.ru",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-29T02:35:52+01:00",
  "updated_at": "2017-07-15T13:30:36+02:00"
}, {
  "id": 38785,
  "name": "Спокойное Радио",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38785/4740251.png",
    "thumb": {"url": "https://img.dirble.com/station/38785/thumb_4740251.png"}
  },
  "slug": "spokoinoe-radio",
  "website": "http://spokoinoeradio.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://listen1.myradio24.com:9000/6262",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 231
  }],
  "created_at": "2016-11-28T02:48:01+01:00",
  "updated_at": "2017-07-18T14:24:39+02:00"
}, {
  "id": 38783,
  "name": "Радио Disney",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38783/radiodisney1.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38783/thumb_radiodisney1.jpg"}
  },
  "slug": "radio-disney",
  "website": "http://music.disney.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://disney2.streamr.ru:8060/disney",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 32
  }],
  "created_at": "2016-11-28T02:42:40+01:00",
  "updated_at": "2017-07-18T14:24:39+02:00"
}, {
  "id": 38782,
  "name": "Радио YUM FM",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38782/yum-fm.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38782/thumb_yum-fm.jpg"}
  },
  "slug": "radio-yum-fm",
  "website": "http://yum-fm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://yumfm.hostingradio.ru:8020/yumfm128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-28T02:36:59+01:00",
  "updated_at": "2017-07-15T13:30:32+02:00"
}, {
  "id": 38780,
  "name": "Радио ВДВ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38780/6099_0.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38780/thumb_6099_0.jpg"}
  },
  "slug": "radio-vdv",
  "website": "http://radiovdv.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://vdvradio.hostingradio.ru:8001/vdvradio128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 9
  }],
  "created_at": "2016-11-27T13:22:21+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38779,
  "name": "Своё Радио",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38779/1024x1024sr.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38779/thumb_1024x1024sr.jpg"}
  },
  "slug": "svoyo-radio",
  "website": "http://svoeradio.fm",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 46, "title": "Folk", "description": "", "slug": "folk", "ancestry": null}],
  "streams": [{
    "stream": "http://pub2.player-radio.ru/svoe/svoe-128.mp3/icecast.audio",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-27T13:13:35+01:00",
  "updated_at": "2016-11-27T13:13:36+01:00"
}];
const foo4 = [{
  "id": 38778,
  "name": "ХИТрое радио",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38778/logo_hitroe.png",
    "thumb": {"url": "https://img.dirble.com/station/38778/thumb_logo_hitroe.png"}
  },
  "slug": "hitroe-radio",
  "website": "http://www.hitroe.com",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 2,
    "title": "Rock",
    "description": "simple rock. from elvis to metallica and like hardrock as iron maiden.",
    "slug": "rock",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://www.hitroe.com:8000/stream",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 46
  }],
  "created_at": "2016-11-27T13:10:08+01:00",
  "updated_at": "2017-07-18T14:13:05+02:00"
}, {
  "id": 38777,
  "name": "Радио Буу!",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38777/Radio-Boo-105_1.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38777/thumb_Radio-Boo-105_1.jpg"}
  },
  "slug": "radio-buu",
  "website": "http://radiobu.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 2,
    "title": "Rock",
    "description": "simple rock. from elvis to metallica and like hardrock as iron maiden.",
    "slug": "rock",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://buu.hostingradio.ru:8005/radio",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 4
  }],
  "created_at": "2016-11-27T13:07:14+01:00",
  "updated_at": "2017-07-18T14:31:51+02:00"
}, {
  "id": 38776,
  "name": "Радио Москва ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38776/63894_r2591.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38776/thumb_63894_r2591.jpg"}
  },
  "slug": "radio-moskva-fm",
  "website": "http://moskva.fm",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://icecast.vgtrk.cdnvideo.ru/moscowfm128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-27T13:02:53+01:00",
  "updated_at": "2017-07-15T13:30:33+02:00"
}, {
  "id": 38775,
  "name": "Радио Подмосковные вечера",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38775/podmoskovnie-vechera-180.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38775/thumb_podmoskovnie-vechera-180.jpg"}
  },
  "slug": "radio-podmoskovnye-vechera",
  "website": "",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 41, "title": "80s", "description": "", "slug": "80s", "ancestry": "40"}],
  "streams": [{
    "stream": "http://setmedia.ru:8000/high5",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 14
  }],
  "created_at": "2016-11-27T12:58:56+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38768,
  "name": "Народное радио",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38768/640x640.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38768/thumb_640x640.jpg"}
  },
  "slug": "narodnoe-radio",
  "website": "http://www.narodnoe-radio.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://213.85.130.203:8080/stream.mp3",
    "bitrate": 64,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-26T04:26:15+01:00",
  "updated_at": "2017-07-15T13:30:33+02:00"
}, {
  "id": 38763,
  "name": "Радио Завтра Да!",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38763/1295495.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38763/thumb_1295495.jpg"}
  },
  "slug": "radio-zavtra-da",
  "website": "http://radio.zavtra.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://92.222.162.167:8000/live",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2016-11-25T02:45:33+01:00",
  "updated_at": "2017-07-15T13:30:32+02:00"
}, {
  "id": 38759,
  "name": "Радио Свежак",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38759/radiosvezhak_share.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38759/thumb_radiosvezhak_share.jpg"}
  },
  "slug": "radio-svezhak",
  "website": "http://radio-sv.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://radio-sv.ru:8000/radio",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-24T16:03:22+01:00",
  "updated_at": "2017-07-15T13:30:32+02:00"
}, {
  "id": 38758,
  "name": "Радио Максимум",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38758/old_logo_maximum.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38758/thumb_old_logo_maximum.jpg"}
  },
  "slug": "radio-maksimum",
  "website": "http://maximum.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://icecast.radiomaximum.cdnvideo.ru/maximum.mp3",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-24T15:54:42+01:00",
  "updated_at": "2017-07-15T13:30:31+02:00"
}, {
  "id": 38757,
  "name": "Радио Монте-Карло",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38757/montekarlo.png",
    "thumb": {"url": "https://img.dirble.com/station/38757/thumb_montekarlo.png"}
  },
  "slug": "radio-monte-karlo",
  "website": "http://montecarlo.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://icecast.radiomontecarlo.cdnvideo.ru/mc.mp3",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-24T15:50:41+01:00",
  "updated_at": "2017-07-15T13:30:31+02:00"
}, {
  "id": 38752,
  "name": "Радио Книга",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38752/snimok_ehkrana_2016-06-10_v_0_32_27.png",
    "thumb": {"url": "https://img.dirble.com/station/38752/thumb_snimok_ehkrana_2016-06-10_v_0_32_27.png"}
  },
  "slug": "radio-kniga",
  "website": "https://radiokniga.com/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://bookradio.hostingradio.ru:8069/fm?type",
    "bitrate": 75,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 249
  }],
  "created_at": "2016-11-23T22:58:37+01:00",
  "updated_at": "2017-07-18T14:24:39+02:00"
}, {
  "id": 38751,
  "name": "Радио DFM Дискач 90х",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38751/dfm_zadnik.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38751/thumb_dfm_zadnik.jpg"}
  },
  "slug": "radio-dfm-diskach-90h",
  "website": "http://www.dfm.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 3,
    "title": "Dance",
    "description": "dance music, the new from 80's and 90's, like bubblegum and more.",
    "slug": "dance",
    "ancestry": "14"
  }],
  "streams": [{
    "stream": "http://icecast.radiodfm.cdnvideo.ru/st18.mp3",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-23T22:55:54+01:00",
  "updated_at": "2017-07-15T13:30:31+02:00"
}, {
  "id": 38750,
  "name": "Радио DFM 101,2",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38750/dfm_zadnik.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38750/thumb_dfm_zadnik.jpg"}
  },
  "slug": "radio-dfm-1012",
  "website": "http://www.dfm.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 3,
    "title": "Dance",
    "description": "dance music, the new from 80's and 90's, like bubblegum and more.",
    "slug": "dance",
    "ancestry": "14"
  }],
  "streams": [{
    "stream": "http://icecast.radiodfm.cdnvideo.ru/dfm.mp3",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-23T22:51:11+01:00",
  "updated_at": "2017-07-15T13:30:31+02:00"
}, {
  "id": 38749,
  "name": "Твое Радио",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38749/1390677898_tvoe-radio.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38749/thumb_1390677898_tvoe-radio.jpg"}
  },
  "slug": "tvoe-radio",
  "website": "http://radioyou.org/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://s6.radioheart.ru:8016/live",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-23T22:46:33+01:00",
  "updated_at": "2017-07-15T13:30:32+02:00"
}, {
  "id": 38748,
  "name": "Радио Коммерсант ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38748/kommersant_fm.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38748/thumb_kommersant_fm.jpg"}
  },
  "slug": "radio-kommersant-fm",
  "website": "http://www.kommersant.ru/Fm",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://kommersant77.hostingradio.ru:8016/kommersant64.mp3",
    "bitrate": 64,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 192
  }],
  "created_at": "2016-11-23T22:34:06+01:00",
  "updated_at": "2016-11-23T22:34:08+01:00"
}, {
  "id": 38747,
  "name": "Радио Кабриолет",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38747/5806bf38d2c86.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38747/thumb_5806bf38d2c86.jpg"}
  },
  "slug": "radio-kabriolet",
  "website": "",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://setmedia.ru:8000/high3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 62
  }],
  "created_at": "2016-11-23T22:28:09+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38739,
  "name": "Радио Волшебный Шансон",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38739/radio_volshebnyj_shanson.gif",
    "thumb": {"url": "https://img.dirble.com/station/38739/thumb_radio_volshebnyj_shanson.gif"}
  },
  "slug": "radio-volshebnyi-shanson",
  "website": "http://volshebniy-chanson.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://listen2.myradio24.com:9000/8144",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 99
  }],
  "created_at": "2016-11-23T03:17:55+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38737,
  "name": "Comedy Radio",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38737/comedy-radio.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38737/thumb_comedy-radio.jpg"}
  },
  "slug": "comedy-radio",
  "website": "http://comedy-radio.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://ic2.101.ru:8000/v11_1",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 419
  }],
  "created_at": "2016-11-22T17:50:00+01:00",
  "updated_at": "2016-11-22T17:50:00+01:00"
}, {
  "id": 38736,
  "name": "Радио Best FM",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38736/x_bc5c68ee.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38736/thumb_x_bc5c68ee.jpg"}
  },
  "slug": "radio-best-fm",
  "website": "http://bestfm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://nashe.streamr.ru/best-128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 185
  }],
  "created_at": "2016-11-22T17:43:52+01:00",
  "updated_at": "2017-07-18T14:24:40+02:00"
}, {
  "id": 38735,
  "name": "Радио Мегаполис ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38735/megapolis.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38735/thumb_megapolis.jpg"}
  },
  "slug": "radio-megapolis-fm",
  "website": "http://www.megapolisfm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 3,
    "title": "Dance",
    "description": "dance music, the new from 80's and 90's, like bubblegum and more.",
    "slug": "dance",
    "ancestry": "14"
  }],
  "streams": [{
    "stream": "http://stream04.media.rambler.ru/megapolis128.mp3",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 733
  }],
  "created_at": "2016-11-22T17:39:02+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38734,
  "name": "Радио Мир",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38734/Radio_mir2.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38734/thumb_Radio_mir2.jpg"}
  },
  "slug": "radio-mir-e52f55a5-ab52-4319-a3f5-502ba542a513",
  "website": "http://radiomir.fm/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 42, "title": "90s", "description": "", "slug": "90s", "ancestry": "40"}],
  "streams": [{
    "stream": "http://icecast.mirtv.cdnvideo.ru:8000/radio_mir128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-22T16:27:09+01:00",
  "updated_at": "2017-07-15T14:27:23+02:00"
}, {
  "id": 38733,
  "name": "Радио Фантастики",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38733/dccad8d42611fb434ddb942404ad0543.png",
    "thumb": {"url": "https://img.dirble.com/station/38733/thumb_dccad8d42611fb434ddb942404ad0543.png"}
  },
  "slug": "radio-fantastiki",
  "website": "http://www.fantasyradio.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://fantasyradioru.no-ip.biz:8002/live",
    "bitrate": 96,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 65
  }],
  "created_at": "2016-11-22T16:24:00+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38732,
  "name": "Радио Лайк ФМ",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38732/main.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38732/thumb_main.jpg"}
  },
  "slug": "radio-laik-fm",
  "website": "http://www.likefm.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://ic2.101.ru:8000/v12_1",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 270
  }],
  "created_at": "2016-11-22T16:21:43+01:00",
  "updated_at": "2017-07-18T14:24:38+02:00"
}, {
  "id": 38731,
  "name": "Радио Карнавал",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38731/116b.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38731/thumb_116b.jpg"}
  },
  "slug": "radio-karnaval",
  "website": "http://radiokarnaval.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://online.carnivalfm.ru:8000/stream/2/",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 12
  }],
  "created_at": "2016-11-22T16:17:44+01:00",
  "updated_at": "2017-07-18T14:24:39+02:00"
}, {
  "id": 38730,
  "name": "Радио Пассаж",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38730/passage.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38730/thumb_passage.jpg"}
  },
  "slug": "radio-passazh",
  "website": "http://radiopassazh.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://listen.radiopassazh.ru/mp3-128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-22T16:13:56+01:00",
  "updated_at": "2017-07-15T13:30:31+02:00"
}, {
  "id": 38724,
  "name": "Радио Энерджи",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38724/57af020d3bdae.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38724/thumb_57af020d3bdae.jpg"}
  },
  "slug": "radio-enerdzhi",
  "website": "http://www.energyfm.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://ic2.101.ru:8000/v1_1",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 557
  }],
  "created_at": "2016-11-22T03:09:18+01:00",
  "updated_at": "2017-07-18T14:31:51+02:00"
}, {
  "id": 38723,
  "name": "Радио Свобода",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38723/radio-09-22.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38723/thumb_radio-09-22.jpg"}
  },
  "slug": "radio-svoboda",
  "website": "http://www.svoboda.org/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 4,
    "title": "Talk \u0026 Speech",
    "description": "talk \u0026 speech stations like normal talkshows and religous discuss.",
    "slug": "talk-speech",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://184.154.58.146:29378/ch11_64s.mp3",
    "bitrate": 0,
    "content_type": "audio/mpeg",
    "status": 0,
    "listeners": 0
  }],
  "created_at": "2016-11-22T03:01:06+01:00",
  "updated_at": "2016-11-22T03:01:14+01:00"
}, {
  "id": 38717,
  "name": "Радио Premium",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38717/premium_radio.gif",
    "thumb": {"url": "https://img.dirble.com/station/38717/thumb_premium_radio.gif"}
  },
  "slug": "radio-premium",
  "website": "http://rpfm.ru/",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 3,
    "title": "Dance",
    "description": "dance music, the new from 80's and 90's, like bubblegum and more.",
    "slug": "dance",
    "ancestry": "14"
  }],
  "streams": [{
    "stream": "http://listen.rpfm.ru:9000/premium128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-21T02:52:32+01:00",
  "updated_at": "2017-07-15T13:30:32+02:00"
}, {
  "id": 38716,
  "name": "Радио Романтика",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38716/romantika.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38716/thumb_romantika.jpg"}
  },
  "slug": "radio-romantika",
  "website": "http://www.radioromantika.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://ic2.101.ru:8000/v4_1",
    "bitrate": 256,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 152
  }],
  "created_at": "2016-11-21T02:49:37+01:00",
  "updated_at": "2017-07-18T14:31:51+02:00"
}, {
  "id": 38712,
  "name": "Радио Русские Песни",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38712/13803.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38712/thumb_13803.jpg"}
  },
  "slug": "radio-russkie-pesni",
  "website": "http://rusongs.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{
    "id": 5,
    "title": "Pop",
    "description": "stations that normally play pop-music",
    "slug": "pop",
    "ancestry": null
  }],
  "streams": [{
    "stream": "http://listen.rusongs.ru/ru-mp3-128",
    "bitrate": 128,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 0
  }],
  "created_at": "2016-11-20T13:40:05+01:00",
  "updated_at": "2017-07-15T13:30:32+02:00"
}, {
  "id": 38711,
  "name": "Дорожное Радио",
  "country": "RU",
  "image": {
    "url": "https://img.dirble.com/station/38711/57b1b69df12a9.jpg",
    "thumb": {"url": "https://img.dirble.com/station/38711/thumb_57b1b69df12a9.jpg"}
  },
  "slug": "dorozhnoe-radio",
  "website": "https://dorognoe.ru",
  "twitter": "",
  "facebook": "",
  "total_listeners": 0,
  "categories": [{"id": 42, "title": "90s", "description": "", "slug": "90s", "ancestry": "40"}],
  "streams": [{
    "stream": "http://dorognoe.hostingradio.ru:8000/dorognoe",
    "bitrate": 64,
    "content_type": "audio/mpeg",
    "status": 1,
    "listeners": 779
  }],
  "created_at": "2016-11-20T13:28:39+01:00",
  "updated_at": "2017-07-18T14:31:51+02:00"
}];


const merge = [...foo, ...foo2, ...foo3, ...foo4];

const ggg = merge.map(s => ({
  image: s.image,
  src: s.streams,
  uid: s.id,
  name: s.name,
  website: s.website,
  genre: s.categories[0].title
}));

const hhh = ggg.reduce((acc, next) => {
  acc[next.genre] = acc[next.genre]
    ? [...acc[next.genre], next]
    : [next];

  return acc
}, {});


//console.log(hhh);

//firestore.doc(`stations/Russia`).set(hhh).then((g) => console.log(g));