import React, {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../../common/hooks/hooks';
import {registerTC} from '../auth_reducer';
import {Navigate} from 'react-router-dom';
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
// import {setAppErrorAC, setAppStatusAC} from '../../../app/app_reducer';
// import PasswordInput from '../../../common/components/PasswordInput/PasswordInput';
// import FormControl from '@mui/material/FormControl';


export type RegisterFormType = {
    email: string
    password: string
    password2: string
}

const Registration = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormType>();
    const dispatch = useAppDispatch()
    // const navigate = useNavigate()
    const [redirect, setRedirect] = useState<boolean>(false)

    const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
        const res = await dispatch(registerTC(data))
        setRedirect(res)
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <div>
            <Paper className={'defaultPop'} elevation={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField
                            label="Email"
                            variant="standard"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Write correct email'
                                }
                            })}
                            // style={{color: 'black'}}
                        />
                        {errors.email && errors.email.message}
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            variant="standard"
                            type={'password'}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Min length is 8'
                                }
                            })}
                            // style={{color: 'black'}}
                        />
                        {errors.password && errors.password.message}
                    </div>
                    {/*<div>
                        <PasswordInput {...register('password2', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Min length is 8'
                            }
                        })}/>
                    </div>*/}
                    <div>
                        <input type="submit" style={{color: 'black'}}/>
                    </div>
                </form>
            </Paper>
        </div>
    );
};

export default Registration;