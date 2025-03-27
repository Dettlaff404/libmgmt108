import React from 'react';
import './App.css';
import NavB from './components/Nav';
import { BookConsole } from './components/book/BookConsole';
import { MemberConsole } from './components/member/MemberConsole';
import { StaffConsole } from './components/staff/StaffConsole';
import { LendingConsole } from './components/lendings/LendingConsole';
import { BrowserRouter, Routes, Route } from 'react-router';
import NotFound from './components/NotFound';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { AuthProvider } from './components/auth/AuthProvider';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavB />
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/book' element={<BookConsole />} />
            <Route path='/member' element={<MemberConsole />} />
            <Route path='/staff' element={<StaffConsole />} />
            <Route path='/lending' element={<LendingConsole />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
