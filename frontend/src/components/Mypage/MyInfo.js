import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";


export function MyInfo() {

    return (
            <MyInfoWrapper>
                <MyInfoHeader>내 정보</MyInfoHeader>
                <MyInfoRectangle>
                    <BoxContainer>
                        <Text>이름</Text>
                        <InfoSpan data-info="name">홍길동</InfoSpan>
                    </BoxContainer>
                    <BoxContainer>
                        <Text>닉네임</Text>
                        <InfoSpan data-info="nickname">홍홍</InfoSpan>
                    </BoxContainer>
                    <BoxContainer>
                        <Text>아이디</Text>
                        <InfoSpan data-info="id">hong</InfoSpan>
                    </BoxContainer>
                    <BoxContainer>
                        <Text>이메일</Text>
                        <InfoSpan data-info="email">hong@gmail.com</InfoSpan>
                    </BoxContainer>
                    <BoxContainer>
                        <PasswordChangeButton as={Link} to="/mypage/passwordChange">비밀번호 변경하기</PasswordChangeButton>
                    </BoxContainer>
                    <BoxContainer>
                        <WithdrawButton>탈퇴하기</WithdrawButton>
                    </BoxContainer>
                </MyInfoRectangle>
            </MyInfoWrapper>
    );
}

const MyInfoWrapper = styled.div`
	min-height: 60vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
`;

const MyInfoHeader = styled.span`
    color: black;
    text-overflow: ellipsis;
    font-size: 32px;
    font-family: Inter, sans-serif;
    font-weight: 800;
    text-align: left;
    position: center;
    margin-bottom: 30px;
`;

const MyInfoRectangle = styled.div`
	display: flex;
	flex-direction: column;
    position: relative;
    background-color: rgb(255, 243, 199);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
	border: solid 1px rgb(235, 235, 235);
	border-radius: 16px;
	width: 510px;
	height: 360px;

`;

const BoxContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
	margin-bottom: 7px;
    margin-top: 25px;
`;

const Text = styled.span`
    position: relative;
	color: black;
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: bold;
    margin-left: 30px;
`;

const InfoSpan = styled.span`
	color: rgb(0, 0, 0, 0.6);
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-right: 30px;
`;

const PasswordChangeButton = styled.button`
	color: black;
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: bold;
    margin-left: 30px;
    border: none;

    &:hover {
        text-decoration: underline;
    }
`;

const WithdrawButton = styled.span`
	color: rgba(0, 0, 0, 0.6);
	text-overflow: ellipsis;
	font-size: 16px;
	font-family: Inter, sans-serif;
	font-weight: 400;
    margin-left: 30px;
    margin-top: -8px;
    border: none;

    &:hover {
        text-decoration: underline;
    }
`;