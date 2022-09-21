import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = memo(({value, onChange, disabled}: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);


    const activateEditMode = () => {
        if (!disabled) {
            setEditMode(true);
        }
    }
    const activateViewMode = () => {
        setEditMode(false);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if(checkLength(title)){
                saveHandler()
            }
        }
    }

    const checkLength = (str:string) => {
        return str.length > 0
    }

    const saveHandler = () => {
        onChange(title)
        activateViewMode()
    }



    return editMode
        ? <h3 className={s.textWrapper}>
            <TextField
                value={title}
                size={'small'}
                variant={'standard'}
                onChange={changeTitle}
                onKeyDown={onKeyPressHandler}
                fullWidth={true}
                label={'Nickname'}
            ></TextField>
            <Button
                size={'small'}
                variant={'contained'}
                className={s.button}
                style={{position: 'absolute'}}
                disabled={!checkLength(title)}
                disableElevation
                onClick={saveHandler}
            >
                <p>SAVE</p>
            </Button>
        </h3>
        : <h3 onDoubleClick={activateEditMode} >
            {value}
            <IconButton className={s.icon} onClick={activateEditMode}>
                <BorderColorOutlinedIcon/>
            </IconButton>
        </h3>
})
