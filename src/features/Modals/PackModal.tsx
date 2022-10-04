import React, {ChangeEvent, useEffect, useState} from 'react';
import {BasicModal} from '../../common/components/BasicModal/BasicModal';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {Stack} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {closeModalAC} from './modal_reducer';
import {createPackTC, updatePackTC} from '../PacksList/pack_reducer';

type PackModalType = {
    title: string
}

type CreatePackFormData = {
    name: string
    private: boolean
}

export const PackModal: React.FC<PackModalType> = ({title}) => {

    const {_id, name, openAddPackModal, openEditPackModal} = useAppSelector(state => state.modals)
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
    } = useForm<CreatePackFormData>({
        defaultValues: {
            name: inputValue,
            private: false
        },
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<CreatePackFormData> = data => {
        _id ? dispatch(updatePackTC({_id, ...data})) : dispatch(createPackTC(data))
        closeHandler()
        setInputValue('')
    }
    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }
    const closeHandler = () => {
        resetField('name')
        dispatch(closeModalAC())
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                name: '',
                private: false
            })
        }
    }, [formState, isSubmitSuccessful, reset])

    useEffect(() => {
        setInputValue(name)
    }, [name])

    return (
        <BasicModal isOpen={openAddPackModal || openEditPackModal} onClose={closeHandler} title={title}>
            {/*<h2>Name:{name}</h2>*/}
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
