import React, {useEffect, useState} from 'react';
import {CardDataType, cardsAPI, getCardsResponseType} from "../../api/api";
import {useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import styles from './Learn.module.css'
import {useAppDispatch} from "../../common/hooks/hooks";
import {getCardsTC} from "../PackPage/cards_reducer";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardDataType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const initialPackState: getCardsResponseType = {
    cards: [],
    packName: '',
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 1,
    page: 1,
    pageCount: 1,
    packUserId: ''
}


const Learn = () => {
    const [cards, setCards] = useState<getCardsResponseType>(initialPackState)
    const [card, setCard] = useState<getCardsResponseType>(initialPackState)
    let {id = ''} = useParams();
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(getCardsTC({cardsPack_id: id}))
        }
    }, [id])

    return (
        <div>
            {/*<p>pack name: {cards.packName}</p>
            <p>cards count: {cards.cardsTotalCount}</p>
            <p>Learn</p>*/}
            <Paper>
                <p><span className={styles.question}>Question: </span></p>
            </Paper>
        </div>
    );
};

export default Learn;