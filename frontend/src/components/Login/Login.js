import React from "react";
import hadogIogo from "../../assets/Login_Logo.jpg"
import GoogleLogo from "../../assets/GoogleLogo.png"
import NaverLogo from "../../assets/NaverLogo.png"
import KakaoLogo from "../../assets/KakaoLogo.png"
import * as L from "./LoginStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <L.LoginRootWrapper>
      <L.LogoContainer>
        <L.LogoImg src={hadogIogo} />
        <L.Text1>반려견의 감정을 해독하다</L.Text1>
      </L.LogoContainer>

      <L.ContentContainer>
        <L.IdInputBox
            type="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={"아이디"}
          />

        <L.PasswordInputBox
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"비밀번호"}
          />

        <L.LoginButton
            //onClick={handleLogin}
            disabled={!id || !password}
            onClick={() => navigate(`/`)}
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
            <L.SocialLogoImg src={NaverLogo} />
            <L.SocialLogoImg src={KakaoLogo} />
          </L.SocialLogo>
        </L.SocialContent>
      </L.ContentContainer>
    </L.LoginRootWrapper>
  );
}



