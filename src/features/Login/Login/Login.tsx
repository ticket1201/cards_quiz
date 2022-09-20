import React from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {loginTC} from '../auth_reducer';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import s from './Login.module.css';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import {PasswordInput} from '../../../common/components/PasswordInput/PasswordInput';

export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
}

const Login = () => {
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

export default Login;


export const LoginForm = () => {
    const requestStatus = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    const {register, control, handleSubmit, formState: {errors}} = useForm<LoginFormType>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        mode: 'onTouched'
    });

    const onSubmit: SubmitHandler<LoginFormType> = data => {
        dispatch(loginTC(data))
    }
    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }

    return <form onSubmit={handleSubmit(onSubmit)} className={s.wrapper}
                 onKeyDown={(e) => onEnterPress(e.key)}>
        <FormGroup>

            <TextField label="Email"
                       margin="normal"
                       variant="standard"
                       {...register('email', {
                           required: 'Email is required',
                           pattern: {
                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                               message: 'Enter valid email please'
                           }
                       })}
            />
            {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}

            <PasswordInput register={register} name={'password'} options={{
                required: 'Password is required', minLength: {
                    value: 8, message: 'Password must be more than 8 characters'
                }
            }} label={'Password'}/>
            {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}

            <FormControlLabel label={'Remember me'} style={{marginTop: '8px'}}
                              control={<Controller name="rememberMe" control={control}
                                                   render={({field}) => <Checkbox {...field}
                                                                                  checked={!!field.value}/>}/>}/>

            <NavLink to={'/reset'} className={s.forgotPass}>Forgot password ?</NavLink>
            <Button type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    style={{marginTop: '70px'}}
                    disabled={requestStatus === 'loading'}
                    fullWidth>
                Sign in
            </Button>
        </FormGroup>
    </form>
}