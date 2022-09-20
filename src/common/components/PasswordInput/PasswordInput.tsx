import React, {FC, useState} from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

type PasswordInputPropsType = {
    register: any
    label: string
}
export const PasswordInput: FC<PasswordInputPropsType> = ({register, label}) => {

    const [values, setValues] = useState({
        password: '',
        showPassword: false
    })
    const handleClickShowPassword = () => {
        setValues({
            ...values, showPassword: !values.showPassword
        })
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values, password: event.currentTarget.value
        })
    };
    return <TextField type={values.showPassword ? 'text' : 'password'}
                      label={label}
                      margin="normal"
                      variant="standard"
                      InputProps={{
                          endAdornment: <InputAdornment position={'end'}>
                              <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                              >
                                  {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                              </IconButton>
                          </InputAdornment>
                      }}
                      {...register('password', {
                          value: values.password, onChange: handleChange,
                          required: 'Password is required', minLength: {
                              value: 8, message: 'Password must be more than 8 characters'
                          }
                      })}
    />
}