import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './redux-core/store';

import cacheConfig from 'root/config/cache';
import {checkCacheVersion, fetchCacheHost, fetchCacheFireStore} from 'root/helpers/cache';
import {getSvgAlphabet} from 'root/firebase-core/firestore';

import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import muiTheme from './theme';

import ErrorBoundary from './components/error-boundary';
import App from './App';

// Caching
checkCacheVersion();
fetchCacheHost(cacheConfig.geographyMap);
fetchCacheHost(cacheConfig.timezones);
fetchCacheFireStore(getSvgAlphabet, cacheConfig.alphabet.key);


ReactDOM.render(
  <React.Fragment>
    <CssBaseline/>

    <MuiThemeProvider theme={muiTheme}>
      <Provider store={store}>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
      </Provider>
    </MuiThemeProvider>

  </React.Fragment>
  , document.querySelector('#app'));