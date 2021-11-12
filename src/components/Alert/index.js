import React from "react";
import {Card, Avatar, Button, TextField, FormControlLabel, Checkbox, Box, Typography, Container, Snackbar, Alert} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



function AlertMessage({propmt}) {

    const [state, setState] = React.useState({ type: 'error', show: false, message: '' });

    React.useEffect(() => {
      if(propmt.show === true){
        setState({ type: propmt.type, show: true, message: propmt.message });
      }
    }, [propmt.show, propmt.type]);

    const hideAlert = () => {
      setState({ ...state, show: false });
    };

    let vertical = 'top';
    let horizontal = 'right';

    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={hideAlert}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={hideAlert}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
  );

    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={state.show} onClose={hideAlert} action={action}>
            <Alert onClose={hideAlert} severity={state.type} sx={{ width: '100%' }}>{state.message}</Alert>
        </Snackbar>
    );
}
  
export {AlertMessage} ;