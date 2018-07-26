import LSConfig from 'root/config/local-storage';

function caching(config) {
  if (!localStorage.getItem(config.key)) {

    const xhr = new XMLHttpRequest();
    const fileReader = new FileReader();

    xhr.open("GET", config.src, true);
    xhr.responseType = "blob";

    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        fileReader.onload = function (evt) {
          localStorage.setItem(config.key, evt.target.result);
        };
        fileReader.readAsDataURL(xhr.response);
      }
    }, false);

    xhr.send();
  }
}

export function waitStorage() {
  const cacheLength = Object.keys(LSConfig).length;

  return new Promise(resolve => {

    const stateCheck = setInterval(() => {
      if (localStorage.length >= cacheLength) {
        clearInterval(stateCheck);
        resolve()
      }
    }, 66);
  });
}

export default caching;