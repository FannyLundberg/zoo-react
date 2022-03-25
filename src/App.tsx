import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';

function App() {
  return (
    <React.Fragment>
      <header>
        <h1>Welcome to The Zoo</h1>
      </header>
      <main>
        <Home></Home>
      </main>
      <footer>©</footer>
    </React.Fragment>
  );
}

export default App;
