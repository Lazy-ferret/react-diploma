import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addOrderPhone,
    addOrderAddress,
    addOrderAgreement,
    postOrder,
    initOrder
} from '../../actions/actionCreators';
import Loader from '../Loader/Loader';
import './Order.css';

export default function Order() {
    const order = useSelector(state => state.order);
    const cart = useSelector(state => state.cart.cart.storageItems);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initOrder())
    }, [dispatch]);

    const onPhoneChange = (evt) => {
        const { id, value } = evt.target;
        dispatch(addOrderPhone(id, value));
    };

    const onAddressChange = (evt) => {
        const { id, value } = evt.target;
        dispatch(addOrderAddress(id, value));
    };

    const onAgreementChange = (evt) => {
        const { id } = evt.target;
        const status = evt.target.checked;
        dispatch(addOrderAgreement(id, status));
    };

    const onOrderSubmit = (evt) => {
        evt.preventDefault();
        if (cart) {
            const currentOrder = {
                "owner": {
                    "phone": order.phone,
                    "address": order.address
                },
                "items": cart.map((item) => ({
                    "id": item.id,
                    "price": item.price,
                    "count": item.quantity,
                }))
            };
            dispatch(postOrder(currentOrder));
        }
    };

    if (order.loading) {
        return <Loader />;
    };
    if (order.error) {
        return <p>Something went wrong try again</p>;
    };

    return (
        <section className="order">
            {order.ordered
                ? <h2 className="text-center">Заказ успешно оформлен</h2>
                : <h2 className="text-center">Оформить заказ</h2>
            }
            {order.ordered
                ? null
                : <div className="card" >
                    <form className="card-body" onSubmit={onOrderSubmit}>
                        <div className="form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input
                                className="form-control"
                                id="phone"
                                placeholder="Ваш телефон"
                                onChange={onPhoneChange}
                                value={order.phone}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input
                                className="form-control"
                                id="address"
                                placeholder="Адрес доставки"
                                onChange={onAddressChange}
                                value={order.address}
                                required
                            />
                        </div>
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="agreement"
                                checked={order.agreement}
                                onChange={onAgreementChange}
                                required
                            />
                            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary" >Оформить</button>
                    </form>
                </div>}
        </section>
    )
};
