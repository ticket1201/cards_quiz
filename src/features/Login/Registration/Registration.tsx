import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';


type RegisterFormType = {
    email: string
    password: string
}

const Registration = () => {
    const {register, handleSubmit} = useForm<RegisterFormType>();

    const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
        console.log(data);
        alert('email = ' + data.email + ', pass = ' + data.password)
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
                    <input {...register('email', {required: true})}
                           style={{color: 'black'}}
                    />
                </div>
                <div>
                    <input type={'password'}
                           {...register('password', {required: true, minLength: 8})}
                           style={{color: 'black'}}
                    />
                </div>
                <input type="submit" style={{color: 'black'}}/>
            </form>
        </div>
    );
};

export default Registration;