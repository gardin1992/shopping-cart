import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Header from './components/header';
import Home from './screens/Home';
import ShoppingCart from './screens/ShoppingCart';

import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact={true} path={`/`}>
              <Home />
            </Route>
            <Route path={'/carrinho'}>
              <ShoppingCart />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;