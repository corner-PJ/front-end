import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewComment from './ReviewComment';
import axios from 'axios';

const ReviewDetail = () => {
    const navigate = useNavigate(); 
    const [slideIndex, setSlideIndex] = useState(0);
    const [data, setData] = useState({ images: [], reviewDate: '', content: '', reviewId: '' });
    const { reviewId } = useParams();

    // // localStorage에서 토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('authToken');
    
	useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        // 리뷰 상세 조회
        const ReviewDetailData = async () => {
            try {
                const response = await axios.get(`/reviews/${reviewId}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${ACCESS_TOKEN}`,
                    }
                });
                if (response.status === 200) {
                    setData(response.data.data);
                    // console.log(response.data.data)
                } else {
                    alert("데이터를 불러오는데 실패했습니다.");
                }
            } catch (error) {
                console.error('리뷰 상세 조희 실패:', error);

                // 토큰이 만료되었거나 유효하지 않을 때
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('ACCESS_TOKEN');
                    alert('토큰이 만료되었습니다. 다시 로그인하세요.');
                    navigate('/login');
                }
            }
        };
        ReviewDetailData();
    }, [reviewId, ACCESS_TOKEN, navigate]);

    // 작성 시간 표현 설정
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const moveToPrevSlide = () => {
        setSlideIndex((prev) => (prev === 0 ? data.images.length - 1 : prev - 1));
    };
    
    const moveToNextSlide = () => {
        setSlideIndex((prev) => (prev === data.images.length - 1 ? 0 : prev + 1));
    };
    
    const moveDot = (index) => {
        setSlideIndex(index);
    };

    return (
        <ReviewDetailContainer>
            <ReviewHeader>
                <ReviewTitle>{data.authorName}님의 후기</ReviewTitle>
                <ReviewUpdate>{formatDate(data.reviewDate)}</ReviewUpdate>
            </ReviewHeader>
            <ReviewMain>
                <ImgContainer>
                    <Arrow direction="prev" onClick={moveToPrevSlide}>
                        ‹
                    </Arrow>
                    <Wrapper slideIndex={slideIndex}>
                        {data.images && data.images.map((item, index) => (
                            <ImgSlide key={index}>
                                <Img src={item.fileName} alt={`slide-${index}`} />
                            </ImgSlide>
                        ))}
                    </Wrapper>
                    <Arrow direction="next" onClick={moveToNextSlide}>
                        ›
                    </Arrow>
                    <DotContainer>
                        {data.images && data.images.map((item, index) => (
                            <Dot
                                key={index}
                                className={index === slideIndex ? "active" : null}
                                onClick={() => moveDot(index)}
                            />
                        ))}
                    </DotContainer>
                </ImgContainer>
                <ReviewText>
                    {data.content}
                </ReviewText>
            </ReviewMain>
            <ReviewComment reviewId={reviewId} />
        </ReviewDetailContainer>
    );
}

const ReviewDetailContainer = styled.div`
    margin: 90px;
`;

const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    padding: 20px 30px 40px;
`;

const ReviewTitle = styled.div`
    font-size: 2.2em;
    font-weight: bold;
`;

const ReviewUpdate = styled.div`
    display: flex;
    align-items: flex-end;
`;

const ReviewMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid black;
    padding: 80px 0 150px;
`;

const ImgContainer = styled.div`
    width: 800px;
    height: 600px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px auto;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${({ slideIndex }) => slideIndex * -100 + "%"});
`;

const ImgSlide = styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFEFEF;
    border-radius: 10px;
`;

const Img = styled.img`
    width: 90%;
    height: 90%;
    object-fit: cover;
    border-radius: 10px;
`;

const Arrow = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    left: ${({ direction }) => direction === "prev" && "0px"};
    right: ${({ direction }) => direction === "next" && "0px"};
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1;
    font-size: 4em;
    color: #f59fb47d;

    &:hover {
        color: #FC819E;
    }
`;

const DotContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100px;
    display: flex;
    justify-content: space-between;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #FFFFFF;
    cursor: pointer;

    &.active {
        background-color: #FC819E;
    }
`;

const ReviewText = styled.div`
    margin-top: 40px;
    width: 900px;
    word-break: keep-all;
    white-space: pre-line;
    line-height: 1.6;
    font-size: 1.2em;
    text-align: center;
`;

export default ReviewDetail;