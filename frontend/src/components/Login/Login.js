import React, { useEffect } from "react";
import hadogIogo from "../../assets/Login_Logo.jpg"
import GoogleLogo from "../../assets/GoogleLogo.png"
import * as L from "./LoginStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function LoginPage() {

  // 사용자 폼 저장
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  // 폼 입력 시 변경
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  // 서버로 사용자가 입력한 정보 전달
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
				"/user/login",
				formData,
			);

      console.log("Response Data:", response.data);

      if (response.data.success) {
        console.log("로그인 성공");

        toast.success('로그인에 성공했습니다!', {
          autoClose: 3000,
          position: "top-center",
        });

        // 토큰 저장 
        localStorage.setItem("authToken", response.data.data);
        console.log("Your token", response.data.data);

        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 토큰 유효 시간: 현재 + 24시간
        localStorage.setItem("tokenExpirationTime", expirationTime);

        // 로그인 성공 시 메인페이지로 이동
        navigate("/");

      } else {
        console.log("로그인 실패");
        toast.error('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.', {
          autoClose: 3000,
          position: "top-center",
        });
      }

    } catch (error) {
      console.error("데이터 전송 중 오류 발생:", error);
      // 실패 시에 알림 창 띄움
      toast.error('로그인 중 오류가 발생했습니다.', {
        autoClose: 3000,
        position: "top-center",
      });
    }
  };

  // 로그인 버튼 활성화
	const isButtonActive = formData.id && formData.password;

  // 소셜로그인
  // console.log(window.naver);

  // 네이버 로그인
  const { naver } = window;
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; 
  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URI;
  
  const handleNaverLogin = () => {
    
    const STATE_STRING = process.env.REACT_APP_STATE_STRING;
    const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${NAVER_CALLBACK_URL}}`;
    
    window.location.href = NAVER_URL;
  };

  const naverLogin = new naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,  
    callbackUrl: NAVER_CALLBACK_URL,  
    isPopup: false,  
    loginButton: {
      color: "green", 
      type: 1,
      height: 50,
    },
  });

  useEffect(() => {
    naverLogin.init();
  }, []);


  return (
    <L.LoginRootWrapper>
      <L.LogoContainer>
        <L.LogoImg src={hadogIogo} />
        <L.Text1>반려견의 감정을 해독하다</L.Text1>
      </L.LogoContainer>

      <L.ContentContainer>
        <L.IdInputBox
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder={"아이디"}
          />

        <L.PasswordInputBox
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={"비밀번호"}
          />

        <L.LoginButton
            onClick={handleSubmit}
            $disabled={!isButtonActive}
          >
            로그인
        </L.LoginButton>

        <L.SigninButton onClick={() => navigate(`/signin`)}>
          회원가입
        </L.SigninButton>
        
        <L.SocialContent>
          <L.Line />
          <L.Text2>소셜 로그인</L.Text2>
          <L.SocialLogo>
            <L.SocialLogoImg src={GoogleLogo} />
            <div id="naverIdLogin" />
            <L.SocialLogoImg 
              id="loginButton"
              // onClick={handleNaverLogin} 
            />
          </L.SocialLogo>
        </L.SocialContent>
      </L.ContentContainer>
    </L.LoginRootWrapper>
  );
}