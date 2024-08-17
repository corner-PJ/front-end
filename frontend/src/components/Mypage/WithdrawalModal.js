import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from "axios";

export function WithdrawModal({ isWithdrawModalOpen, closeWithdrawModal}) {
    const navigate = useNavigate();

    // 회원 탈퇴 처리
    const handleWithdraw = async () => {

        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete("/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                alert("회원 탈퇴가 완료되었습니다.");
                localStorage.removeItem("authToken");
                navigate("/"); 

            } else {
                alert(response.data.message || "회원 탈퇴 실패");
            }
        } catch (error) {
            console.error("회원 탈퇴 중 오류 발생:", error);
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

    
    return (
        <>
            {isWithdrawModalOpen && (
                <ModalOverlay>
                    <RootWrapper>
                        <ContentRectangle>
                            <ContentText>
                                정말 탈퇴하시겠어요?<br/>
                                확인 버튼을 누르면 계정은 삭제되며,<br/>
                                다시 복구되지 않습니다.
                            </ContentText>
                
                            <ButtonWrapper>
                                <OkBtn onClick={handleWithdraw}>확인</OkBtn>
                                <CancleBtn onClick={closeWithdrawModal}>취소</CancleBtn>
                            </ButtonWrapper>
                        </ContentRectangle>
                    </RootWrapper>
                </ModalOverlay>
            )}
        </>
    );
}

// PropTypes 추가
WithdrawModal.propTypes = {
    isWithdrawModalOpen: PropTypes.bool.isRequired,
    closeWithdrawModal: PropTypes.func.isRequired,
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
	font-size: 23px;
	font-family: Inter, sans-serif;
	font-weight: 700;
	text-align: center;
	width: 537px;
	min-height: 51px;
    margin-top: 20px;
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

    &:hover {
        background-color: white;
        border: 1px #E1AFD1;
        border: 2px solid #E1AFD1;
        color: black;
    }
`;