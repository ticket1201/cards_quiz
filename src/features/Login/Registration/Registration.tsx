import React from 'react';
import {NavLink} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import s from '../Login/Login.module.css';
import FormLabel from '@mui/material/FormLabel';
import {Path} from '../../../common/enums/path';
import RegisterForm from './RegisterForm/RegisterForm';

const Registration = () => {
    return (
        <div className={'base-wrapper'}>
            <Paper className={'defaultPop'} elevation={2}>
                <FormControl className={s.FormControl}>
                    <FormLabel>
                        <h2 className={s.title}>Sign up</h2>
                    </FormLabel>

                    <RegisterForm/>

                </FormControl>
                <p className={s.text}>Already have an account ?</p>
                <NavLink to={Path.Login} className={s.signUpLink}>Sing in</NavLink>
            </Paper>
        </div>
    );
};

export default Registration;