import * as React from 'react';
import {FC, useEffect} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import s from './RangeSlider.module.css'

function valuetext(value: number) {
    return `${value} cards in pack`;
}

type RangeSliderType = {
    minValue: number
    maxValue: number
    currentMin: number | null
    currentMax: number | null
    rangeSliderHandler: (min: number, max: number) => void
}

export const RangeSlider: FC<RangeSliderType> = ({
                                                     minValue,
                                                     maxValue,
                                                     currentMin,
                                                     currentMax,
                                                     rangeSliderHandler
                                                 }) => {

    const [value, setValue] = React.useState<number[]>([]);

    useEffect(() => {
        if (currentMin || currentMax) {
            // setValue([+currentMin, +currentMax])
            setValue([currentMin ? currentMin : minValue, currentMax ? currentMax : maxValue])
            return
        }
        setValue([minValue, maxValue])
    }, [minValue, maxValue, currentMin, currentMax])

    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleChangeCommitted = () => {
        rangeSliderHandler(value[0], value[1])
    }

    const resetMinHandler = () => {
        if (value[0] !== minValue) {
            setValue([minValue, value[1]])
            rangeSliderHandler(minValue, value[1])
        }
    }

    const resetMaxHandler = () => {
        if (value[1] !== maxValue) {
            setValue([value[0], maxValue])
            rangeSliderHandler(value[0], maxValue)
        }
    }

    return (
        <div className={s.container}>
            <h3>Number of cards</h3>
            <div className={s.rangeWrapper}>
                <Button variant={'outlined'} onClick={resetMinHandler} className={s.button}>{value[0]}</Button>
                <Box sx={{width: 'inherit'}}>
                    <Slider
                        getAriaLabel={() => 'Cards in pack range'}
                        value={value}
                        min={minValue}
                        max={maxValue}
                        onChange={handleChange}
                        onChangeCommitted={handleChangeCommitted}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        size={'medium'}
                    />
                </Box>
                <Button variant={'outlined'} onClick={resetMaxHandler} className={s.button}>{value[1]}</Button>
            </div>
        </div>
    );
}
