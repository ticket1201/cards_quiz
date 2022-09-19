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

    const isMessage = error || success || null
    const severity: AlertColor = success ? 'success' : 'error'

    const handleClose = () => {
        error && dispatch(setAppErrorAC(null))
        success && dispatch(setAppSuccessAC(null))
    }

    return (
        <Snackbar open={!!error || !!success} autoHideDuration={1000} onClose={handleClose}>
            <Alert variant="filled" severity={severity}>{isMessage}</Alert>
        </Snackbar>
    );
};

export default CustomSnackbar