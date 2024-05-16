import {  Route, Routes } from 'react-router-dom';

import Signin from './pages/Siginin';
import Login from './pages/Login';
import HomePage from './pages/Home';

function AppNavigation() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />  
          <Route path="/homePage" element={<HomePage />} />  
        </Routes>
    </>
  );
}


export default function Router() {
  return (
      <AppNavigation />
  );
}

