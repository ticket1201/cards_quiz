import React, {useEffect, useState} from 'react';
import UniversalTable from '../../common/components/Table/UniversalTable';
import {GridColDef} from '@mui/x-data-grid';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {getPacksTC} from './pack_reducer';
import {Search} from '../../common/components/Search/Search';
import {RangeSlider} from '../../common/components/RangeSlider/RangeSlider';
import {PacksOwnerSort} from '../../common/components/PacksOwnerSort/PacksOwnerSort';
import {ClearFilters} from '../../common/components/ClearFilters/ClearFilters';
import {Paginator} from '../../common/components/Paginator/Paginator';
import s from './PacksList.module.css'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Path} from '../../common/enums/path';
import {PackModal} from '../Modals/PackModal';
import {DeleteModal} from '../Modals/DeleteModal';
import {convertDateFromIso8601} from '../../common/utils/convertDate';
import {commonModalState, CommonModalStateType} from '../Modals/commonTypes';
import {
    clearSearchFiltersAC, getSearchParams, pageCountDefault,
    searchByRangeAC,
    searchPacksByNameAC,
    searchPacksByOwnerAC, setPageAC, setPageCountAC
} from "../SearchBar/search-reducer";
import {convertObjectToSearchParam} from "../../common/utils/convertObjectToSearchParam";


const PacksList = () => {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: (params) => (params.row.cardsCount || params.row.user_id === authId ?
                <Link className={s.link}
                      to={`${Path.PackPage}/${params.id}`}>{params.row.name}</Link> : params.row.name)
        },
        {field: 'cardsCount', headerName: 'Cards', flex: 1},
        {
            field: 'updated',
            headerName: 'Last updated',
            flex: 1,
            renderCell: (params) => (convertDateFromIso8601(params.value))
        },
        {field: 'user_name', headerName: 'Created by', flex: 1},
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            minWidth: 150,
            renderCell: (params) => (
                <>
                    <IconButton disabled={!params.row.cardsCount} onClick={() => startLearningHandler(params.row._id)}>
                        <SchoolOutlinedIcon/>
                    </IconButton>
                    {params.row.actions && <>
                        <IconButton
                            onClick={() => openEditPackModal(params.row._id, params.row.name, params.row.private, params.row.deckCover
                            )}>
                            <EditOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={() => openDeletePackModal(params.row._id, params.row.name)}>
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </>}

                </>
            ),
        }

    ];


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


    const [modalData, setModalData] = useState<CommonModalStateType>(commonModalState)

    const myOwnSearchParams = useAppSelector(getSearchParams)
    const myQuerySearchParams = convertObjectToSearchParam(myOwnSearchParams)
    const [searchParam, setSearchParam] = useSearchParams(myQuerySearchParams)

    // Modal logic
    const closeModal = () => {
        setModalData(commonModalState)
    }
    const openEditPackModal = (_id: string, name: string, isPrivate: boolean, packCover: string) => {
        setModalData({
            ...modalData,
            _id,
            name,
            private: isPrivate,
            packCover,
            title: 'Edit Pack',
            openEditPackModal: true
        })
    }
    const openDeletePackModal = (_id: string, name: string) => {
        setModalData({...modalData, _id, name, title: 'Delete Pack', openDelPackModal: true})
    }
    const openAddPackModal = () => {
        setModalData({...modalData, title: 'Add new pack', openAddPackModal: true})
    }

    const startLearningHandler = (packId: string) => {
        navigate(`${Path.LearnPage}/${packId}`, {state: 'packsList'});
    }


    // Search, filtration, pagination logic
    let selectedPagesCount = myOwnSearchParams.pageCount ?? pageCountDefault

    const searchHandler = (value: string) => {
        dispatch(searchPacksByNameAC(value))
    }

    const rangeHandler = (min: number, max: number) => {
        dispatch(searchByRangeAC(min, max, minCardsCount, maxCardsCount))
    }

    const packsOwnerHandler = (user_id: string) => {
        dispatch(searchPacksByOwnerAC(user_id))
    }

    const clearFiltersHandler = () => {
        dispatch(clearSearchFiltersAC())
    }

    const paginationHandler = (currentPage: number) => {
        dispatch(setPageAC(currentPage))
    }

    const pagesCountHandler = (newPageCount: string) => {
        dispatch(setPageCountAC(+newPageCount))
    }

    useEffect(() => {
        setSearchParam(myQuerySearchParams)

        let id = setTimeout(() => {
            let sendParams: {}
            sendParams = {...myQuerySearchParams, pageCount: selectedPagesCount}
            if (sendParams.hasOwnProperty('user_id')) {
                sendParams = {...sendParams, ['user_id']: authId}
            }
            dispatch(getPacksTC(sendParams))
        }, 1000)
        return () => {
            clearTimeout(id)
            // dispatch(clearSearchFiltersAC())
        }
    }, [dispatch, myOwnSearchParams, isToggled, selectedPagesCount, setSearchParam, authId])

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
                <Search searchHandler={searchHandler} searchValue={myOwnSearchParams.packName}/>
                <PacksOwnerSort owner={myOwnSearchParams.user_id} packsOwnerHandler={packsOwnerHandler}/>
                <RangeSlider minValue={minCardsCount} maxValue={maxCardsCount} currentMin={myOwnSearchParams.min}
                             currentMax={myOwnSearchParams.max}
                             rangeSliderHandler={rangeHandler}/>
                <ClearFilters clearHandler={clearFiltersHandler}/>
            </div>

            <UniversalTable
                columns={columns}
                rows={cardPacks}
                pageSize={selectedPagesCount}
                loading={loading === 'loading'}
                sortParam={myOwnSearchParams.sortPacks}
                sortName={'sortPacks'}
            />
            <Paginator changePageHandler={paginationHandler} changePagesCountHandler={pagesCountHandler}
                       currentPage={page} itemsOnPage={pageCount}
                       itemsTotalCount={cardPacksTotalCount} selectedPagesCount={String(selectedPagesCount)}/>
            <PackModal
                data={modalData}
                isOpen={!!(modalData.openAddPackModal || modalData.openEditPackModal)}
                onClose={closeModal}/>
            <DeleteModal
                data={modalData}
                isOpen={!!modalData.openDelPackModal}
                onClose={closeModal}/>
        </div>
    );
};

export default PacksList;