import React from 'react';
import Paper from '@mui/material/Paper';
import {SubmitHandler, useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {NavLink, useNavigate} from 'react-router-dom';
import s from './ResetPassword.module.css'
import {useAppDispatch} from '../../../common/hooks/hooks';
import {forgotPassTC} from '../auth_reducer';

type InputsType = {
    email: string
}

const ResetPassword = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<InputsType>();
    const onSubmit:SubmitHandler<InputsType> = async (data:{email:string}) => {
       let res = await dispatch(forgotPassTC(data))
       if (res){
           navigate(`/reset/success/${data.email}`)
       }
    }

    return (
        <div className={'base-wrapper'}>
            <Paper className={'defaultPop'} elevation={2}>
                <h2>Forgot your password?</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <TextField fullWidth type={'email'} variant={'standard'} label={'Email'} {...register("email", { required: true })} />
                    {errors.email && <span className={s.error}>This field is required</span>}
                    <p>Enter your email address and we will send you further instructions </p>
                    <Button type={'submit'} variant={'contained'} fullWidth>
                        Send Instructions
                    </Button>
                </form>
                <p>Did you remember your password?</p>
                <NavLink to={'/'}>Try logging in</NavLink>
            </Paper>
        </div>
    );
};

export default ResetPassword;