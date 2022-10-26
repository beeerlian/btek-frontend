import React from 'react';
import Dialog from '@material-ui/core/Dialog';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MyButton from './buttons/MyButton';

export default function MyDialog({
  open, handleToClose, title, desc,
}) {
  return (
    <Dialog open={open} onClose={handleToClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div>
          {desc}
        </div>
      </DialogContent>
      <DialogActions>
        <MyButton
          onClick={handleToClose}
          autoFocus
        >
          Close
        </MyButton>
      </DialogActions>
    </Dialog>
  );
}