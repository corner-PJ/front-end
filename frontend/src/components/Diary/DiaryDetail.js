import React, {useState} from "react";
import styled from 'styled-components';
import Choco from "../../assets/Choco.jpg"
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DeleteModal } from "./Modal/DeleteModal";


export function DiaryDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedDateStr = queryParams.get('date');
    const selectedDate = new Date(selectedDateStr);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (day) => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        closeModal();
        navigate('/diary');
    };

    const handleModify = () => {
        const content = "장난감을 물고 다닐 때마다 이렇게 놀고 싶어하는지 알아주지 못 한 것 같다.. 산책가고 싶다는 것도 놀고 싶다는 것일까? 산책 가고 싶다는 줄 알았다."; 
        navigate('/diary/new', { state: { selectedDate, content } });
    };

    return (
        <DetailWrapper>
            <DetailDate>{format(selectedDate, "yyyy년 MM월 dd일 EEEE")}</DetailDate>
            
            <HeaderWrapper>
                <DetailImg src={Choco} />
                <HeaderContent>
                    <HeaderContainer>
                        <StatateText>“놀고 싶어요” 상태</StatateText>
                        <HeaderText>에 대한 기록</HeaderText>
                    </HeaderContainer>
                    <Line />
                    <ExplainText>
                        “놀고 싶어요 상태”는 반려견이 활발하고 호기심이 많은 때를 말합니다. 이는 보통 몸을 움직여 활동하고, 사물을 탐색하며, 사회적 상호작용을 즐기는 것으로 나타날 수 있습니다.
                    </ExplainText>
                </HeaderContent>
            </HeaderWrapper>
            
            <DetailRectangle>
                <ContentText>
                    장난감을 물고 다닐 때마다 이렇게 놀고 싶어하는지 알아주지 못 한 것 같다.. 산책가고 싶다는 것도 놀고 싶다는 것일까? 산책 가고 싶다는 줄 알았다.
                </ContentText>
            </DetailRectangle>
            
            <ButtonWrapper>
                <ModifyBtn onClick={handleModify}>수정</ModifyBtn>
                <DeleteBtn onClick={openModal}>삭제</DeleteBtn>
            </ButtonWrapper>

            {isModalOpen && (
                <DeleteModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            )}
            
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
    justify-content: space-between;
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

const HeaderContent = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-left: 30px;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center
    justify-content: center; 
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

const DetailRectangle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 7px;
    margin-top: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
    border: solid 1px rgb(235, 235, 235);
    border-radius: 16px;
    width: 60%;
    height: 210px;
    background-color: #FFF3C7;
    box-sizing: border-box;
    padding: 30px;
    flex-shrink: 0;
    overflow-y: auto;
    
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

const ContentText = styled.span`
	color: black;
	font-size: 19px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-align: left;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
    width: 60%;
`;

const ModifyBtn = styled.button`
    display: flex;
	color: white;
	font-size: 19px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	justify-content: center;
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

const DeleteBtn = styled.button`
    display: flex;
    color: white;
    font-size: 19px;
    font-family: Inter, sans-serif;
    font-weight: 600;
    justify-content: center;
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