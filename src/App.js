import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Stage from "./components/Stage";

import './App.css';

function App() {
  return <Router>
    <Route component={Stage} />
  </Router>;
}

export default App;
