import React from "react";
import styled from 'styled-components';
import Choco from "../../assets/Choco.jpg"
import { useNavigate } from 'react-router-dom';


export function DiaryDetailPage() {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate('/diary/detail');
    };

    return (
        <WritingWrapper>
            <ListWriting>
                <ListHeader>초코의 감정 해독 결과 목록</ListHeader>
                <ContentContainer>
                    <ListContentWrapper>
                        <ListImg src={Choco} />
                        <ListRectangle>
                            <ListDate>2024.03.17 16:04</ListDate>
                            <ListContentHeader>놀고 싶어요 상태에 대한 기록</ListContentHeader>
                            <ListContent>장난감을 물고 다닐 때마다 이렇게 놀고 싶어하는지 알아주지 못 한 것 같다.. 산책가고 싶다는 것도 놀고 싶다는 것일까? 산책 가고 싶다는</ListContent>
                        </ListRectangle>
                    </ListContentWrapper>
                
                </ContentContainer>
            </ListWriting>
        </WritingWrapper>
    );
}


const WritingWrapper = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: center; 
    width: 100%;
    margin-top: 60px; 
    margin-bottom: 30px; 
`;

const ListWriting = styled.div`
	height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
    width: 80%;
`;

const ListHeader = styled.span`
    color: black;
    font-size: 32px;
    font-family: Inter, sans-serif;
    font-weight: 800;
    margin-bottom: 50px;
`;

const ContentContainer = styled.div`
	min-height: 85vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
    width: 100%;
    overflow-y: auto;
    max-height: 500px;
    
    /* 스크롤바 숨기기 */
    scrollbar-width: none; 
    -ms-overflow-style: none;  
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ListContentWrapper = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: flex-start;
    align-items: center;
    align-self: space-between;
	margin-bottom: 7px;
    margin-top: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
	border: solid 1px rgb(235, 235, 235);
	border-radius: 16px;
	width: 720px;
    height: 190px;
	background-color: #FFF3C7;
	box-sizing: border-box;
	padding: 16px;
    flex-shrink: 0;
`;


const ListImg = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%; 
    margin-right: 25px; 
    margin-left: 15px; 
`;

const ListRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.40);
    border-radius: 16px; 
    width: 75%;
	height: 70%;
`;

const ListDate = styled.span`
    color: rgba(0, 0, 0, 0.6);
	font-size: 15px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-left: 10px;

`;

const ListContentHeader = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
    margin-left: 10px;
    margin-bottom: 6px;
`;

const ListContent = styled.span`
	color: black;
	font-size: 18px;
	font-family: Inter, sans-serif;
	font-weight: 500;
	text-align: left;
    margin-left: 10px;
`;