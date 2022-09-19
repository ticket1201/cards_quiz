import s from './SuperButton.module.css'
import Button from '@mui/material/Button';
import React from 'react';


type SuperButtonPropsType = {
    text: string
    variant: "text" | "outlined" | "contained"
    isRounded?: boolean
    disabled?: boolean
    disableElevation?: boolean
    size:  "small" | "medium" | "large"
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
         variant, isRounded, disabled, size,text,
          disableElevation
    }
) => {

    const finalClassName = isRounded ? `${s.rounded} ${s.default}` : `${s.default}`

    return (
        <Button
            className={finalClassName}
            variant={variant}
            disabled={disabled || false}
            size={size}
            disableElevation={disableElevation}
        >
            {text}
        </Button>
    )
}

