import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import Choco from "../../assets/Choco.jpg"
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';


export function DiaryListPage() {
    const navigate = useNavigate();
    const [diaryEntries, setDiaryEntries] = useState([]);
    const maxLength = 80;
    
    const { date } = useParams();

    // 서버에 맞게 날짜 형식 변환 
    const formatDateForAPI = (date) => {
        return `${date}T00:00:00`; 
    };

    // 목록 조회 (URL의 날짜가 변경되었을 때)
    useEffect(() => {
        const fetchDiaryEntries = async () => {
            const formattedDate = formatDateForAPI(date);
            // console.log("date:", formattedDate);

            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('/diary/list', {
                    params: { 
                        date: '2024-08-19T14:56:52', 
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                // console.log("API Response:", response.data);

                if (response.data.success) {
                    console.log("Diary Entries:", response.data.data);
                    setDiaryEntries(response.data.data);
                } else {
                    console.error('일기 목록을 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('서버 오류:', error);
            }
        };

        if (date) {
            fetchDiaryEntries();
        }
    }, [date]); 

    // 상세 페이지 이동
    const handleReadMore = (diaryId) => {
        navigate(`/diary/detail/${diaryId}`);
    };


    return (
        <WritingWrapper>
            <ListWriting>
                <ListHeader>{format(new Date(date), "yyyy년 MM월 dd일")}</ListHeader>
                <ContentContainer>
                    {diaryEntries.map((entry, index) => (
                        <ListContentWrapper key={index}>
                            <ListImg src={Choco} />
                            <ListRectangle>
                                <ListDate>{format(new Date(entry.diaryDate), "yyyy.MM.dd HH:mm")}</ListDate>
                                <ListContentHeader>놀고 싶어요 상태에 대한 기록</ListContentHeader>  {/* 감정 분석 결과 제목 */}
                                <ListContent>
                                    {entry.content.length > maxLength ? (
                                        <>
                                            {entry.content.substring(0, maxLength)}
                                            <ReadMoreButton onClick={() => handleReadMore(entry.diaryId)}>...더보기</ReadMoreButton>
                                        </>
                                    ) : (
                                        entry.content
                                    )}
                                </ListContent>
                            </ListRectangle>
                        </ListContentWrapper>
                    ))}
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
    align-items: flex-start;
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
    width: 100px;
    height: 100px;
    object-fit: cover;
    align-self: center;
    border-radius: 50%; 
    margin-right: 25px; 
    margin-left: 15px; 
`;

const ListRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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

`;

const ListContentHeader = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
    margin-bottom: 6px;
`;

const ListContent = styled.span`
	color: black;
	font-size: 17px;
	font-family: Inter, sans-serif;
	font-weight: 500;
	text-align: left;
`;

const ReadMoreButton = styled.button`
    color: black;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 17px;

    &:hover {
        text-decoration: underline;
    }
`;