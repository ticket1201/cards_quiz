import React, {ChangeEvent, useEffect, useState} from 'react';
import {BasicModal} from '../../common/components/BasicModal/BasicModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {InputLabel, Select, Stack} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {closeModalAC} from './modal_reducer';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import {SelectChangeEvent} from '@mui/material/Select';
import {createCardTC, updateCardTC} from '../PackPage/cards_reducer';

type CardModalType = {
    title: string
}

type CardModalFormData = {
    question: string
    answer: string
}

export const CardModal: React.FC<CardModalType> = ({title}) => {

    const {
        _id,
        cardsPack_id,
        question,
        answer,
        openAddCardModal,
        openEditCardModal
    } = useAppSelector(state => state.modals)
    const dispatch = useAppDispatch()
    const [questionValue, setQuestionValue] = useState(question)
    const [answerValue, setAnswerValue] = useState(answer)
    const [questionType, setQuestionType] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        resetField,
        formState,
        formState: {errors, isSubmitSuccessful}
    } = useForm<CardModalFormData>({
        defaultValues: {
            question: questionValue,
            answer: answerValue
        },
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<CardModalFormData> = data => {
        debugger
        if (_id && (data.question !== question || data.answer !== answer)) {
            debugger
            dispatch(updateCardTC({_id, ...data}))
        } else if (!_id) {
            dispatch(createCardTC({cardsPack_id, ...data}))
        }
        closeHandler()
        console.log(data)
        console.log(question, answer, _id)
    }
    const onEnterPress = (key: string) => {
        key === 'Enter' && handleSubmit(onSubmit)
    }
    const closeHandler = () => {
        resetField('question')
        resetField('answer')
        dispatch(closeModalAC())
        setQuestionValue('')
        setAnswerValue('')
    }

    const onQuestionChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestionValue(e.currentTarget.value)
    }
    const onAnswerChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswerValue(e.currentTarget.value)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value as string);
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                question: '',
                answer: ''
            })
        }
    }, [formState, isSubmitSuccessful, reset])

    // это надо, потому что ты name берешь из редьюсера, а он не успевает подтянуться, поэтому в начале name = undefined
    useEffect(() => {
        setQuestionValue(question)
        setAnswerValue(answer)

        // это надо, потому что если без изменения нажать на кнопку 'Save', то будет ошибка, типа пустой инпут
        reset({question, answer})
    }, [question, answer, reset])

    return (
        <BasicModal isOpen={openAddCardModal || openEditCardModal} onClose={closeHandler} title={title}>
            <form onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={(e) => onEnterPress(e.key)}>
                <FormGroup>

                    <FormControl fullWidth>
                        <InputLabel>Choose a question format</InputLabel>
                        <Select
                            value={questionType}
                            label="Choose a question format"
                            onChange={handleChange}
                        >
                            <MenuItem value={'Text'}>Text</MenuItem>
                            <MenuItem value={'Image'}>Image</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField label="Question"
                               variant="standard"
                               value={questionValue}
                               sx={{marginTop: '25px'}}
                               {...register('question', {
                                   required: 'Question is required'
                               })}
                               onChange={onQuestionChangeHandler}
                    />
                    {errors.question && <div style={{color: 'red'}}>{errors.question.message}</div>}

                    <TextField label="Answer"
                               variant="standard"
                               value={answerValue}
                               sx={{marginTop: '25px'}}
                               {...register('answer', {
                                   required: 'Answer is required'
                               })}
                               onChange={onAnswerChangeHandler}
                    />
                    {errors.answer && <div style={{color: 'red'}}>{errors.answer.message}</div>}

                    <Stack spacing={2} direction={'row'} justifyContent={'space-between'} sx={{marginTop: '50px'}}>
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
