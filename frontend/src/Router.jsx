import {  Route, Routes } from 'react-router-dom';

import Signin from './pages/Siginin';
import Login from './pages/Login';
import Mypages from './pages/Mypage';
import { PasswordChange } from './components/Mypage/PasswordChange';
import MypetRegister from './pages/MypageRegister';

function AppNavigation() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />  
          <Route path="/mypage" element={<Mypages />} />  
          <Route path="/mypage/passwordChange" element={<PasswordChange />} />
          <Route path="/mypage/petRegister" element={<MypetRegister />} />  
        </Routes>
    </>
  );
}


export default function Router() {
  return (
      <AppNavigation />
  );
}

