export const fetchCacheHost = (config) => {
  if (!localStorage.getItem(config.key)) {
    const fileReader = new FileReader();
    const checkStatus = response =>
      (response.status === 200) ?
        Promise.resolve(response) :
        Promise.reject(new Error(response.statusText));

    return fetch(config.src)
      .then(checkStatus)
      .then(isBlob => isBlob.blob())
      .then(blob => {
        fileReader.onload = event => {
          localStorage.setItem(config.key, event.target.result);
        };
        fileReader.readAsDataURL(blob);
      })
      .catch(err => console.error(err));
  }
};


export function fetchCacheFireStore(callBack, key) {
  if (!localStorage.getItem(key)) {
    callBack()
      .then(value =>
        localStorage.setItem(key, JSON.stringify(value))
      )
      .catch(err => console.error(err));
  }
}

function waitFetching(key) {

  return new Promise(resolve => {
    const stateCheck = setInterval(() => {
      const value = localStorage.getItem(key);

      if (value) {
        clearInterval(stateCheck);
        resolve(value)
      }

    }, 66);
  });
}

export default waitFetching;