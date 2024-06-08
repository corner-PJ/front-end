import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function WriteModal({ isModalOpen, closeModal}) {
    const navigate = useNavigate();

    const MoveToEmotion = async() => {
        closeModal();
        
        navigate(`/emotionTestUrl`);
    }
    
    return (
        <>
            {isModalOpen && (
                <ModalOverlay>
                    <RootWrapper>
                        <ContentRectangle>
                            <ContentText>
                                감정 추적 전입니다!<br/>
                                감정 추적 페이지로 이동하시겠습니까?
                            </ContentText>
                
                            <ButtonWrapper>
                                <OkBtn onClick={MoveToEmotion}>예</OkBtn>
                                <CancleBtn onClick={closeModal}>아니오</CancleBtn>
                            </ButtonWrapper>
                        </ContentRectangle>
                    </RootWrapper>
                </ModalOverlay>
            )}
        </>
    );
}

// PropTypes 추가
WriteModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
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
    padding: 15px 35px;
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