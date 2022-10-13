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
import {CommonModalStateType} from './commonTypes';
import {UploadButton} from '../../common/components/UploadButton/UploadButton';

type PackModalType = {
    data: CommonModalStateType
    isOpen: boolean
    onClose: () => void
}

type PackModalFormType = {
    name: string
    private: boolean
    coverFile: FileList
}

export const PackModal: React.FC<PackModalType> = ({data, isOpen, onClose}) => {
    const {_id, name, title, packCover} = data
    const isPrivate = data.private

    const dispatch = useAppDispatch()
    const [packName, setPackName] = useState(name)
    const [deckCover, setDeckCover] = useState(packCover)

    const {
        register,
        control,
        handleSubmit,
        reset,
        resetField,
        clearErrors,
        formState,
        formState: {errors, isSubmitSuccessful}
    } = useForm<PackModalFormType>({
        defaultValues: {
            name: packName,
            private: isPrivate,
        },
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<PackModalFormType> = data => {
        const {coverFile, ...restData} = data
        if (_id && (restData.name !== name || restData.private !== isPrivate || deckCover !== packCover)) {
            dispatch(updatePackTC({_id, ...restData, deckCover}))
        } else if (!_id) {
            dispatch(createPackTC({...restData, deckCover}))
        }
        closeHandler()
    }

    const closeHandler = () => {
        resetField('name')
        onClose()
        setPackName('')
        setDeckCover('')
    }

    const onPackNameChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPackName(e.currentTarget.value)
        clearErrors('name')
    }


    //without this, private checkbox don't reset after submit
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({name, private: isPrivate})
        }
    }, [formState, isSubmitSuccessful, reset, name, isPrivate])


    // it takes some time before name prop in initState will change its value from '' to real
    useEffect(() => {
        setPackName(name)
        setDeckCover(packCover)

        // without this, submitting from without making changes cause error 'Pack name is required'
        reset({name, private: isPrivate})
    }, [name, isPrivate, reset, packCover])

    return (
        <BasicModal isOpen={isOpen} onClose={closeHandler} title={title}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>

                    <UploadButton title={'Upload pack cover'}
                                  imgURL={deckCover}
                                  name={'coverFile'}
                                  register={register}
                                  saveImgUrl={setDeckCover}/>

                    <TextField label="Pack name"
                               variant="standard"
                               value={packName}
                               sx={{marginTop: '25px'}}
                               {...register('name', {
                                   required: 'Pack name is required'
                               })}
                               onChange={onPackNameChangeHandler}
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