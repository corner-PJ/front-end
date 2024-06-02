import {  Route, Routes } from 'react-router-dom';

import Signin from './pages/Siginin';
import Login from './pages/Login';
import SpeechSynthesis from './pages/SpeechSynthesis';
import SpeechSynthesis2 from './pages/SpeechSynthesis2';
import SpeechSynthesisResult from './pages/SpeechSynthesisResult';


function AppNavigation() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />  
          <Route path="/speechSynthesis" element={<SpeechSynthesis />} />  
          <Route path="/speechSynthesis2" element={<SpeechSynthesis2 />} />
          <Route path="/speechSynthesis/result" element={<SpeechSynthesisResult />} /> 
        </Routes>
    </>
  );
}


export default function Router() {
  return (
      <AppNavigation />
  );
}

