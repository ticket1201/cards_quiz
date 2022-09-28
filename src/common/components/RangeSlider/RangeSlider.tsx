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
    currentMin: string | null
    currentMax: string | null
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
        if (currentMin && currentMax) {
            setValue([+currentMin, +currentMax])
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
                <Button variant={'outlined'} sx={{marginRight: '12px'}} onClick={resetMinHandler}>{value[0]}</Button>
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
                <Button variant={'outlined'} sx={{marginLeft: '12px'}} onClick={resetMaxHandler}>{value[1]}</Button></div>
        </div>
    );
}
