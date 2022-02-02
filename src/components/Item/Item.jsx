import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import {
    addItemSize,
    deleteItemSize,
    fetchItem,
    changeItemQuantity
} from '../../actions/item';
import { addProduct } from '../../actions/cart';
import Loader from '../Loader/Loader';

export default function Item() { 
    const { item, loading, error, size } = useSelector(state => state.item);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const img = item.images && item.images[0];
    const minQuantity = 1;
    const maxQuantity = 10;

    useEffect(() => {
        dispatch(changeItemQuantity(quantity));
    }, [dispatch, quantity]);

    useEffect(() => {
        dispatch(fetchItem(id));
    }, [dispatch, id]);

    const onSizeClick = (e) => {
        if (!size) {
            dispatch(addItemSize(e));
        } else {
            dispatch(deleteItemSize());
        }
    };

    const onIncreaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const onDecreaseQuantity = (e) => {
        if (quantity > minQuantity) {
            setQuantity(quantity - 1);
        }
    };

    const onCartBtnClick = () => {
        const cartObject = {
            id: item.id,
            title: item.title,
            size: size,
            quantity: quantity,
            price: item.price
        };
        dispatch(addProduct(cartObject))
        navigate('/cart');
    };

    if (loading) {
        return <Loader />;
    };
    if (error) {
        return <p>Something went wrong try again</p>;
    };

    return (   
       <section className="catalog-item">
            <h2 className="text-center">{item.title ? item.title : ''}</h2>
            <div className="row">
                <div className="col-5">
                    <img src={img}
                        className="img-fluid"
                        alt={item.title}
                        onError={(e) => {
                            e.target.error = null;
                            e.target.src = 'https://via.placeholder.com/420x320/fff/000?text=No image'
                        }}
                    />
                </div>
                <div className="col-7">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{item.sku ? item.sku : ''}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{item.manufacturer ? item.manufacturer : ''}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{item.color ? item.color : ''}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{item.material ? item.material : ''}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{item.season ? item.season : ''}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{item.reason ? item.reason : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <p>Размеры в наличии:{
                            item.sizes
                                ? item.sizes.filter(el => el.avalible)
                                    .map((el) => (
                                        <span
                                            key={el.size}
                                            className={size === el.size ? "catalog-item-size selected" : "catalog-item-size"}
                                            onClick={() => onSizeClick(el.size)}
                                        >
                                            {el.size}
                                        </span>
                                    ))
                                : null}
                        </p>
                        {item.sizes && item.sizes.filter(el => el.avalible) &&
                            <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                <button className="btn btn-secondary" onClick={onDecreaseQuantity}>-</button>
                                <span className="btn btn-outline-primary">{quantity}</span>
                                <button className="btn btn-secondary" onClick={onIncreaseQuantity}>+</button>
                            </span>
                            </p>
                        }
                    </div>
                    {item.sizes && item.sizes.filter(el => el.avalible) &&
                        < button
                            className={size ? "btn btn-danger btn-block btn-lg" : "btn btn-danger btn-block btn-lg disabled"}
                            onClick={onCartBtnClick}
                        >
                            В корзину
                        </button>}                       
                </div>
            </div>
        </section>
    )
};
