import {  Route, Routes } from 'react-router-dom';

import Signin from './pages/Signin';
import Login from './pages/Login';
import HomePage from './pages/Home';

import SpeechSynthesis from './pages/SpeechSynthesis';
import SpeechSynthesis2 from './pages/SpeechSynthesis2';
import SpeechSynthesisResult from './pages/SpeechSynthesisResult';

import Diary from './pages/Diary';
import DiaryList from './pages/DiaryList';
import EmotionTest from './pages/EmotionTest';
import DiaryDetail from './pages/DiaryDetail';
import DiaryWrite from './pages/DiaryWrite';
import Mypages from './pages/Mypage';
import { PasswordChange } from './components/Mypage/PasswordChange';
import MypetRegister from './pages/MypageRegister';
import EmotionHistory from './pages/EmotionHistory';


function AppNavigation() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />  
          <Route path="/" element={<HomePage />} />  
          <Route path="/speechSynthesis" element={<SpeechSynthesis />} />  
          <Route path="/speechSynthesis2" element={<SpeechSynthesis2 />} />
          <Route path="/speechSynthesis/result" element={<SpeechSynthesisResult />} /> 
          <Route path="/diary" element={<Diary />} />  
          <Route path="/diary/list" element={<DiaryList />} />
          <Route path="/diary/detail" element={<DiaryDetail />} />
          <Route path="/diary/new" element={<DiaryWrite />} />
          <Route path="/emotionTestUrl" element={<EmotionTest />} />    
          <Route path="/mypage" element={<Mypages />} />  
          <Route path="/mypage/passwordChange" element={<PasswordChange />} />
          <Route path="/mypage/petRegister" element={<MypetRegister />} />  
          <Route path="/mypage/emotionHistory" element={<EmotionHistory />} />
        </Routes>
    </>
  );
}


export default function Router() {
  return (
      <AppNavigation />
  );
}

