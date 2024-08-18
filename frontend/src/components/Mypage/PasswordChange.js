import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";

export function PasswordChange() {
	const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const navigate = useNavigate();

    // 비밀번호 변경 함수
    const handlePasswordChange = async () => {

        // 새 비밀번호와 확인 비밀번호 일치 여부 확인
        if (newPassword !== newPasswordConfirm) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            
            const response = await axios.patch(
                "/user/password",
                null,
                {   
                    params: {
                        newPassword: newPassword,
                        prevPassword: password,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                alert("비밀번호가 변경되었습니다");
                navigate('/mypage');

            } else {
                alert(response.data.message || "비밀번호 변경 실패");
            }
        } catch (error) {
            console.error("비밀번호 변경 중 오류 발생:", error);
            alert("비밀번호 변경 중 오류가 발생했습니다.");
        }
    };

    return (
        <PasswordChangeWrapper>
            <HeaderText>비밀번호 변경</HeaderText>
            <ContentContainer>
				<BoxContainer>
					<Text> 현재 비밀번호 </Text>
					<PasswordInputBox
						type="password"
                        name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</BoxContainer>		

                <BoxContainer>
					<Text> 새 비밀번호 </Text>
					<NewPasswordInputBox
                        type="password"
						name="newPassword"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</BoxContainer>

                <BoxContainer>
					<Text> 새 비밀번호 확인 </Text>
					<NewPasswordConfirmInputBox
                        type="password"
						name="newPasswordConfirm"
						value={newPasswordConfirm}
						onChange={(e) => setNewPasswordConfirm(e.target.value)}
					/>
				</BoxContainer>

                <ButtonContainer>
                    <ConfirmButton onClick={handlePasswordChange}>확인</ConfirmButton>
                    <CancleButton as={Link} to="/mypage" >취소</CancleButton>
                </ButtonContainer>
                

			</ContentContainer>
        </PasswordChangeWrapper>
    );
}


const PasswordChangeWrapper = styled.div`
	min-height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HeaderText = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 32px;
	font-family: Inter, sans-serif;
	font-weight: 800;
	text-align: left;
	position: center;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
	margin-top: 65px;
    & > *:not(:last-child) {
        width: 390px;
        max-width: 100%;
        box-sizing: border-box; 
        height: 55px;
    }
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
	margin-bottom: 30px;
	min-height: 100px;
`;

const Text = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 17px;
	font-family: Inter, sans-serif;
	font-weight: 500;
	text-align: left;
	margin-bottom: 8px;
`;


const PasswordInputBox = styled.input`
	font-size: 17px;
    border: solid 1px rgb(217, 217, 217);
    border-radius: 5px;
    padding-left: 20px;
    width: 100%; 
	height: 50px;
    max-width: 100%; 
    box-sizing: border-box; 
	margin-bottom: 15px;
    &:focus {
        border: 1px solid rgb(252, 129, 158);
        outline: none; 
    }
`;

const NewPasswordInputBox = styled.input`
	font-size: 17px;
    border: solid 1px rgb(217, 217, 217);
    border-radius: 5px;
    padding-left: 20px;
    width: 100%; 
	height: 50px;
    max-width: 100%; 
    box-sizing: border-box; 
	margin-bottom: 15px;
    &:focus {
        border: 1px solid rgb(252, 129, 158);
        outline: none; 
    }
`;

const NewPasswordConfirmInputBox = styled.input`
	font-size: 17px;
	border: solid 1px rgb(217, 217, 217);
	border-radius: 5px;
	padding-left: 20px;
	width: 100%; 
	height: 50px;
	max-width: 100%; 
	box-sizing: border-box; 
	margin-bottom: 15px;
	&:focus {
		border: 1px solid rgb(252, 129, 158);
		outline: none; 
	}
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ConfirmButton = styled.button`
    color: white;
    font-weight: bold;
    font-size: 18px;
    background-color: rgb(252, 129, 158);
    border-radius: 7px;
    border: 2px solid;
    margin-top: 13px;
    width: 100%; 
    height: 57px;
    max-width: 100%; 
    box-sizing: border-box; 

    &:hover {
        background-color: white;
        border: 4px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
        box-shadow: 0px 4px 4px 2px rgba(252, 129, 158, 0.25); 
    }
`;

const CancleButton = styled.button`
    color: rgb(192, 192, 192);
    font-weight: bold;
    font-size: 18px;
    background-color: white;
    border-radius: 6px;
    border: 1.5px solid;
    margin-top: 13px;
    width: 100%;
    height: 55px;
    max-width: 100%; 
    box-sizing: border-box; 

    display: flex;
	justify-content: center;
	align-items: center;

    &:hover {
        background-color: rgb(192, 192, 192);
        border: 4px solid rgb(192, 192, 192);
        color: white;
        box-shadow: 0px 4px 4px 2px rgba(192, 192, 192, 0.25); 
    }
`;