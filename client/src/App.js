import React, { Component } from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import { store } from './configureStore';
import { StatsTable, RefreshBar, loadCachedTickerStart, loadCachedProfileInfoStart } from './stats';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadCachedTickerStart());
    store.dispatch(loadCachedProfileInfoStart());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <RefreshBar />
          <StatsTable />
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
