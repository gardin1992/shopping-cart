import React from 'react';
import {
  BrowserRouter as Router,
  Route,
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


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact={true} path={`/`} component={Home} />
            <Route exact={true} path={'/usuario'} component={User} />
            <Route exact={true} path={'/carrinho'} component={ShoppingCart} />
            <PrivateRoute exact={true} path={`/checkout/confirmar`} Component={ConfirmScreen} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;