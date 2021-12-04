import React from 'react';
import Catalog from '../Catalog/Catalog';
import TopSales from '../TopSales/TopSales';

export default function MainPage() {
    return (
        <>
           <TopSales /> 
           <Catalog search={false} />       
        </>
    )
};
