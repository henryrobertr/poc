import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home.js';
import ProductDetails from './Productdetails.js';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route> 
            <Route exact path="/productdetails/:productId/:pageId/:pKey">
              <ProductDetails />
            </Route> 
          </Switch>
        </BrowserRouter> 
    </React.Fragment>
  );
}

export default App;
