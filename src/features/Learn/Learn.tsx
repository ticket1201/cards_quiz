import React, {useEffect, useState} from 'react';
import {CardDataType} from "../../api/api";
import {useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import styles from './Learn.module.css'
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {getCardsTC, setCardsAC, updateGradeCardTC} from "../PackPage/cards_reducer";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import {Preloader} from "../../common/components/Preloader/Preloader";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardDataType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    // console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const initialCardState: CardDataType = {
    cardsPack_id: '',
    user_id: '',
    _id: '',

    answer: '',
    question: '',
    comments: '',
    grade: 0,
    shots: 0,
    created: '',
    updated: '',

    answerImg: '',
    answerVideo: '',
    questionImg: '',
    questionVideo: ''
}
const defaultRadioValue = 1

const Learn = () => {
    const [card, setCard] = useState<CardDataType>(initialCardState)
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [grade, setGrade] = useState<number>(defaultRadioValue);
    let {id} = useParams();
    /*const {
        cards,
        packName,
        cardsTotalCount,
        maxGrade,
        minGrade,
        page,
        pageCount,
        packUserId
    } = useAppSelector((store) => store.cards);*/
    const allCards = useAppSelector((store) => store.cards)

    const dispatch = useAppDispatch()


    useEffect(() => {
        // get all cards
        if (id) {
            dispatch(getCardsTC({cardsPack_id: id, pageCount: Infinity}))
        }
    }, [id])
    useEffect(() => {
        // get one card randomly from pack
        if (allCards.cards.length) {
            setCard(getCard(allCards.cards));
        }
    }, [allCards.cards])


    const onShowButtonClickHandler = () => {
        setShowAnswer((prev) => !prev)
    }
    const onNextButtonClickHandler = async () => {
        const updatedGrade = await dispatch(updateGradeCardTC({card_id: card._id, grade}))
        if (updatedGrade) {
            // update cards array with our new grade
            dispatch(setCardsAC({
                ...allCards,
                cards: allCards.cards.map(e => e._id === card._id ? {...card, grade: updatedGrade} : e)
            }))
            // hide answer
            setShowAnswer(false)
        }
    }


    const radioJSX = grades.map((e, k) => (
        <FormControlLabel
            onClick={() => {
                setGrade(k + 1)
            }} key={'case-' + k}
            value={k + 1} control={<Radio/>}
            label={e}/>
    ))

    if (!card._id)
        return <Preloader/>

    return (<div className={styles.main}>
            <h3>Learn "{allCards.packName}"</h3>
            <Card sx={{minWidth: 300}}>
                <CardContent>
                    <div>
                        <span className={styles.QA}>Question: </span>{card.question}
                    </div>
                    <div className={styles.shots}>
                        Count of tries: <span className={styles.shotsNumber}>{card.shots}</span>
                    </div>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        style={{margin: '20px 0 0'}}
                        fullWidth
                        onClick={onShowButtonClickHandler}
                    >
                        Show answer
                    </Button>

                    {showAnswer && (
                        <div>
                            <div className={styles.answer}>
                                <span className={styles.QA}>Answer: </span>{card.answer}
                            </div>
                            <FormControl>
                                <FormLabel>Rate yourself</FormLabel>
                                <RadioGroup
                                    aria-labelledby="grade"
                                    defaultValue={defaultRadioValue}
                                    name="grade-radio-group"
                                >
                                    {radioJSX}
                                </RadioGroup>

                            </FormControl>
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                style={{margin: '20px 0 0'}}
                                fullWidth
                                onClick={onNextButtonClickHandler}
                            >
                                Next
                            </Button>
                        </div>

                    )}
                </CardContent>
            </Card>

            <Paper>

            </Paper>
        </div>
    );
};

export default Learn;