import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import Choco from "../../assets/Choco.jpg"
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function EmotionHistoryPage() {
    const { petId } = useParams(); 
    const [emotionTracks, setEmotionTracks] = useState([]); // 감정 추적 데이터를 저장할 상태

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청
        const fetchEmotionTracks = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(`/mypage/emotion-tracks/${petId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setEmotionTracks(response.data.data);
                    
                } else {
                    toast.error('데이터를 불러오는데 실패했습니다.', {
                        autoClose: 3000,
                        position: "top-center",
                    });
                    console.error("감정 추적 기록 조회 실패:", response.data.message);
                }
            } catch (error) {
                console.error("감정 추적 기록을 불러오는 중 오류 발생:", error);
            } 
        };

        fetchEmotionTracks();
    }, [petId]);

    return (
        <WritingWrapper>
            <EmotionHistoryWriting>
                <EmotionHistoryHeader>초코의 감정 해독 결과 목록</EmotionHistoryHeader>
                <ContentContainer>
                    <EmotionHistoryContent>
                        <EmotionHistoryImg src={Choco} />
                        <EmotionHistoryRectangle>
                            <EmotionHistoryDate>2024.08.19 16:04</EmotionHistoryDate>
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