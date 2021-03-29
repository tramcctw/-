import React from 'react';
import Layout from './views/Layout'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import store from './redux'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={Layout}>
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
