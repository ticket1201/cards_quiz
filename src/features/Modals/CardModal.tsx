import React, {ChangeEvent, useEffect, useState} from 'react';
import {BasicModal} from '../../common/components/BasicModal/BasicModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import {useAppDispatch} from '../../common/hooks/hooks';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import {createCardTC, updateCardTC} from '../PackPage/cards_reducer';
import {CommonModalStateType} from './commonTypes';
import {UploadButton} from '../../common/components/UploadButton/UploadButton';

type CardModalType = {
    data: CommonModalStateType
    isOpen: boolean
    onClose: () => void
}

type CardModalFormData = {
    question: string
    answer: string
}

export const CardModal: React.FC<CardModalType> = ({data, isOpen, onClose}) => {
    const {_id, cardsPack_id, question, answer, title, questionURL, answerURL} = data

    const dispatch = useAppDispatch()
    const [inputValues, setInputValues] = useState<string[]>([question, answer])
    const [questionType, setQuestionType] = useState('Text');
    const [questionImg, setQuestionImg] = useState(questionURL)
    const [answerImg, setAnswerImg] = useState(answerURL)

    const {
        register,
        handleSubmit,
        reset,
        resetField,
        formState: {errors}
    } = useForm<CardModalFormData>({
        defaultValues: {
            question: inputValues[0],
            answer: inputValues[1]
        },
        mode: 'onSubmit'
    });

    const onSubmit: SubmitHandler<CardModalFormData> = data => {
        if (_id && (data.question !== question || data.answer !== answer || questionImg !== questionURL || answerImg !== answerURL)) {
            dispatch(updateCardTC({_id, ...data, questionImg, answerImg}))
        } else if (!_id) {
            dispatch(createCardTC({cardsPack_id, ...data, questionImg, answerImg}))
        }
        closeHandler()
    }
    const closeHandler = () => {
        resetField('question')
        resetField('answer')
        onClose()
        setInputValues(['', ''])
        setQuestionImg('')
        setAnswerImg('')
    }

    const onQuestionChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValues([e.currentTarget.value, inputValues[1]])
    }
    const onAnswerChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValues([inputValues[0], e.currentTarget.value])
    }

    const handleChange = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value as string);
    };

    useEffect(() => {
        setInputValues([question, answer])
        setQuestionImg(questionURL)
        setAnswerImg(answerURL)
        questionURL ? setQuestionType('Image') : setQuestionType('Text')
        reset({question, answer})
    }, [question, answer, reset, questionURL, answerURL])

    return (
        <BasicModal isOpen={isOpen} onClose={closeHandler} title={title}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>

                    {!questionURL && <FormControl fullWidth>
                        <InputLabel>Choose a question format</InputLabel>
                        <Select
                            value={questionType}
                            label="Choose a question format"
                            onChange={handleChange}
                        >
                            <MenuItem value={'Text'}>Text</MenuItem>
                            <MenuItem value={'Image'}>Image</MenuItem>
                        </Select>
                    </FormControl>}

                    {questionType === 'Text'
                        ? <><TextField label="Question"
                                       variant="standard"
                                       value={inputValues[0]}
                                       sx={{marginTop: '25px'}}
                                       {...register('question', {
                                           required: 'Question is required'
                                       })}
                                       onChange={onQuestionChangeHandler}
                        />
                            {errors.question && <div style={{color: 'red'}}>{errors.question.message}</div>}

                            <TextField label="Answer"
                                       variant="standard"
                                       value={inputValues[1]}
                                       sx={{marginTop: '25px'}}
                                       {...register('answer', {
                                           required: 'Answer is required'
                                       })}
                                       onChange={onAnswerChangeHandler}
                            />
                            {errors.answer && <div style={{color: 'red'}}>{errors.answer.message}</div>}</>
                        : <><UploadButton title={'Upload question image'}
                                          label={'Question:'}
                                          imgURL={questionImg}
                                          saveImgUrl={setQuestionImg}/>
                            <UploadButton title={'Upload answer image'}
                                          label={'Answer:'}
                                          imgURL={answerImg}
                                          saveImgUrl={setAnswerImg}/></>}

                    <Stack spacing={2} direction={'row'} justifyContent={'space-between'} sx={{marginTop: '35px'}}>
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