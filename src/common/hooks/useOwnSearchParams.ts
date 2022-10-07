import {useEffect, useState} from 'react'
import {serializeFormQuery} from "../utils/serializeFormQuery";
import {useSearchParams} from 'react-router-dom';

function useOwnSearchParams(): any {
    // const [debouncedValue, setDebouncedValue] = useState<T>(value)

    const [searchParam, setSearchParam] = useSearchParams({})
    const startParams = serializeFormQuery(searchParam)
    const [params, setParams] = useState(startParams)

    useEffect(() => {
        setSearchParam(params)
    }, [params])

    return [params, setParams]
}

export default useOwnSearchParams