import React from 'react';
import Layout from './views/Layout'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import store from './redux'

function App() {
  return (
    <Router>
      <Route path="/" component={Layout}>
      </Route>
    </Router>
    
  );
}

export default App;
