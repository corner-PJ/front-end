import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as M from "./MypageStyle";

export function MyInfo() {

    // 유저 정보 저장
    const [userInfo, setUserInfo] = useState({
        name: "",
        id: "",
        nickname: "",
        password: "",
        email: "",
    });

    // 유저 정보 서버로부터 가져옴
    useEffect(() => {
        const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem("authToken");
            console.log("토큰:", token);

            const response = await axios.get("/mypage/userinfo", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("서버 응답 데이터:", response.data);

            setUserInfo(response.data.data);
        } catch (error) {
            console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        }
        };

        fetchUserInfo();
    }, []);


    return (
            <M.MyInfoWrapper>
                <M.MyInfoHeader>내 정보</M.MyInfoHeader>
                <M.MyInfoRectangle>
                    <M.BoxContainer>
                        <M.Text>이름</M.Text>
                        <M.InfoSpan data-info="name">{userInfo.name}</M.InfoSpan>
                    </M.BoxContainer>
                    <M.BoxContainer>
                        <M.Text>닉네임</M.Text>
                        <M.InfoSpan data-info="nickname">{userInfo.nickname}</M.InfoSpan>
                    </M.BoxContainer>
                    <M.BoxContainer>
                        <M.Text>아이디</M.Text>
                        <M.InfoSpan data-info="id">{userInfo.id}</M.InfoSpan>
                    </M.BoxContainer>
                    <M.BoxContainer>
                        <M.Text>이메일</M.Text>
                        <M.InfoSpan data-info="email">{userInfo.email}</M.InfoSpan>
                    </M.BoxContainer>
                    <M.BoxContainer>
                        <M.PasswordChangeButton as={Link} to="/mypage/passwordChange">비밀번호 변경하기</M.PasswordChangeButton>
                    </M.BoxContainer>
                    <M.BoxContainer>
                        <M.WithdrawButton>탈퇴하기</M.WithdrawButton>
                    </M.BoxContainer>
                </M.MyInfoRectangle>
            </M.MyInfoWrapper>
    );
}