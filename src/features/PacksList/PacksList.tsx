import React, {useEffect, useState} from 'react';
import UniversalTable from '../../common/components/Table/UniversalTable';
import {GridColDef} from '@mui/x-data-grid';
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {createPackTC, deletePackTC, getPacksTC, updatePackTC} from './pack_reducer';
import {Search} from '../../common/components/Search/Search';
import {RangeSlider} from '../../common/components/RangeSlider/RangeSlider';
import {PacksOwnerSort} from '../../common/components/PacksOwnerSort/PacksOwnerSort';
import {ClearFilters} from '../../common/components/ClearFilters/ClearFilters';
import {Paginator} from '../../common/components/Paginator/Paginator';
import {GridSortModel} from '@mui/x-data-grid/models/gridSortModel';
import s from './PacksList.module.css'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {serializeFormQuery} from '../../common/utils/serializeFormQuery';

/*const customComparation: GridComparatorFn<string> = (v1, v2) => {
    // console.log('We are here')
    if (v1 < v2) {
        return -1;
    }
    if (v1 > v2) {
        return 1;
    }
    // names must be equal
    return 0;
}*/



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
    const onUpdateHandler = (_id:string) => {
        dispatch(updatePackTC({_id, name: `updated ${Math.random() * 10}`}))
    }
    const onDeleteHandler = (_id:string) => {
        dispatch(deletePackTC(_id))
    }

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'cardsCount', headerName: 'Cards', flex: 1/*, sortComparator: customComparation*/},
        {field: 'updated', headerName: 'Last updated', flex: 1},
        {field: 'created', headerName: 'Created by', flex: 1},
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
                        <IconButton onClick={() => onUpdateHandler(params.row._id)} >
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => onDeleteHandler(params.row._id)}>
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
    const dispatch = useAppDispatch()
    const {
        cardPacks,
        minCardsCount,
        maxCardsCount,
        page,
        pageCount,
        cardPacksTotalCount,
        isToggled
    } = useAppSelector(state => state.packs)
    const authId = useAppSelector(state => state.auth._id)

    const onSortModelChangeHandler = (model: GridSortModel) => {
        const field = model[0].field;
        const sort = model[0].sort;
        let sortQuery = '';

        if (sort === 'asc')
            sortQuery = '1' + field
        else if (sort === 'desc')
            sortQuery = '0' + field
        else if (!sort) {
            const {sortPacks, ...restParams} = params
            setParams(restParams)
            return
        }

        setParams({...params, sortPacks: sortQuery})
    }
    const [searchParam, setSearchParam] = useSearchParams({})
    const startParams = serializeFormQuery(searchParam, authId)
    let searchValue = searchParam.get('packName')
    let min = searchParam.get('min')
    let max = searchParam.get('max')
    let user_id = searchParam.get('user_id')
    let selectedPagesCount = searchParam.get('pageCount')
    const [params, setParams] = useState<any>(startParams)
    const loading = useAppSelector(state => state.app.status)

    const searchHandler = (value: string) => {
        if (!value) {
            const {packName, ...restParams} = params
            setParams(restParams)
            return
        }

        setParams({...params, packName: value})
    }

    const rangeHandler = (min: number, max: number) => {
        let rangeParams = {...params, min: min.toString(), max: max.toString()}

        if (min === 0) {
            const {min, ...rest} = rangeParams
            rangeParams = {...rest}
        }

        if (max === maxCardsCount) {
            const {max, ...rest} = rangeParams
            rangeParams = {...rest}
        }

        setParams(rangeParams)
    }

    const packsOwnerHandler = (user_id: string) => {
        if (!user_id) {
            const {user_id, ...restParams} = params
            setParams(restParams)
            return
        }

        // setParams({...params, user_id: authId})
        setParams({...params, user_id})
    }

    const clearFiltersHandler = () => {
        setParams({})
    }

    const paginationHandler = (currentPage: number) => {
        if (currentPage === page) {
            const {page, ...restParams} = params
            setParams(restParams)
            return
        }
        setParams({...params, page: currentPage.toString()})
    }

    const pagesCountHandler = (newPageCount: string) => {
        if (+newPageCount === 10) {
            const {pageCount, ...restParams} = params
            setParams(restParams)
            return
        }
        setParams({...params, pageCount: newPageCount})
    }

    useEffect(() => {
        setSearchParam(params)

        let id = setTimeout(() => {
            const sendParams = {...params, pageCount: selectedPagesCount ? +selectedPagesCount : 10}
            if (sendParams.hasOwnProperty('user_id')) {
                sendParams['user_id'] = authId
            }

            dispatch(getPacksTC(sendParams))
        }, 1000)
        return () => clearTimeout(id)
    }, [dispatch, params, isToggled, selectedPagesCount, setSearchParam, authId])

    return (
        <div className={`content-wrapper ${s.content}`}>
            <Grid flexDirection={'row'} justifyContent={'space-between'} className={s.title}>
                <h2>Packs list</h2>
                <Button className={s.addBtn} size={'small'} variant={'contained'} onClick={()=>dispatch(createPackTC({}))}>Add new pack</Button>
            </Grid>
            <div className={`${s.search}`}>
                <Search isFullWidth={true} searchHandler={searchHandler} searchValue={searchValue}/>
                <PacksOwnerSort owner={user_id} packsOwnerHandler={packsOwnerHandler}/>
                <RangeSlider minValue={minCardsCount} maxValue={maxCardsCount} currentMin={min} currentMax={max}
                             rangeSliderHandler={rangeHandler}/>
                <ClearFilters clearHandler={clearFiltersHandler}/>
            </div>

            <UniversalTable
                columns={columns}
                rows={cardPacks}
                pageSize={selectedPagesCount ? +selectedPagesCount : 10}
                loading={loading === 'loading'}
                onSortModelChange={onSortModelChangeHandler}
            />
            <Paginator changePageHandler={paginationHandler} changePagesCountHandler={pagesCountHandler}
                       currentPage={page} itemsOnPage={pageCount}
                       itemsTotalCount={cardPacksTotalCount} selectedPagesCount={selectedPagesCount}/>
        </div>
    );
};

export default PacksList;