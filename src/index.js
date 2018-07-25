import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './redux-core/store';
import {initLocalStorage} from 'root/redux-core/actions/cache';

import caching from 'root/helpers/caching-local-storage';
import LSConfig from 'root/config/local-storage';

import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import muiTheme from './theme';

import ErrorBoundary from './components/error-boundary';
import App from './App';

caching(LSConfig.alphabet);
caching(LSConfig.geographyMap);
store.dispatch(initLocalStorage());

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