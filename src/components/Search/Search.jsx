import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchSearchTextItems } from '../../actions/catalog';
import { getQuery, setQuery } from '../../lib/query';
import Loader from '../Loader/Loader';

export default function Search() {
    const { currentCategory, loading, error } = useSelector(state => state.catalog);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const id = getQuery(searchParams).categoryId
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setSearchText(getQuery(searchParams).q)
    }, [searchParams]);

    const onInputChange = (evt) => {
        setSearchText(evt.target.value);

    };

    const onInputSubmit = async (evt) => {
        evt.preventDefault();
        navigate({
            pathname: '/catalog',
            search: setQuery(id, searchText),
            replace: true
        })
        dispatch(fetchSearchTextItems(searchText, currentCategory));
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
