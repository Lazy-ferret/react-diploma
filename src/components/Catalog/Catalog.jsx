import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCatalog, fetchLoadMore } from '../../actions/catalog';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';

export default function Catalog({ search }) {
    const { items, loading, error } = useSelector(state => state.catalog);
    const categoryId = useSelector(state => state.categories.currentCategory);
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetchCatalog(dispatch);
    }, [dispatch]);

    const handlerClick = (evt, id) => {
        evt.preventDefault();
        fetchLoadMore(id, dispatch);
    };

    if (loading) {
        return <Loader />;
    };
    if (error) {
        return <p>Something went wrong try again</p>;
    };

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {search ? <Search /> : null}
            <Categories />
            <div className="row mb-4">
                {items.map(item =>
                    <div className="col-4" key={item.id}>
                        <div className="card catalog-item-card">
                            <img src={item.images[0]}
                                className="card-img-top img-fluid"
                                alt={item.title}
                                onError={(e) => {
                                    e.target.error = null;
                                    e.target.src = 'https://via.placeholder.com/420x320/fff/000?text=No image'
                                }} />
                            <div className="card-body">
                                <p className="card-text">{item.title}</p>
                                <p className="card-text">{item.price}</p>
                                <NavLink to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="text-center">
                {items.length < 6
                    ? null
                    : <button className="btn btn-outline-primary" onClick={(e => handlerClick(e, categoryId))}>
                        Загрузить ещё
                    </button>}
            </div>
        </section>
    )
};
