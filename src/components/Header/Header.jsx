import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchTextItems } from '../../actions/catalog';
import logo from "../../img/header-logo.png";
import { setQuery } from '../../lib/query';

export default function Header() {
    const { currentCategory } = useSelector(state => state.catalog);
    const cart = useSelector(state => state.cart.cart);
    const categoryId = useSelector(state => state.categories.currentCategory);

    const [visible, setVisible] = useState(false);
    const [searchingText, setSearchingText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const invisibleClassName = "header-controls-search-form form-inline invisible";
    const visibleClassName = "header-controls-search-form form-inline";

    const handlerHeaderSearch = async (evt) => {
        evt.preventDefault();
        if (!searchingText) {
            setVisible(!visible);
        } else {
            navigate({
                pathname: '/catalog',
                search: setQuery(categoryId, searchingText),
                replace: true
            })
            dispatch(fetchSearchTextItems(searchingText, currentCategory));
            setVisible(false);
            setSearchingText('')
        }
    };

    const onInputChange = (evt) => {
        setSearchingText(evt.target.value);
    };

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Bosa Noga" />
                        </Link>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">??????????????</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/catalog" className="nav-link">??????????????</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link">?? ????????????????</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to="/contacts" className="nav-link">????????????????</Link>
                                </li>
                            </ul>
                            <div className="header-controls-pics">
                                <div data-id="search-expander"
                                    className="header-controls-pic header-controls-search"
                                    onClick={handlerHeaderSearch}
                                >
                                </div>
                                <Link to="/cart" className="header-controls-pic header-controls-cart">
                                    {cart && cart.length !== 0 ? <div className="header-controls-cart-full">{cart.length}</div> : null}
                                    <div className="header-controls-cart-menu"></div>
                                </Link>
                                <form data-id="search-form"
                                    className={visible ? visibleClassName : invisibleClassName}
                                    onSubmit={handlerHeaderSearch}>
                                    <input className="form-control" placeholder="??????????" onChange={onInputChange} value={searchingText} />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
};
