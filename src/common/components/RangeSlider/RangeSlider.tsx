import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {FC, useEffect} from 'react';
import {getPacksTC} from '../../../features/PacksList/pack_reducer';
import {AnyAction} from 'redux';
import Button from '@mui/material/Button';
import s from './RangeSlider.module.css'

function valuetext(value: number) {
    return `${value} cards in pack`;
}

type RangeSliderType = {
    minValue: number
    maxValue: number
    isReset: boolean
    rangeAC: (min: number, max: number) => AnyAction
}

export const RangeSlider: FC<RangeSliderType> = ({minValue, maxValue, isReset, rangeAC}) => {

    const {min, max} = useAppSelector(state => state.search)
    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<number[]>([]);

    useEffect(() => {
        setValue([minValue, maxValue])
    }, [minValue, maxValue])

    useEffect(() => {
        dispatch(getPacksTC({min, max}))
    }, [min, max, dispatch])

    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleChangeCommitted = () => {
        dispatch(rangeAC(value[0], value[1]))
    }

    const resetMinHandler = () => {
        if (value[0] !== minValue) {
            setValue([minValue, value[1]])
            dispatch(rangeAC(minValue, value[1]))
        }
    }

    const resetMaxHandler = () => {
        if (value[1] !== maxValue) {
            setValue([value[0], maxValue])
            dispatch(rangeAC(value[0], maxValue))
        }
    }

    if (isReset) {
        resetMinHandler()
        resetMaxHandler()
    }
    return (
        <div className={s.container}>
            <Button variant={'outlined'} onClick={resetMinHandler}>{value[0]}</Button>
            <Box sx={{width: 200}}>
                <Slider
                    getAriaLabel={() => 'Cards in pack range'}
                    value={value}
                    min={minValue}
                    max={maxValue}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
            </Box>
            <Button variant={'outlined'} onClick={resetMaxHandler}>{value[1]}</Button>
        </div>
    );
}
