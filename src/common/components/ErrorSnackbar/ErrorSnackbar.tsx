import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const ErrorSnackbar = () => {
    const handleClose = () => {}
    const isError = false

    return (
        <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant="filled" severity="error">This is an error message!</Alert>
        </Snackbar>
    );
};

