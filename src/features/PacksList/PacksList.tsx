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

const PacksList = () => {
    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'cardsCount', headerName: 'Cards', flex: 1},
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

    ];

    const onUpdateHandler = (_id:string) => {
        dispatch(updatePackTC({_id, name: `updated ${Math.random() * 10}`}))
    }
    const onDeleteHandler = (_id:string) => {
        dispatch(deletePackTC(_id))
    }

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
    const loading = useAppSelector(state => state.app.status)
    const [searchParam, setSearchParam] = useSearchParams({})
    const startParams = serializeFormQuery(searchParam, authId)
    const [params, setParams] = useState<any>(startParams)


    let selectedPagesCount = params.pageCount

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
                <Search isFullWidth={true} searchHandler={searchHandler} searchValue={params.packName}/>
                <PacksOwnerSort owner={params.user_id} packsOwnerHandler={packsOwnerHandler}/>
                <RangeSlider minValue={minCardsCount} maxValue={maxCardsCount} currentMin={params.min} currentMax={params.max}
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