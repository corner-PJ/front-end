import {  Route, Routes } from 'react-router-dom';

import Signin from './pages/Siginin';
import Login from './pages/Login';
import SpeechSynthesis from './pages/SpeechSynthesis';

function AppNavigation() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />  
          <Route path="/speechSynthesis" element={<SpeechSynthesis />} />  
        </Routes>
    </>
  );
}


export default function Router() {
  return (
      <AppNavigation />
  );
}

