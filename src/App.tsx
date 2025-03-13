import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav } from 'react-bootstrap';
import NavB from './components/Nav';
import { BookConsole } from './components/BookConsole';

function App() {
  return (
    <>
      <NavB/>
      <BookConsole/>
    </>
  );
}

export default App;
