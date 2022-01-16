import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchTopSales } from '../../actions/topSales';
import Loader from '../Loader/Loader';

export default function TopSales() {
    const { items, loading, error } = useSelector(state => state.topSales);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTopSales(dispatch);
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    };
    if (error) {
        return <p>Something went wrong try again</p>;
    };

    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                {items.map(item =>
                    <div className="col-4" key={item.id}>
                        <div className="card">
                            <img src={item.images[0]}
                                className="card-img-top img-fluid" alt={item.tittle} />
                            <div className="card-body">
                                <p className="card-text">{item.title}</p>
                                <p className="card-text">{item.price}</p>
                                <NavLink to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
};
