import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../../common/hooks/hooks';
import {registerTC} from '../auth_reducer';
import {useNavigate} from 'react-router-dom';
import {setAppStatusAC} from '../../../app/app_reducer';
import {errorUtils} from '../../../common/utils/error-utils';
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';


export type RegisterFormType = {
    email: string
    password: string
}

const Registration = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormType>();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
        // console.log(data);
        // alert('email = ' + data.email + ', pass = ' + data.password)
        dispatch(registerTC(data))
            .then(() => {
                // console.log('ok, res = ', res);
                dispatch(setAppStatusAC('succeeded'))
                navigate('/profile')
            })
            .catch((e) => {
                // console.log('not ok, e = ', e)
                // console.log(e.response.data.error)
                dispatch(setAppStatusAC('failed'))
                errorUtils(e, dispatch)
            })
    }

    return (
        <div>
            {/*<form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Input {...register('email', {required: true})}  />
                    <Input type="password" {...register('password', {required: true, minLength: 8})}  />
                    <Input type="submit"/>
                </FormControl>
            </form>*/}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Write correct email'
                        }
                    })}
                           style={{color: 'black'}}
                    />
                    {errors.email && errors.email.message}
                </div>
                <div>
                    <input type={'password'}
                           {...register('password', {
                               required: 'Password is required',
                               minLength: {
                                   value: 8,
                                   message: 'Min length is 8'
                               }
                           })}
                           style={{color: 'black'}}
                    />
                    {errors.password && errors.password.message}
                </div>
                <input type="submit" style={{color: 'black'}}/>
            </form>
        </div>
    );
};

export default Registration;