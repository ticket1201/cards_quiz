import React, {useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../../common/hooks/hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {setNewPassTC} from '../../auth_reducer';
import Paper from '@mui/material/Paper';
import s from '../ResetPassword.module.css';
import Button from '@mui/material/Button';
import {PasswordInput} from '../../../../common/components/PasswordInput/PasswordInput';
import {Path} from '../../../../common/enums/path';

type InputsType = {
    password: string
}


const NewPassword = () => {
    const {token} = useParams()
    const dispatch = useAppDispatch()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const {register, handleSubmit, formState: {errors}} = useForm<InputsType>();

    const onSubmit: SubmitHandler<InputsType> = async (data: { password: string }) => {

        let res = await dispatch(setNewPassTC({
            ...data,
            resetPasswordToken: token!
        }))

        if (res) {
            setIsSuccess(true)
        }

    }

    if (isSuccess) {
        return <Navigate to={Path.Login}/>
    }

    return (
        <Paper className={'defaultPop'} elevation={2}>
            <h2>Create new password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <PasswordInput isFullWidth={true} register={register} name={'password'} options={{
                    required: 'Password is required', minLength: {
                        value: 8, message: 'Password must be more than 8 characters'
                    }
                }} label={'Password'}/>
                {errors.password && <span className={s.error}>This field is required</span>}
                <p>Create new password and we will send you further instructions to email</p>
                <Button type={'submit'} variant={'contained'} fullWidth>
                    Create new password
                </Button>
            </form>
        </Paper>
    );
};

export default NewPassword;