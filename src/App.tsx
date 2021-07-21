import React from 'react';
import Header from './components/header';
import Home from './screens/Home';
import ShoppingCart from './screens/ShoppingCart';

interface User {
  name: string;
  id: number;
}

// const product: IProduct = new Product("Murphy", 1);


function App() {


  return (
    <div>
      <Header />
      <Home />
      <ShoppingCart />
    </div>
  );
}

export default App;