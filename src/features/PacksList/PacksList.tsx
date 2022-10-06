import React, {useEffect, useState} from 'react';
import UniversalTable from '../../common/components/Table/UniversalTable';
import {GridColDef} from '@mui/x-data-grid';
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {getPacksTC} from './pack_reducer';
import {Search} from '../../common/components/Search/Search';
import {RangeSlider} from '../../common/components/RangeSlider/RangeSlider';
import {PacksOwnerSort} from '../../common/components/PacksOwnerSort/PacksOwnerSort';
import {ClearFilters} from '../../common/components/ClearFilters/ClearFilters';
import {Paginator} from '../../common/components/Paginator/Paginator';
import {GridSortDirection, GridSortModel} from '@mui/x-data-grid/models/gridSortModel';
import s from './PacksList.module.css'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {serializeFormQuery} from '../../common/utils/serializeFormQuery';
import {GridInitialStateCommunity} from '@mui/x-data-grid/models/gridStateCommunity';
import {Path} from '../../common/enums/path';
import {PackModal} from '../Modals/PackModal';
import {DeleteModal} from '../Modals/DeleteModal';

const PacksList = () => {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: (params) => (<Link to={`${Path.PackPage}/${params.id}`}>{params.row.name}</Link>)
        },
        {field: 'cardsCount', headerName: 'Cards', flex: 1},
        {field: 'updated', headerName: 'Last updated', flex: 1},
        {field: 'user_name', headerName: 'Created by', flex: 1},
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <IconButton disabled={!params.row.cardsCount} onClick={() => startLearningHandler(params.row._id)}>
                        <SchoolIcon/>
                    </IconButton>
                    {params.row.actions && <>
                        <IconButton
                            onClick={() => openEditPackModal(params.row._id, params.row.name, params.row.private)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => openDeletePackModal(params.row._id, params.row.name)}>
                            <DeleteIcon/>
                        </IconButton>
                    </>}

                </>
            ),
        }

    ];

    const initialModalState = {
        _id: '',
        name: '',
        private: false,
        title: '',
        openAddPackModal: false,
        openEditPackModal: false,
        openDelPackModal: false,
    }
    type ModalStateType = typeof initialModalState

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
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [searchParam, setSearchParam] = useSearchParams({})
    const startParams = serializeFormQuery(searchParam, authId)
    const [params, setParams] = useState<any>(startParams)
    const [modalData, setModalData] = useState<ModalStateType>(initialModalState)

    // Modal logic
    const closeModal = () => {
        setModalData(initialModalState)
    }
    const openEditPackModal = (_id: string, name: string, isPrivate: boolean) => {
        setModalData({...modalData, _id, name, private: isPrivate, title: 'Edit Pack', openEditPackModal: true})
    }
    const openDeletePackModal = (_id: string, name: string) => {
        setModalData({...modalData, _id, name, title: 'Delete Pack', openDelPackModal: true})
    }
    const openAddPackModal = () => {
        setModalData({...modalData, title: 'Add new pack', openAddPackModal: true})
    }

    // Search, filtration, pagination logic
    let selectedPagesCount = params.pageCount

    // set initial sorting state for the table
    let initialState: GridInitialStateCommunity = {}
    if (params.hasOwnProperty('sortPacks')) {

        const field = params.sortPacks.slice(1);
        const sortQuery = params.sortPacks[0];
        let sort: GridSortDirection = null;

        if (sortQuery === '1')
            sort = 'asc'
        if (sortQuery === '0')
            sort = 'desc'

        initialState = {
            sorting: {
                sortModel: [
                    {field, sort}
                ]
            }
        }
    }


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

        if (min === minCardsCount) {
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

    const startLearningHandler = (packId: string) => {
        navigate(`${Path.LearnPage}/${packId}`);
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
                <Button className={s.addBtn}
                        size={'small'}
                        variant={'contained'}
                        onClick={openAddPackModal}
                >Add new pack
                </Button>
            </Grid>

            <div className={`${s.search}`}>
                <Search searchHandler={searchHandler} searchValue={params.packName}/>
                <PacksOwnerSort owner={params.user_id} packsOwnerHandler={packsOwnerHandler}/>
                <RangeSlider minValue={minCardsCount} maxValue={maxCardsCount} currentMin={params.min}
                             currentMax={params.max}
                             rangeSliderHandler={rangeHandler}/>
                <ClearFilters clearHandler={clearFiltersHandler}/>
            </div>

            <UniversalTable
                columns={columns}
                rows={cardPacks}
                pageSize={selectedPagesCount ? +selectedPagesCount : 10}
                loading={loading === 'loading'}
                onSortModelChange={onSortModelChangeHandler}
                initialState={initialState}
            />
            <Paginator changePageHandler={paginationHandler} changePagesCountHandler={pagesCountHandler}
                       currentPage={page} itemsOnPage={pageCount}
                       itemsTotalCount={cardPacksTotalCount} selectedPagesCount={selectedPagesCount}/>
            <PackModal _id={modalData._id}
                       name={modalData.name}
                       isPrivate={modalData.private}
                       title={modalData.title}
                       isOpen={modalData.openAddPackModal || modalData.openEditPackModal}
                       onClose={closeModal}/>
            <DeleteModal _id={modalData._id}
                         name={modalData.name}
                         title={modalData.title}
                         isOpen={modalData.openDelPackModal}
                         onClose={closeModal}/>
        </div>
    );
};

export default PacksList;