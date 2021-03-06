/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryItems, fetchCategories } from '../../actions/categories';
import { setQuery } from '../../lib/query';
import Loader from '../Loader/Loader';

export default function Categories() {
    const { items, loading, error } = useSelector(state => state.categories);
    const categoryId = useSelector(state => state.categories.currentCategory);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handlerClick = (evt, id) => {
        evt.preventDefault();
        navigate({
            pathname: '/catalog',
            search: setQuery(id),
            replace: true
        })
        dispatch(fetchCategoryItems(id));
    };

    const getActiveCat = (id) => {
        if (categoryId === id) {
            return "nav-link active"
        }
        return "nav-link"
    };

    if (loading) {
        return <Loader />;
    };

    if (error) {
        return <p>Something went wrong try again</p>;
    };

    return (
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item" key='All' id='All'>
                <a
                    className={!categoryId ? "nav-link active" : "nav-link"}
                    href="#"
                    onClick={(e => handlerClick(e))}
                >
                    Все
                </a>
            </li>
            {items.map(item =>
                <li className="nav-item" key={item.id}>
                    <a
                        className={getActiveCat(item.id)}
                        href="#"
                        onClick={(e => handlerClick(e, item.id))}
                    >
                        {item.title}
                    </a>
                </li>
            )}
        </ul>
    )
};
