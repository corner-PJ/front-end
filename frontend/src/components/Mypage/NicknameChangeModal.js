import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from "axios";

export function NicknameChangeModal({ isNicknameModalOpen, closeNicknameModal, setUserInfo}) {
    const [newNickname, setNewNickname] = useState("");
    const navigate = useNavigate();
    
    const handleNicknameChange = (e) => {
        setNewNickname(e.target.value);
    };
    
    const handleNicknameSubmit = async () => {
        try {
            const token = localStorage.getItem("authToken");
            console.log("토큰:", token);

            // URLSearchParams 객체 생성
            const formData = new URLSearchParams();
            formData.append("nickname", newNickname);

            const response = await axios.put(
                "/mypage/nickname",
                null, 
                {
                    params: {
                        newNickname: newNickname // 쿼리 파라미터로 닉네임 전달
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
            
            // 닉네임 변경 성공
            if (response.data.success) { 
                console.log("닉네임 변경 성공");

                setUserInfo(prevInfo => ({
                    ...prevInfo,
                    nickname: newNickname,
                }));
                
                alert(response.data.message);
                closeNicknameModal();
                navigate(`/mypage`);

            } else {
                alert("닉네임 변경에 실패했습니다.");
            }

        } catch (error) {
            console.error("닉네임 변경 중 오류 발생:", error);
        }
    };
    
    return (
        <>
            {isNicknameModalOpen && (
                <ModalOverlay>
                    <RootWrapper>
                        <ContentRectangle>
                            <ContentText>
                                수정할 닉네임을 입력하세요.
                            </ContentText>

                            <NicknameInputBox
                                type="text"
                                name="nickname"
                                value={newNickname}
                                onChange={handleNicknameChange}
                            />
                            
                            <ButtonWrapper>
                                <OkBtn onClick={handleNicknameSubmit}>확인</OkBtn>
                                <CancleBtn onClick={closeNicknameModal}>취소</CancleBtn>
                            </ButtonWrapper>
                        </ContentRectangle>
                    </RootWrapper>
                </ModalOverlay>
            )}
        </>
    );
}

// PropTypes 추가
NicknameChangeModal.propTypes = {
    isNicknameModalOpen: PropTypes.bool.isRequired,
    closeNicknameModal: PropTypes.func.isRequired,
    setUserInfo: PropTypes.func.isRequired,
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent; 
    z-index: 2; /* 다른 요소보다 위에 나타나도록 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RootWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    position: relative; 
    border-radius: 50px;
    z-index: 3;
`;

const ContentRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #FFE6E6;
    border-radius: 16px; 
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
    width: 420px;
    height: 230px;
    border-radius: 50px;
`;


const ContentText = styled.span`
	color: black;
	font-size: 21px;
	font-family: Inter, sans-serif;
	font-weight: 700;
	text-align: center;
	width: 537px;
	min-height: 51px;
    margin-top: 15px;
`;

export const NicknameInputBox = styled.input`
	font-size: 17px;
	border: solid 2px rgb(252, 129, 158);
    background-color: #FFE6E6;
	border-radius: 5px;
	padding-left: 20px;
	width: 80%; 
	height: 50px;
	max-width: 100%; 
	box-sizing: border-box; 

	&:focus {
		border: 2px solid rgb(252, 129, 158);
		outline: none; 
	}
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 100%;
`;

const OkBtn = styled.button`
    color: black;
    font-size: 20px;
    font-family: Inter, sans-serif;
    font-weight: 600;
    text-align: right;
    border: 2px solid #E1AFD1;
    border-radius: 16px;
    background-color: #E1AFD1;
    padding: 15px 25px;
    margin-right: 20px;

    &:hover {
        background-color: white;
        border: 1px #E1AFD1;
        border: 2px solid #E1AFD1;
        color: black;
    }
`;

const CancleBtn = styled.button`
    color: black;
    font-size: 20px;
    font-family: Inter, sans-serif;
    font-weight: 600;
    text-align: right;
    border: 2px solid #E1AFD1;
    border-radius: 16px;
    background-color: #E1AFD1;
    padding: 15px 25px;
    margin-left: 20px;

    &:hover {
        background-color: white;
        border: 1px #E1AFD1;
        border: 2px solid #E1AFD1;
        color: black;
    }
`;