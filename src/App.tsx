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


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact={true} path={`/`} component={Home} />
            <Route exact={true} path={'/carrinho'} component={ShoppingCart} />
            <Route exact={true} path={'/usuario'} component={User} />

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;