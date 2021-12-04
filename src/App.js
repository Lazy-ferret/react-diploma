import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './components/AboutPage/AboutPage';
import Banner from './components/Banner/Banner';
import CatalogPage from './components/CatalogPage/CatalogPage';
import CartPage from './components/CartPage/CartPage';
import ContactsPage from './components/ContactsPage/ContactsPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Item from './components/Item/Item';
import Layout from './components/Layout/Layout';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Layout>
          <Banner />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/catalog' element={<CatalogPage />} />
            <Route path='/catalog/:id' element={<Item />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contacts' element={<ContactsPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Layout>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
