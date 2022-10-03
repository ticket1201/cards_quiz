import React, {useEffect, useState} from 'react';
import {CardDataType} from "../../api/api";
import {useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import styles from './Learn.module.css'
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {getCardsTC} from "../PackPage/cards_reducer";
import {Card, CardContent} from "@mui/material";

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

const Learn = () => {
    const [card, setCard] = useState<CardDataType>(initialCardState)
    let {id} = useParams();
    const {
        cards,
        packName
    } = useAppSelector((store) => store.cards);
    const dispatch = useAppDispatch()

    useEffect(() => {
        // get all cards
        if (id) {
            dispatch(getCardsTC({cardsPack_id: id, pageCount: Infinity}))
        }
    }, [id])

    useEffect(() => {
        // get one card randomly from pack
        if (cards.length) {
            setCard(getCard(cards));
        }
    }, [cards])

    return (
        <div className={styles.main}>
            <h3>Learn "{packName}"</h3>
            <Card sx={{minWidth: 300}}>
                <CardContent>
                    <p><span className={styles.QA}>CardID: </span>{card._id}</p>
                    <p><span className={styles.QA}>Question: </span>{card.question}</p>
                    <p><span className={styles.QA}>Answer: </span>{card.answer}</p>
                </CardContent>
            </Card>

            <Paper>

            </Paper>
        </div>
    );
};

export default Learn;