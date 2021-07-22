import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import Header from './components/header';
import Home from './screens/Home';
import ShoppingCart from './screens/ShoppingCart';
import User from './screens/users/User';
import PrivateRoute from './components/route/PrivateRoute';
import ConfirmScreen from './screens/checkout/Confirm';
import PublicRoute from './components/route/PublicRoute';
import OrderScreen from './screens/orders/OrderScreen';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Switch>
            <PublicRoute exact={true} path={`/`} Component={Home} />
            <PublicRoute exact={true} path={'/usuario'} Component={User} />
            <PublicRoute exact={true} path={'/pedidos'} Component={OrderScreen} />
            <PublicRoute exact={true} path={'/carrinho'} Component={ShoppingCart} />
            <PrivateRoute exact={true} path={`/pedidos/confirmar`} Component={ConfirmScreen} />

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;