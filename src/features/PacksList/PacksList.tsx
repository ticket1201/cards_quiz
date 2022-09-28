import React, {useEffect} from 'react';
import UniversalTable from '../../common/components/Table/UniversalTable';
import {GridColDef} from '@mui/x-data-grid';
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {getPacksTC} from './pack_reducer';
import {Search} from '../../common/components/Search/Search';
import {RangeSlider} from '../../common/components/RangeSlider/RangeSlider';
import {PacksOwnerSort} from '../../common/components/PacksOwnerSort/PacksOwnerSort';
import {ClearFilters} from '../../common/components/ClearFilters/ClearFilters';
import {Paginator} from '../../common/components/Paginator/Paginator';

const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'cards', headerName: 'Cards', flex: 1},
    {field: 'lastUpdated', headerName: 'Last updated', flex: 1},
    {field: 'createdBy', headerName: 'Created by', flex: 1},
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        minWidth: 150,
        renderCell: (params) => (
            <>
                <IconButton>
                    <SchoolIcon/>
                </IconButton>
                {params.row.actions && <>
                    <IconButton>
                        <EditIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </>}
            </>
        ),
    }
    /*{
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },*/
];

/*const rows = [
    {id: '1', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: true},
    {id: '2', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: false},
    {id: '3', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: false},
    {id: '4', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: false},
    {id: '5', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: true},
    {id: '6', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: false},
    {id: '7', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: false},
    {id: '8', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: false},
    {id: '9', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: false},
    {id: '10', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: false},
    {id: '11', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: true},
    {id: '12', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: true},
    {id: '13', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: false},
    {id: '14', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: false},
    {id: '15', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: true},

];*/

const PacksList = () => {
    const dispatch = useAppDispatch()
    const {
        cardPacks,
        minCardsCount,
        maxCardsCount,
        page,
        pageCount,
        cardPacksTotalCount
    } = useAppSelector(state => state.packs)
    let rows = cardPacks.map(el => ({
        ...el, id: el._id
    }))

    const [searchParam, setSearchParam] = useSearchParams({})
    let searchValue = searchParam.get('packName')
    let min = searchParam.get('min')
    let max = searchParam.get('max')
    let user_id = searchParam.get('user_id')

    // let somePage = searchParam.get('user_id')

    const searchHandler = (value: string) => {
        let temp = {}
        // @ts-ignore
        for (const [key, value] of searchParam.entries()) {
            temp = {...temp, [key]: value}
        }
        if (!value) {
            // @ts-ignore
            delete temp.packName
            setSearchParam(temp)
            return
        }
        setSearchParam({...temp, packName: value})
    }

    const rangeHandler = (min: number, max: number) => {
        let temp = {}
        // @ts-ignore
        for (const [key, value] of searchParam.entries()) {
            temp = {...temp, [key]: value}
        }
        if (min === 0 && max === maxCardsCount) {
            // @ts-ignore
            delete temp.min
            // @ts-ignore
            delete temp.max
            setSearchParam(temp)
            return
        }
        setSearchParam({...temp, min: min.toString(), max: max.toString()})
    }

    const packsOwnerHandler = (user_id: string) => {
        let temp = {}
        // @ts-ignore
        for (const [key, value] of searchParam.entries()) {
            temp = {...temp, [key]: value}
        }

        if (!user_id) {
            // @ts-ignore
            delete temp.user_id
            setSearchParam(temp)
            return
        }
        setSearchParam({...temp, user_id})
    }

    const clearFiltersHandler = () => {
        setSearchParam({})
    }

    const paginationHandler = () => {
    }


    let params = {}
    searchParam.forEach((value: string, key: string) => {
        params = {...params, [key]: value}
    })


    useEffect(() => {
        let id = setTimeout(() => {
            dispatch(getPacksTC(params))
        }, 1000)
        return () => clearTimeout(id)
    }, [min, max, searchValue, user_id])

    return (
        <>
            Packs list
            <Search isFullWidth={true} searchHandler={searchHandler} searchValue={searchValue}/>
            <RangeSlider minValue={minCardsCount} maxValue={maxCardsCount} currentMin={min} currentMax={max}
                         rangeSliderHandler={rangeHandler}/>
            <PacksOwnerSort owner={user_id} packsOwnerHandler={packsOwnerHandler}/>
            <ClearFilters clearHandler={clearFiltersHandler}/>
            <UniversalTable columns={columns} rows={rows} pageSize={10}/>
            <Paginator changePageHandler={paginationHandler} currentPage={page} itemsOnPage={pageCount}
                       itemsTotalCount={cardPacksTotalCount}/>
        </>
    );
};

export default PacksList;