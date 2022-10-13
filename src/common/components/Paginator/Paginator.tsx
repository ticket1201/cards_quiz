import React from 'react';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import s from './Paginator.module.css'
import {pageCountDefault} from "../../../features/SearchBar/search-constants";

type PaginatorPropsType = {
    currentPage: number
    itemsOnPage: number
    itemsTotalCount: number
    selectedPagesCount: string
    changePageHandler: (page: number) => void
    changePagesCountHandler: (pagesCount: string) => void
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            currentPage,
                                                            itemsOnPage,
                                                            itemsTotalCount,
                                                            selectedPagesCount,
                                                            changePageHandler,
                                                            changePagesCountHandler
                                                        }) => {
    const pagesCount = itemsOnPage ? Math.ceil(itemsTotalCount / itemsOnPage) : 0

    const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
        changePageHandler(value)
    }

    const changeSelect = (event: SelectChangeEvent) => {
        changePagesCountHandler(event.target.value)
    }
    return (
        <div className={s.container}>
            <Pagination count={pagesCount}
                        page={currentPage}
                        onChange={changePage}
                        shape="rounded"
                        color="primary"
                        showFirstButton
                        showLastButton/>
            <div>
                <span className={s.text}>Show</span>
                <Select
                    autoWidth
                    size="small"
                    value={selectedPagesCount ? selectedPagesCount : pageCountDefault.toString()}
                    // value={selectedPagesCount}
                    onChange={changeSelect}>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
                <span className={s.text}>Cards per Page</span>
            </div>
        </div>
    );
};