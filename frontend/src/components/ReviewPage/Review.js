import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewContent from './ReviewContnet';
import ReviewMainImg from '../../assets/ReviewMainImg.png';
import axios from 'axios';

import { useTokenContext } from '../TokenContext'; // 토큰

function ReviewPage() { 
    const navigate = useNavigate(); 
    const [reviews, setReviews] = useState([]);

    // // localStorage에서 토큰 가져오기
    // const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    // 임시로 context를 활용해 토큰 가져옴
    const { ACCESS_TOKEN } = useTokenContext();

    useEffect(() => {
        // 리뷰 목록 조회
        const ReviewsData = async () => {
            try {
                const response = await axios.get('/reviews', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${ACCESS_TOKEN}`,
                    }
                });
                if (response.status === 200) {
                    setReviews(response.data.data);
                    // console.log(response.data.data)                    
                } else {
                    alert("데이터를 불러오는데 실패했습니다.");
                }
            } catch (error) {
                console.error('리뷰 목록 조회 실패:', error);
                
                // 토큰이 만료되었거나 유효하지 않을 때
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('ACCESS_TOKEN');
                    alert('토큰이 만료되었습니다. 다시 로그인하세요.');
                    navigate('/login');
                }
            }
        };

        ReviewsData();
    }, [ACCESS_TOKEN, navigate]);

    const goToWritePage = () => {
        navigate('./write');
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
                <ReviewContent reviews={reviews} />
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
