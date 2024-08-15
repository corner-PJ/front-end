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
import ListWrite from './pages/ListWrite';
import List from './pages/List';
import ListDetail from './pages/ListDetail';
import EmotionAnalysis from './pages/EmotionAnalysis';
import SelectDog from './pages/SelectDog';
import UpLoad from './pages/UpLoad';
import AnalysisResult from './pages/AnalysisResult';
import Review from './pages/Review';
import ReviewWrite from './pages/ReviewWrite'
import ReviewDetail from './pages/ReviewDetail';
import { MypetEditPage } from './components/Mypage/MypetEdit';

function AppNavigation() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />  
        
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
          <Route path="/mypage/petEdit" element={<MypetEditPage /> }/>
          <Route path="/mypage/emotionHistory" element={<EmotionHistory />} />
          
          <Route path="/list" element={<List />} />  
          <Route path="/list/write" element={<ListWrite />} />  
          <Route path="/list/:type/:postId" element={<ListDetail />} />      
          
          <Route path="/emotionAnalysis" element={<EmotionAnalysis />} />  
          <Route path="/analysis" element={<SelectDog />} />  
          <Route path="/analysis/:selectedDog" element={<UpLoad />} />
          <Route path="/result/:selectedDog" element={<AnalysisResult />} />  
          
          <Route path="/review" element={<Review />} />  
          <Route path="/review/write" element={<ReviewWrite />} />  
          <Route path="/review/:reviewId" element={<ReviewDetail />} /> 
        </Routes>
    </>
  );
}


export default function Router() {
  return (
      <AppNavigation />
  );
}

