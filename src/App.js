import { hot } from "react-hot-loader/root";
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import {withRouter} from 'react-router-dom';
import Globe from './Globe'
import AddPointForm from './AddPointForm'
import Backend from './Backend'
const history = createBrowserHistory();

function App() {
  return (
    <div>
      <BrowserRouter history={history}>
        <Switch>
        <Route exact path="/" component={Globe}></Route>
        <Route path="/backend" component={Backend}></Route>
        <Route path="/addpoint" component={AddPointForm}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default hot(App);
