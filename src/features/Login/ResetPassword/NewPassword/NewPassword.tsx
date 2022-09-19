import React, {useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../../common/hooks/hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {setNewPassTC} from '../../auth_reducer';
import Paper from '@mui/material/Paper';
import s from '../ResetPassword.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type InputsType = {
    password: string
}


const NewPassword = () => {
    const {token} = useParams()
    const dispatch = useAppDispatch()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const {register, handleSubmit, formState: {errors}} = useForm<InputsType>();

    const onSubmit: SubmitHandler<InputsType> = async (data: { password: string }) => {
        try {
            await dispatch(setNewPassTC({
                ...data,
                resetPasswordToken: token!
            }))
            setIsSuccess(true)
        } catch (e) {
            setIsSuccess(false)
        }
    }

    if (isSuccess) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={'base-wrapper'}>
            <Paper className={'defaultPop'} elevation={2}>
                <h2>Create new password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <TextField fullWidth type={'password'} variant={'standard'}
                               label={'Password'} {...register('password', {required: true})} />
                    {errors.password && <span className={s.error}>This field is required</span>}
                    <p>Create new password and we will send you further instructions to email</p>
                    <Button type={'submit'} variant={'contained'} fullWidth>
                        Create new password
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default NewPassword;