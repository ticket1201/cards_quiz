import React, {useEffect, useState} from 'react';
import {GridColDef} from '@mui/x-data-grid';
import UniversalTable from '../../common/components/Table/UniversalTable';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {getCardsTC} from './cards_reducer';
import {Search} from '../../common/components/Search/Search';
import s from '../PacksList/PacksList.module.css';
import {serializeFormQuery} from '../../common/utils/serializeFormQuery';
import {Paginator} from '../../common/components/Paginator/Paginator';
import {GridInitialStateCommunity} from '@mui/x-data-grid/models/gridStateCommunity';
import {GridSortDirection, GridSortModel} from '@mui/x-data-grid/models/gridSortModel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {CardsMenu} from './CardsMenu/CardsMenu';
import c from './PackPage.module.css'
import {Preloader} from '../../common/components/Preloader/Preloader';
import {Path} from '../../common/enums/path';
import {CardModal} from '../Modals/CardModal';
import {DeleteModal} from '../Modals/DeleteModal';
import {PackModal} from '../Modals/PackModal';
import {BackToPacksList} from '../../common/components/BackToPacksList/BackToPacksList';
import {convertDateFromIso8601} from '../../common/utils/convertDate';
import {commonModalState, CommonModalStateType} from '../Modals/commonTypes';

