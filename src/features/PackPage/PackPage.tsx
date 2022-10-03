import React, {useEffect, useState} from 'react';
import {GridColDef} from '@mui/x-data-grid';
import UniversalTable from '../../common/components/Table/UniversalTable';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {useParams, useSearchParams} from 'react-router-dom';
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


let columns: GridColDef[] = [
    {
        field: 'question',
        headerName: 'Question',
        /*renderHeader: () => (
            <strong>
                {'Birthday '}
                <span role="img" aria-label="enjoy">
          🎂
        </span>
            </strong>
        ),*/
        flex: 1
    },
    {field: 'answer', headerName: 'Answer', flex: 1},
    {field: 'lastUpdated', headerName: 'Last updated', flex: 1},
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
        renderCell: () => (
            <>
                <IconButton>
                    <EditIcon/>
                </IconButton>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </>
        )
    }
];

/*const rows = [
    {id: '1', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 2.3},
    {id: '2', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4},
    {id: '3', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 0.2},
    {id: '4', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4.5},
    {id: '5', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 5},
    {id: '6', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 3.2},
    {id: '7', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4},
];*/
const PackPage = () => {

    const {cards, page, pageCount, cardsTotalCount, isToggled, packUserId} = useAppSelector(state => state.cards)
    const loading = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const authId = useAppSelector(state => state.auth._id)


    // const isOwner = authId === packUserId
    const isOwner = true
    if (!isOwner) {
        columns = columns.filter(e => e.field !== 'actions')
    }


    const {packId} = useParams()
    const [searchParam, setSearchParam] = useSearchParams({})
    const startParams = serializeFormQuery(searchParam)
    const [params, setParams] = useState<any>(startParams)

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
    }, [dispatch, params, isToggled, selectedPagesCount, setSearchParam, packId])

    const ownerBar = isOwner
        ? <div className={c.ownerBar}><h2>My Pack</h2> <CardsMenu/></div>
        : <div><h2>Friend's Pack</h2></div>

    return (
        <div className={`content-wrapper ${s.content}`}>
            <Grid flexDirection={'row'} justifyContent={'space-between'} className={s.title}>
                {ownerBar}
                <Button className={s.addBtn} size={'small'} variant={'contained'}
                        onClick={() => {
                        }}>{isOwner ? 'Add new card' : 'Learn pack'}</Button>
            </Grid>
            <Search isFullWidth={true} searchValue={params.cardQuestion} searchHandler={searchHandler}/>
            <UniversalTable
                columns={columns}
                rows={cards}
                pageSize={selectedPagesCount ? +selectedPagesCount : 10}
                loading={loading === 'loading'}
                onSortModelChange={onSortModelChangeHandler}
                initialState={initialState}
            />
            {/*<UniversalTable columns={columns} rows={cards} pageSize={10}/>*/}
            <Paginator changePageHandler={paginationHandler} changePagesCountHandler={pagesCountHandler}
                       currentPage={page} itemsOnPage={pageCount}
                       itemsTotalCount={cardsTotalCount} selectedPagesCount={selectedPagesCount}/>
        </div>
    );
};

export default PackPage;
