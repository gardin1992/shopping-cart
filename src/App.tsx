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

          <div>
            <div>
              <button
                aria-label="Increment value"
                // onClick={() => dispatch(increment())}
              >
                Increment
              </button>
              {/* <span>{count}</span> */}
              <button
                aria-label="Decrement value"
                // onClick={() => dispatch(decrement())}
              >
                Decrement
              </button>
            </div>
          </div>

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