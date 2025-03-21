import React from 'react';
import './App.css';
import NavB from './components/Nav';
import { BookConsole } from './components/book/BookConsole';
import { MemberConsole } from './components/member/MemberConsole';
import { StaffConsole } from './components/staff/StaffConsole';

function App() {
  return (
    <>
      <NavB/>
      {/* <BookConsole/> */}
      {/* <MemberConsole/> */}
      <StaffConsole/>
    </>
  );
}

export default App;