const PackPage = () => {

    let columns: GridColDef[] = [
        {
            field: 'question',
            headerName: 'Question',
            flex: 1
        },
        {field: 'answer', headerName: 'Answer', flex: 1},
        {
            field: 'updated',
            headerName: 'Last updated',
            flex: 1,
            renderCell: (params) => (convertDateFromIso8601(params.value))
        },
        {
            field: 'grade',
            headerName: 'Grade',
            renderCell: (params) => (
                <Rating name={params.row.id} defaultValue={params.row.grade} precision={0.1} readOnly/>
            ),
            minWidth: 140
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            minWidth: 100,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => openEditCardModal(params.row._id, params.row.question, params.row.answer, params.row.questionImg, params.row.answerImg)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => openDeleteCardModal(params.row._id, params.row.question)}>
                        <DeleteIcon/>
                    </IconButton>
                </>
            )
        }
    ];

    const isPackToggled = useAppSelector(state => state.packs.isToggled)
    const {
        cards,
        page,
        pageCount,
        cardsTotalCount,
        isToggled,
        packUserId,
        packName,
        packPrivate,
        packDeckCover
    } = useAppSelector(state => state.cards)
    const loading = useAppSelector(state => state.app.status)
    const authId = useAppSelector(state => state.auth._id)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {packId} = useParams()
    const [searchParam, setSearchParam] = useSearchParams({})
    const startParams = serializeFormQuery(searchParam)
    const [params, setParams] = useState<any>(startParams)
    const [modalData, setModalData] = useState<CommonModalStateType>(commonModalState)

    const isOwner = authId === packUserId
    let renderColumns = columns
    if (!isOwner) {
        renderColumns = columns.filter(e => e.field !== 'actions')
    }

    // Modal logic
    const closeModal = () => {
        setModalData(commonModalState)
    }
    const openEditCardModal = (_id: string, question: string, answer: string, questionURL: string, answerURL: string) => {
        setModalData({
            ...modalData,
            _id,
            question,
            answer,
            questionURL,
            answerURL,
            title: 'Edit card',
            openEditCardModal: true
        })
    }
    const openDeleteCardModal = (_id: string, question: string) => {
        setModalData({...modalData, _id, question, title: 'Delete Card', openDelCardModal: true})
    }
    const openAddCardModal = () => {
        packId && setModalData({...modalData, cardsPack_id: packId, title: 'Add new pack', openAddCardModal: true})
    }
    const openEditPackModal = () => {
        packId && setModalData({
            ...modalData,
            _id: packId,
            name: packName,
            private: packPrivate,
            packCover: packDeckCover,
            title: 'Edit Pack',
            openEditPackModal: true
        })
    }
    const openDeletePackModal = () => {
        packId && setModalData({
            ...modalData,
            _id: packId,
            name: packName,
            title: 'Delete Pack',
            openDelPackModal: true
        })
    }

    // Search, filtration, pagination logic
    let selectedPagesCount = params.pageCount

    // set initial sorting state for the table
    let initialState: GridInitialStateCommunity = {}
    if (params.hasOwnProperty('sortCards')) {

        const field = params.sortCards.slice(1);
        const sortQuery = params.sortCards[0];
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
            const {sortCards, ...restParams} = params
            setParams(restParams)
            return
        }

        setParams({...params, sortCards: sortQuery})
    }

    const searchHandler = (value: string) => {
        if (!value) {
            const {cardQuestion, ...restParams} = params
            setParams(restParams)
            return
        }
        setParams({...params, cardQuestion: value})
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

    const startLearningHandler = () => {
        navigate(`${Path.LearnPage}/${packId}`, {state: 'packPage'});
    }

    const ownerBar = isOwner
        ? <div className={c.ownerBar}><h2>{packName}</h2>
            <CardsMenu isDisabled={!cardsTotalCount}
                       editPackCallback={openEditPackModal}
                       deletePackCallback={openDeletePackModal}
                       learnPackCallback={startLearningHandler}/></div>
        : <div><h2>{packName}</h2></div>

    useEffect(() => {
        setSearchParam(params)

        let id = setTimeout(() => {
            const sendParams = {
                ...params,
                pageCount: selectedPagesCount ? +selectedPagesCount : 10,
                cardsPack_id: packId
            }

            dispatch(getCardsTC(sendParams))
        }, 600)
        return () => clearTimeout(id)
    }, [dispatch, params, isToggled, isPackToggled, selectedPagesCount, setSearchParam, packId])

    if (!packUserId)
        return <Preloader/>

    return (
        <div className={`content-wrapper ${s.content}`} style={{paddingTop: '50px'}}>
            <div className={c.backToPacks}>
                <BackToPacksList fromCards/>
            </div>
            {cardsTotalCount
                ? <>
                    <Grid flexDirection={'row'} justifyContent={'space-between'} className={s.title}>
                        {ownerBar}
                        <Button
                            className={s.addBtn}
                            size={'small'}
                            variant={'contained'}
                            disabled={loading === 'loading'}
                            onClick={isOwner ? openAddCardModal : startLearningHandler}
                        >
                            {isOwner ? 'Add new card' : 'Learn pack'}
                        </Button>
                    </Grid>
                    <Search isFullWidth={true} searchValue={params.cardQuestion} searchHandler={searchHandler}/>
                    <UniversalTable
                        columns={renderColumns}
                        rows={cards}
                        pageSize={selectedPagesCount ? +selectedPagesCount : 10}
                        loading={loading === 'loading'}
                        onSortModelChange={onSortModelChangeHandler}
                        initialState={initialState}
                    />
                    <Paginator changePageHandler={paginationHandler} changePagesCountHandler={pagesCountHandler}
                               currentPage={page} itemsOnPage={pageCount}
                               itemsTotalCount={cardsTotalCount} selectedPagesCount={selectedPagesCount}/>
                </>
                : <>
                    <Grid flexDirection={'row'} justifyContent={'space-between'} className={s.title}>
                        {ownerBar}
                    </Grid>
                    <div className={c.tempWrapper}>
                        <div className={c.text}>This pack is empty. Click add new card to fill this pack</div>
                        <div><Button
                            className={s.addBtn}
                            size={'small'}
                            variant={'contained'}
                            disabled={loading === 'loading'}
                            onClick={openAddCardModal}> Add new card
                        </Button></div>
                    </div>
                </>}
            <CardModal
                data={modalData}
                isOpen={!!(modalData.openAddCardModal || modalData.openEditCardModal)}
                onClose={closeModal}/>
            <DeleteModal
                data={modalData}
                isOpen={!!(modalData.openDelCardModal || modalData.openDelPackModal)}
                onClose={closeModal}/>
            <PackModal
                data={modalData}
                isOpen={!!modalData.openEditPackModal}
                onClose={closeModal}/>
        </div>
    );
};

export default PackPage;