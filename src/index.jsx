import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import reducer from './reducer';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// our components
import { HomeContainer } from './components/home';
import { DetailContainer } from './components/detail';
import { AddContainer } from './components/add';
import { ProfileContainer } from './components/profile';
// app css
import '../dist/css/style.css';

// Filestack API requires to set a key
filepicker.setKey('A3rDNhEsnR7m2UFeRSIchz');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f // connect to redux devtools
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-white navbar-fixed navbar-fixed-top">
          <div className="container p-y-1">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapsed"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <p className="navbar-brand title">
                <Link to="/">Instagram</Link>
              </p>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/add">Upload</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container m-t-3">
          <BrowserRouter>
            <div>
              <Route exact path="/" component={HomeContainer} />
              <Route path="/detail/:id" component={DetailContainer} />
              <Route path="/add" component={AddContainer} />
              <Route path="/profile/:id" component={ProfileContainer} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
