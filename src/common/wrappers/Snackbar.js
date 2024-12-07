import * as React from 'react';
import { Snackbar, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

let showSnackbarFn; 

export const GlobalSnackbar = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('info'); 

  const showSnackbar = (msg, variant = 'info') => {
    setMessage(msg);
    setVariant(variant);
    setOpen(true);
  };

  React.useEffect(() => {
    showSnackbarFn = showSnackbar;
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
    >
      <Alert
        onClose={handleClose}
        severity={variant} 
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export const showSnackbar = (message, variant = 'info') => {
  if (showSnackbarFn) {
    showSnackbarFn(message, variant);
  }
};
