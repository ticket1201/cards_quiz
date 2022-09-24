import React, {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../../common/hooks/hooks';
import {registerTC} from '../auth_reducer';
import {Navigate, NavLink} from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import s from '../Login/Login.module.css';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import {PasswordInput} from '../../../common/components/PasswordInput/PasswordInput';
import {Path} from '../../../common/enums/path';
// import {setAppErrorAC, setAppStatusAC} from '../../../app/app_reducer';
// import PasswordInput from '../../../common/components/PasswordInput/PasswordInput';


export type RegisterFormType = {
    email: string
    password: string
    confirmPassword: string
}

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

const RegisterForm = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<RegisterFormType>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onTouched'
    });
    let password = watch('password', '')

    const dispatch = useAppDispatch()
    const [redirect, setRedirect] = useState<boolean>(false)


    const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
        const {confirmPassword, ...restData} = data
        const res = await dispatch(registerTC(restData))
        setRedirect(res)
    }

    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }

    if (redirect) {
        return <Navigate to={Path.Login}/>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.wrapper}
              onKeyDown={(e) => onEnterPress(e.key)}>
            <FormGroup>
                <TextField
                    label="Email"
                    variant="standard"
                    margin="normal"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Write correct email'
                        }
                    })}
                />
                {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}

                <PasswordInput
                    name="password"
                    label={'Password'}
                    register={register}
                    options={{
                        required: 'Password is required', minLength: {
                            value: 8, message: 'Password must be more than 8 characters'
                        }
                    }}
                />
                {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}

                <PasswordInput name="confirmPassword"
                               label={'Confirm password'}
                               register={register}
                               options={{
                                   validate: value =>
                                       value === password || 'The passwords do not match'
                               }}
                />
                {errors.confirmPassword &&
                    <div style={{color: 'red'}}>{errors.confirmPassword.message}</div>}

                <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop: '40px'}}
                        fullWidth>
                    Sign up
                </Button>
            </FormGroup>
        </form>
    )
}