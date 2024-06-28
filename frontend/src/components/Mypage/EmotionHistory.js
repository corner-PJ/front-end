import React from "react";
import styled from "@emotion/styled";
import Choco from "../../assets/Choco.jpg"


export function EmotionHistoryPage() {

    return (
        <WritingWrapper>
            <EmotionHistoryWriting>
                <EmotionHistoryHeader>초코의 감정 해독 결과 목록</EmotionHistoryHeader>
                <ContentContainer>
                    <EmotionHistoryContent>
                        <EmotionHistoryImg src={Choco} />
                        <EmotionHistoryRectangle>
                            <EmotionHistoryDate>2024.03.17 16:04</EmotionHistoryDate>
                            <EmotionHistoryPetName>놀고 싶어요 상태</EmotionHistoryPetName>
                        </EmotionHistoryRectangle>
                    </EmotionHistoryContent>
                    <EmotionHistoryContent>
                        <EmotionHistoryImg src={Choco} />
                        <EmotionHistoryRectangle>
                            <EmotionHistoryDate>2024.03.17 16:04</EmotionHistoryDate>
                            <EmotionHistoryPetName>놀고 싶어요 상태</EmotionHistoryPetName>
                        </EmotionHistoryRectangle>
                    </EmotionHistoryContent> 
                    <EmotionHistoryContent>
                        <EmotionHistoryImg src={Choco} />
                        <EmotionHistoryRectangle>
                            <EmotionHistoryDate>2024.03.17 16:04</EmotionHistoryDate>
                            <EmotionHistoryPetName>놀고 싶어요 상태</EmotionHistoryPetName>
                        </EmotionHistoryRectangle>
                    </EmotionHistoryContent>
                    <EmotionHistoryContent>
                        <EmotionHistoryImg src={Choco} />
                        <EmotionHistoryRectangle>
                            <EmotionHistoryDate>2024.03.17 16:04</EmotionHistoryDate>
                            <EmotionHistoryPetName>놀고 싶어요 상태</EmotionHistoryPetName>
                        </EmotionHistoryRectangle>
                    </EmotionHistoryContent>
                    <EmotionHistoryContent>
                        <EmotionHistoryImg src={Choco} />
                        <EmotionHistoryRectangle>
                            <EmotionHistoryDate>2024.03.17 16:04</EmotionHistoryDate>
                            <EmotionHistoryPetName>놀고 싶어요 상태</EmotionHistoryPetName>
                        </EmotionHistoryRectangle>
                    </EmotionHistoryContent>
                    <EmotionHistoryContent>
                        <EmotionHistoryImg src={Choco} />
                        <EmotionHistoryRectangle>
                            <EmotionHistoryDate>2024.03.17 16:04</EmotionHistoryDate>
                            <EmotionHistoryPetName>놀고 싶어요 상태</EmotionHistoryPetName>
                        </EmotionHistoryRectangle>
                    </EmotionHistoryContent>
                    
                </ContentContainer>
            </EmotionHistoryWriting>
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

const EmotionHistoryWriting = styled.div`
	height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
    width: 80%;
`;

const EmotionHistoryHeader = styled.span`
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

const EmotionHistoryContent = styled.div`
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
    height: 135px;
	background-color: rgb(255, 230, 230);
	box-sizing: border-box;
	padding: 16px;
    flex-shrink: 0;
`;


const EmotionHistoryImg = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%; 
    margin-right: 25px; 
    margin-left: 15px; 
`;

const EmotionHistoryRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.40);
    border-radius: 16px; 
    width: 75%;
	height: 65%;
`;

const EmotionHistoryDate = styled.span`
    color: rgba(0, 0, 0, 0.6);
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-left: 17px;
    margin-bottom: 8px; 
`;

const EmotionHistoryPetName = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
    margin-left: 17px;
`;