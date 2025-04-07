import './App.css';
// import { ReactDOM } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Pages/layout';
import HomePage from './Pages/home';
import FourOhFour from './Pages/fourohfour';

import AllCategories from './Components/all_categories';
import ProductsCategory from './Components/products_category';
import AllStatus from './Components/all_status_orders';
import AllCustomers from './Components/all_customers';
import SingleCustomer from './Components/single_customer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />

          <Route path="/categories" element={<AllCategories />} />
          <Route path="/products/:categorycode" element={<ProductsCategory />} />

          <Route path="/orders-status" element={<AllStatus />} />

          <Route path="/customers" element={<AllCustomers />} />
          <Route path="/customers/:customerid" element={<SingleCustomer />} />

          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
