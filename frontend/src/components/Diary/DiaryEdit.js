import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import Choco from "../../assets/Choco.jpg"
import { useNavigate  } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import axios from "axios";


export function DiaryEditPage() {
    const navigate = useNavigate();
    const [editContent, seteditContent] = useState("");

    // 현재 날짜를 포맷팅
    const todayDate = format(new Date(), 'yyyy년 MM월 dd일 EEEE', { locale: ko });

    function formatDateForServer(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }const token = localStorage.getItem('authToken');

    // 일기 정보 불러오기


    // 일기 등록 핸들러
    const handleRegister = async () => {
        // const now = new Date();
        // const formattedDate = formatDateForServer(now);
        
        try {
            const token = localStorage.getItem('authToken'); 
        
            const response = await axios.patch('/diary',
                {
                    params: {
                        content: editContent 
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            // 응답 데이터 확인
            console.log("서버 응답 데이터:", response.data);

            if (response.status === 200) {
                alert('일기가 수정되었습니다.');
                navigate("/diary");

            } else {
                alert(`일기 수정에 실패했습니다: ${response.data.message}`);
            }
        } catch (error) {
            console.error('일기 수정 중 오류 발생:', error);
            alert(`일기 수정 중 오류가 발생했습니다: ${error.message}`);
        }
    };


    return (
        <DetailWrapper>
            <DetailDate>{todayDate}</DetailDate>
            
            <HeaderWrapper>
                <DetailImg src={Choco} />
                <HeadereditContent>
                    <HeaderContainer>
                        <StatateText>“놀고 싶어요” 상태</StatateText>
                        <HeaderText>에 대한 기록</HeaderText>
                    </HeaderContainer>
                    <Line />
                    <ExplainText>
                        “놀고 싶어요 상태”는 반려견이 활발하고 호기심이 많은 때를 말합니다. 이는 보통 몸을 움직여 활동하고, 사물을 탐색하며, 사회적 상호작용을 즐기는 것으로 나타날 수 있습니다.
                    </ExplainText>
                </HeadereditContent>
            </HeaderWrapper>
            
            <editContentContainer>
                <DetailRectangle>
                    <editContentTextArea
                        value={editContent}
                        onChange={(e) => seteditContent(e.target.value)}
                        // placeholder="여기에 내용을 작성하세요..."
                    />
                </DetailRectangle>
            </editContentContainer>
            
            <ButtonWrapper>
                <RegisterBtn onClick={handleRegister}>등록</RegisterBtn>
            </ButtonWrapper>
            
        </DetailWrapper>
    );
}



const DetailWrapper = styled.div`
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
`;

const DetailDate = styled.span`
	color: black;
	font-size: 24px;
	font-family: Inter, sans-serif;
	font-weight: 700;
	text-align: flex-start;
	width: 60%;
    margin-top: 50px;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-editContent: space-between;
    align-items: center;
    width: 60%;
    margin-bottom: 20px;
    margin-top: 60px;
`;

const DetailImg = styled.img`
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 50%; 
    align-self: center;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
`;

const HeadereditContent = styled.div` 
    display: flex;
    flex-direction: column;
    justify-editContent: center;
    align-items: flex-start;
    width: 100%;
    margin-left: 30px;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center
    justify-editContent: center; 
    width: 80%;
`;

const StatateText = styled.span`
	color: black;
	font-size: 25px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
`;

const HeaderText = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-align: left;
    align-items: baseline;
    margin-left: 10px;
    margin-top: 6px;
`;

const Line = styled.hr`
	width: 100%;
	height: 1px;
	flex-direction: center;
	background-color: #D9D9D9;
	margin-top: 20px;
	margin-bottom: 14px;
`;

const ExplainText = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-align: left;
	width: 100%;
`;
const editContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-editContent: center;
    align-items: flex-start;
    margin-bottom: 7px;
    margin-top: 10px;
    width: 60%;
    height: 210px;
`;

const DetailRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-editContent: center;
    align-items: flex-start;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
    border: solid 1px rgb(235, 235, 235);
    border-radius: 16px;
    width: 100%;
    height: 210px;
    background-color: #FFF3C7;
    box-sizing: border-box;
    padding: 30px;
    flex-shrink: 0;
`;

const editContentTextArea = styled.textarea`
	color: black;
	font-size: 19px;
	font-family: Inter, sans-serif;
	font-weight: 400;
    overflow-y: auto;
    background-color: transparent;
    width: 100%;
    height: 80%;
    border: none;
    resize: none; 
    outline: none; 

    &::placeholder {
        color: #A1A0A0;
        font-size: 15px;
    }
    &:focus {
        outline: none; 
    }

    &::-webkit-scrollbar {
		width: 10px; 
        height: 8px;
		right: 30px; 
	}
	
	&::-webkit-scrollbar-thumb {
		background-color: #FEC7B4;
		border-radius: 15px;
		backdrop-filter: blur(50px);
		margin-right: 15px;
	}
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-editContent: flex-end;
    align-items: center;
    margin-top: 30px;
    width: 60%;
`;

const RegisterBtn = styled.button`
    display: flex;
    color: white;
    font-size: 19px;
    font-family: Inter, sans-serif;
    font-weight: 600;
    justify-editContent: center;
    border: 2px;
    border-radius: 30px;
    background-color: rgb(252, 129, 158);
    box-shadow: 0px 3px 2px 1px #a9a9a9;
    padding: 10px 20px;
    width: 90px;
    margin-left: 30px;

    &:hover {
        background-color: white;
        border: 2px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
        width: 90px;
    }
`;