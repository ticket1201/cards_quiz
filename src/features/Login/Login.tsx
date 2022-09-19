import React, {useEffect} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {Navigate, NavLink} from 'react-router-dom';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {loginTC} from './auth_reducer';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import s from './Login.module.css';

type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
}

const Login = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth._id)

    const {register, reset, control, handleSubmit, formState: {errors, isSubmitSuccessful}} = useForm<LoginFormType>({
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

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    if (userId) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={'base-wrapper'}>
            <Paper className={'defaultPop'} elevation={2}>
                <FormControl className={s.FormControl}>
                    <FormLabel>
                        <h2 className={s.title}>Sign in</h2>
                    </FormLabel>


                    <form onSubmit={handleSubmit(onSubmit)} className={s.wrapper}
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

                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       variant="standard"
                                       {...register('password', {
                                           required: 'Password is required', minLength: {
                                               value: 8, message: 'Password must be more than 8 characters'
                                           }
                                       })}
                            />
                            {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}

                            <FormControlLabel label={'Remember me'} style={{marginTop: '8px'}}
                                              control={<Controller name="rememberMe" control={control}
                                                                   render={({field}) => <Checkbox {...field}
                                                                                                  checked={!!field.value}/>}/>}/>

                            <NavLink to={'/reset'} className={s.forgotPass}>Forgot password ?</NavLink>
                            <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop: '70px'}}
                                    fullWidth>
                                Sign in
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
                <p className={s.text}>Already have an account ?</p>
                <NavLink to={'/registration'} className={s.signUpLink}>Sing up</NavLink>
            </Paper>
        </div>
    );
};

export default Login;