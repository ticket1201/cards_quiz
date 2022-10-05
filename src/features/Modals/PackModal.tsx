import React, {ChangeEvent, useEffect, useState} from 'react';
import {BasicModal} from '../../common/components/BasicModal/BasicModal';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {Stack} from '@mui/material';
import {useAppDispatch} from '../../common/hooks/hooks';
import {createPackTC, updatePackTC} from '../PacksList/pack_reducer';

type PackModalType = {
    _id: string
    name: string
    isPrivate: boolean
    title: string
    isOpen: boolean
    onClose: () => void
}

type PackModalFormType = {
    name: string
    private: boolean
}

export const PackModal: React.FC<PackModalType> = ({_id, name, isPrivate, title, isOpen, onClose}) => {

    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState(name)

    const {
        register,
        control,
        handleSubmit,
        reset,
        resetField,
        formState,
        formState: {errors, isSubmitSuccessful}
    } = useForm<PackModalFormType>({
        defaultValues: {
            name: inputValue,
            private: isPrivate
        },
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<PackModalFormType> = data => {
        if (_id && (data.name !== name || data.private !== isPrivate)) {
            dispatch(updatePackTC({_id, ...data}))
        } else if (!_id) {
            dispatch(createPackTC(data))
        }
        closeHandler()
    }
    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }
    const closeHandler = () => {
        resetField('name')
        onClose()
        setInputValue('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
    }

    //without this, private checkbox don't reset after submit
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({name, private: isPrivate})
        }
    }, [formState, isSubmitSuccessful, reset, name, isPrivate])


    // it takes some time before name prop in initState will change it's value from '' to real
    useEffect(() => {
        setInputValue(name)

        // without this, submitting from without making changes cause error 'Pack name is required'
        reset({name, private: isPrivate})
    }, [name, isPrivate, reset])

    return (
        <BasicModal isOpen={isOpen} onClose={closeHandler} title={title}>
            <form onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={(e) => onEnterPress(e.key)}>
                <FormGroup>

                    <TextField label="Pack name"
                               variant="standard"
                               value={inputValue}
                               {...register('name', {
                                   required: 'Pack name is required'
                               })}
                               onChange={onChangeHandler}
                    />
                    {errors.name && <div style={{color: 'red'}}>{errors.name.message}</div>}

                    <FormControlLabel label={'Private pack'} sx={{marginTop: '21px'}}
                                      control={<Controller name="private" control={control}
                                                           render={({field}) => <Checkbox {...field}
                                                                                          checked={!!field.value}/>}/>}/>

                    <Stack spacing={2} direction={'row'} justifyContent={'space-between'} sx={{marginTop: '26px'}}>
                        <Button variant={'outlined'}
                                onClick={() => closeHandler()}
                                sx={{width: '115px'}}>Cancel</Button>
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                sx={{width: '115px'}}>Save</Button>
                    </Stack>
                </FormGroup>
            </form>
        </BasicModal>
    );
};