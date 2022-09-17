import React, {useEffect} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {Navigate, NavLink} from 'react-router-dom';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {loginTC} from './auth_reducer';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';

type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
}

const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <FormControl>
            <FormLabel>
                <h1 style={{textAlign: 'center'}}>Sign in</h1>
            </FormLabel>


            <form onSubmit={handleSubmit(onSubmit)}>
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

                    <FormControlLabel label={'Remember me'}
                                      control={<Controller name="rememberMe" control={control}
                                                           render={({field}) => <Checkbox {...field}
                                                                                          checked={!!field.value}/>}/>}/>

                    <NavLink to={'/reset'}>
                        <div>Forgot password ?</div>
                    </NavLink>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Sign in
                    </Button>
                    <p>Already have an account ?</p>
                    <NavLink to={'/registration'}><h2 style={{textAlign: 'center'}}>Sing up</h2></NavLink>

                </FormGroup>
            </form>
        </FormControl>
    );
};

export default Login;