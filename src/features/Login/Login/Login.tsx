import React from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppSelector} from '../../../common/hooks/hooks';
import s from './Login.module.css';
import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import {LoginForm} from './LoginForm/LoginForm';

export const Login = () => {
    const userId = useAppSelector(state => state.auth._id)
    if (userId) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={'base-wrapper'}>
            <Paper className={'defaultPop'} elevation={2}>
                <FormControl className={s.FormControl}>
                    <FormLabel style={{color: 'inherit'}}>
                        <h2 className={s.title}>Sign in</h2>
                    </FormLabel>
                    <LoginForm/>
                </FormControl>
                <p className={s.text}>Do not have an account ?</p>
                <NavLink to={'/registration'} className={s.signUpLink}>Sing up</NavLink>
            </Paper>
        </div>
    );
};