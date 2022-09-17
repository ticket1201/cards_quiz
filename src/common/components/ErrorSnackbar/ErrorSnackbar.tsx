import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setAppErrorAC} from '../../../app/app_reducer';

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)

    const handleClose = () => {
        // reset error after 6 seconds
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant="filled" severity="error">{error}</Alert>
        </Snackbar>
    );
};

