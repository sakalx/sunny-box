/*
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {toggleAlert} from 'root/redux-core/actions/notification';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = props => <Slide direction='up' {...props}/>;

const AlertMessage = ({descriptionAlert, openAlert, titleAlert, toggleAlert}) =>
  <Dialog aria-labelledby='alert-message-title'
          keepMounted
          onClose={() => toggleAlert()}
          open={openAlert}
          TransitionComponent={Transition}
          aria-describedby='alert-message-description'>
    <DialogTitle id='alert-message-title'>
      {titleAlert}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id='alert-message-description'>
        {descriptionAlert}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus color='primary' onClick={() => toggleAlert()}>
        Ok
      </Button>
    </DialogActions>
  </Dialog>;

const mapStateToProps = ({notification: {openAlert, titleAlert, descriptionAlert}}) => ({
  descriptionAlert,
  openAlert,
  titleAlert,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleAlert
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);*/
