import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { nanoid } from 'nanoid';

import Order from '../Order/Order';
import './CartPage.css';
import { deleteProduct } from '../../actions/cart';

export default function CartPage() {
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const cartSum = () => {
        let currentSum = 0;
        cart.forEach((item) => {
            currentSum = Number(currentSum) + (+item.price * +item.quantity)
        });
        return currentSum
    }

    const onDeleteClick = (id) => {
        dispatch(deleteProduct(id))
    };

    return (
        <>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart && cart.length
                            ? cart.map((item, index) => (
                                <tr key={nanoid()}>
                                    <th scope="row">{index + 1}</th>
                                    <td><NavLink to={`/catalog/${item.id}`}>{item.title}</NavLink></td>
                                    <td>{item.size}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price} руб.</td>
                                    <td>{item.price * item.quantity} руб.</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => onDeleteClick(item.id)}
                                        >Удалить</button>
                                    </td>
                                </tr>
                            ))
                            : (<tr>
                                <td colSpan="7" className="text-center">В корзине еще нет товаров</td>
                            </tr>)
                        }
                        {cart && cart.length
                            ? <tr>
                                <td colSpan="5" className="text-right">Общая стоимость</td>
                                <td>{cartSum()} руб.</td>
                            </tr>
                            : null
                        }
                    </tbody>
                </table>
            </section>
            <Order />
        </>
    )
};
