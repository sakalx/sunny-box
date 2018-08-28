import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {toggleSnackbar} from 'root/redux-core/actions/notification';

import Snackbar from '@material-ui/core/Snackbar';

const SnackbarMessage = ({openSnackBar, snackBarMsg, toggleSnackbar}) =>
  <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            open={openSnackBar}
            onClose={() => toggleSnackbar()}
            ContentProps={{'aria-describedby': 'snackBar-msg'}}
            message={
              <span id='snackBar-msg'>{snackBarMsg}</span>
            }
  />;

const mapStateToProps = ({notification: {openSnackBar, snackBarMsg}}) => ({
  openSnackBar,
  snackBarMsg,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSnackbar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarMessage);