import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSearchText, fetchSearchTextItems } from '../../actions/catalog';
import Loader from '../Loader/Loader';

export default function Search() {
    const { searchText, currentCategory, loading, error } = useSelector(state => state.catalog);
    const dispatch = useDispatch();

    const onInputChange = (evt) => {
        dispatch(addSearchText(evt.target.value));
    };

    const onInputSubmit = async (evt) => {
        evt.preventDefault();
         dispatch(fetchSearchTextItems(searchText, currentCategory, dispatch));
        // fetchSearchTextItems(searchText, currentCategory, dispatch);
    };

    if (loading) {
        return <Loader />;
    };
    if (error) {
        return <p>Something went wrong try again</p>;
    };

    return (
        <form className="catalog-search-form form-inline" onSubmit={onInputSubmit}>
            <input className="form-control" placeholder="Поиск" value={searchText} onChange={onInputChange} />
        </form>
    )
};
