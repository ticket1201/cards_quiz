import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setAppErrorAC, setAppSuccessAC} from '../../../app/app_reducer';
import {AlertColor} from '@mui/material/Alert/Alert';

const CustomSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)
    const success = useAppSelector(state => state.app.success)
    const severity: AlertColor = success ? 'success' : 'error'
    const message = success ? success : error ? error : ''

    const handleClose = () => {
        // reset error after 6 seconds
        error && dispatch(setAppErrorAC(null))
        success && dispatch(setAppSuccessAC(null))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={15000} onClose={handleClose}>
            <Alert variant="filled" severity={severity}>{message}</Alert>
        </Snackbar>
    );
};

export default CustomSnackbar