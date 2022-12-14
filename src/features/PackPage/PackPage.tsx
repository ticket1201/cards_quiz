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
import {Paginator} from '../../common/components/Paginator/Paginator';
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
import {convertObjectToSearchParam} from "../../common/utils/convertObjectToSearchParam";
import {pageCountDefault} from "../SearchBar/search-constants";
import {serializeFormQuery} from "../../common/utils/serializeFormQuery";
import {
    searchCardsByQuestionAC,
    selectSearchCardParams,
    setCardAllAC,
    setCardPageAC,
    setCardPageCountAC
} from "./card-search-reducer";

const PackPage = () => {

    let columns: GridColDef[] = [
        {
            field: 'question',
            headerName: 'Question',
            flex: 1,
            renderCell: (params) => (params.row.questionImg
                    ? <img className={c.imageQA} src={params.row.questionImg}
                           alt={'deck cover'}/>
                    : params.row.question
            )
        },
        {
            field: 'answer',
            headerName: 'Answer',
            flex: 1,
            renderCell: (params) => (params.row.answerImg
                    ? <img className={c.imageQA} src={params.row.answerImg} alt={'deck cover'}/>
                    : params.row.answer
            )
        },
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

    const [modalData, setModalData] = useState<CommonModalStateType>(commonModalState)

    const myOwnSearchParams = useAppSelector(selectSearchCardParams)
    const myQuerySearchParams = convertObjectToSearchParam(myOwnSearchParams)

    const [searchParam, setSearchParam] = useSearchParams()

    const isOwner = authId === packUserId
    const someFilters = Object.keys(myQuerySearchParams).length > 0

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
    let selectedPagesCount = myOwnSearchParams.pageCount ?? pageCountDefault

    const searchHandler = (value: string) => {
        dispatch(searchCardsByQuestionAC(value))
    }

    const paginationHandler = (currentPage: number) => {
        dispatch(setCardPageAC(currentPage))
    }

    const pagesCountHandler = (newPageCount: string) => {
        dispatch(setCardPageCountAC(+newPageCount))
    }

    const startLearningHandler = () => {
        navigate(`${Path.LearnPage}/${packId}`);
    }

    const ownerBar = isOwner
        ? <div className={c.ownerBar}><h2>{packName}</h2>
            <CardsMenu isDisabled={!cardsTotalCount}
                       editPackCallback={openEditPackModal}
                       deletePackCallback={openDeletePackModal}
                       learnPackCallback={startLearningHandler}/></div>
        : <div><h2>{packName}</h2></div>

    useEffect(() => {
        setSearchParam(myQuerySearchParams)

        let id = setTimeout(() => {
            const sendParams = {
                ...myQuerySearchParams,
                pageCount: selectedPagesCount,
                cardsPack_id: packId ?? ''
            }

            dispatch(getCardsTC(sendParams))
        }, 1000)
        return () => clearTimeout(id)
    }, [dispatch, myOwnSearchParams, isToggled, isPackToggled, selectedPagesCount, setSearchParam, packId])

    // just to delete search parameters
    useEffect(() => {
        const params = serializeFormQuery(searchParam)
        dispatch(setCardAllAC(params))

        /*return () => {
            dispatch(clearCardSearchFiltersAC())
        }*/
    }, [])

    if (!packUserId)
        return <Preloader/>

    return (
        <div className={`content-wrapper ${s.content} ${c.content}`}>
            <div className={c.backToPacks}>
                <BackToPacksList/>
            </div>
            {cardsTotalCount || someFilters || !isOwner
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
                    {packDeckCover && <img className={c.packDeckCover} src={packDeckCover} alt={'deck cover'}/>}
                    <Search isFullWidth={true} searchValue={myOwnSearchParams.cardQuestion}
                            searchHandler={searchHandler}/>
                    <UniversalTable
                        columns={renderColumns}
                        rows={cards}
                        pageSize={+selectedPagesCount}
                        loading={loading === 'loading'}
                        sortParam={myOwnSearchParams.sortCards}
                        sortName={'sortCards'}
                    />
                    <Paginator changePageHandler={paginationHandler} changePagesCountHandler={pagesCountHandler}
                               currentPage={page} itemsOnPage={pageCount}
                               itemsTotalCount={cardsTotalCount} selectedPagesCount={String(selectedPagesCount)}/>
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