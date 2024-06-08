import {  Route, Routes } from 'react-router-dom';

import Signin from './pages/Siginin';
import Login from './pages/Login';
import Diary from './pages/Diary';
import DiaryList from './pages/DiaryList';
import EmotionTest from './pages/EmotionTest';

function AppNavigation() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />  
          <Route path="/diary" element={<Diary />} />  
          <Route path="/diary/list" element={<DiaryList />} />
          <Route path="/emotionTestUrl" element={<EmotionTest />} />    
        </Routes>
    </>
  );
}


export default function Router() {
  return (
      <AppNavigation />
  );
}

