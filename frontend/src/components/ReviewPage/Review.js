import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReviewContent from './ReviewContnet';
import ReviewMainImg from '../../assets/ReviewMainImg.png'
import { useReviewContext } from '../ReviewContext';

function ReviewPage() { 
    const navigate = useNavigate(); 
    const { reviews } = useReviewContext();

    const goToWritePage = () => {
        navigate('/reviewWrite');
    };   

    return (
        <ReviewPageContainer>
            <Header>
                <HeaderImg src={ReviewMainImg} />
                <HeaderText>
                    여러분의 입양 후기를 남겨주세요
                </HeaderText>
            </Header>
            <UploadButton onClick={goToWritePage}>후기 작성하기</UploadButton>
            <ReviewList>
                <ReviewContent data={reviews} />
            </ReviewList>
        </ReviewPageContainer>  
    )
}

const ReviewPageContainer = styled.div`
    margin-top: -90px;
`
const Header = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    margin-bottom: 30px;
    overflow: hidden;
    `
const HeaderImg = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    opacity: 0.5;
`
const HeaderText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2.8em;
    font-weight: bold;
    text-align: center;
`

const UploadButton = styled.button`
    display: block;
    margin-left: 64em;
    padding: 15px 60px;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
    background-color: #FC819E;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);    
`

const ReviewList = styled.div`
    display: flex;
    padding: 40px;
    justify-content: center;
`

export default ReviewPage;