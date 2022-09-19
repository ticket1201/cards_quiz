import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setAppErrorAC, setAppSuccessAC} from '../../../app/app_reducer';
import {AlertColor} from '@mui/material/Alert/Alert';

export const SuccessSnackbar = () => {
    const dispatch = useAppDispatch()
    const success = useAppSelector(state => state.app.success)
    const severity: AlertColor = 'success'
    const message = success

    const handleClose = () => {
        // reset error after 6 seconds
        success && dispatch(setAppSuccessAC(null))
    }

    return (
        <Snackbar open={!!success} autoHideDuration={6000} onClose={handleClose} /*anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}*/>
            <Alert variant="filled" severity={severity}>{message}</Alert>
        </Snackbar>
    );
};

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)
    const severity: AlertColor = 'error'
    const message = error

    const handleClose = () => {
        // reset error after 6 seconds
        error && dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant="filled" severity={severity}>{message}</Alert>
        </Snackbar>
    );
};

export const UniversalSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)
    const success = useAppSelector(state => state.app.success)
    const severity: AlertColor = success ? 'success' : 'error'
    const message = success ? success : error

    const handleClose = async () => {
        // reset error after X seconds
        error && dispatch(setAppErrorAC(null))
        success && dispatch(setAppSuccessAC(null))
    }

    const isOpen: boolean = !!error || !!success

    return (<>
        {message && <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant="filled" severity={severity}>{message}</Alert>
        </Snackbar>}
    </>);
};