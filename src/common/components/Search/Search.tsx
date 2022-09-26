import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {SearchOutlined} from '@mui/icons-material';
import {ChangeEvent, FC, useEffect} from 'react';
import useDebounce from '../../hooks/useDebounce';
import {useAppDispatch} from '../../hooks/hooks';
import {getPacksTC} from '../../../features/PacksList/pack_reducer';
import {AnyAction} from 'redux';

type SearchPropsType = {
    searchValue: string
    searchAC: (value: string) => AnyAction
    isFullWidth?: boolean
}

export const Search: FC<SearchPropsType> = ({searchValue, searchAC, isFullWidth}) => {

    const dispatch = useAppDispatch()
    const debouncedValue = useDebounce(searchValue)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchAC(e.currentTarget.value))
    }

    useEffect(() => {
        dispatch(getPacksTC())
    }, [debouncedValue])

    return <div>
        <p>Search real-time: {searchValue}</p>
        <p>Debounced value: {debouncedValue}</p>
        <TextField
            value={searchValue}
            onChange={onChangeHandler}
            size={'small'}
            placeholder={'Provide your text'}
            fullWidth={isFullWidth}
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchOutlined/></InputAdornment>,
            }}
        />
    </div>
}