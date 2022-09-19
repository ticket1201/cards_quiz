import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import StandardInput from '@mui/material/StandardInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import {OutlinedInputProps} from '@mui/material/OutlinedInput/OutlinedInput';
// import {TextFieldProps} from '@mui/material/TextField/TextField';
// import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import {FormControl, InputLabel} from '@mui/material';
import {InputProps} from '@mui/material/Input/Input';

type PasswordInputType = InputProps & {
    // showPassword: boolean
    //password: string
}

const PasswordInput = (/*{password}: PasswordInputType*/props: PasswordInputType) => {
    // const [value, setValue] = useState<string>();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    /*const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };*/

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                {...props}
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                // value={value}
                // onChange={handleChange}

                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }

            />
        </FormControl>
    );
};

export default PasswordInput;