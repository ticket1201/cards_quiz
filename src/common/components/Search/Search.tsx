import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {SearchOutlined} from '@mui/icons-material';
import {ChangeEvent, FC} from 'react';

type SearchPropsType = {
    searchValue: string | null
    searchHandler: (value: string) => void
    isFullWidth?: boolean
}

export const Search: FC<SearchPropsType> = ({searchValue, searchHandler, isFullWidth}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        searchHandler(e.currentTarget.value)
    }


    return <div>
        <h3>Search</h3>
        <TextField
            value={searchValue ? searchValue : ''}
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