import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function MyWriting() {
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState([]);

    // 초기 3개 글 표시
    const [visiblePosts, setVisiblePosts] = useState(3); 
    const [visibleReviews, setVisibleReviews] = useState(3); 

    const navigate = useNavigate();

    // 임시 보호 글 내역
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("/mypage/adoptposts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setPosts(response.data.data);
                    // console.log('Fetched posts:', response.data.data);
                } else {
                    toast.error('데이터를 불러오는데 실패했습니다.', {
                        autoClose: 3000,
                        position: "top-center",
                    });
                    console.error("임시 보호 글 목록 조회 실패:", response.data.message);
                }
            } catch (error) {
                console.error("임시 보호 글 목록을 불러오는 중 오류 발생:", error);
            } 
        };

        fetchPosts();
    }, []);

    // 후기 내역
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("/mypage/adoptreviews", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setReviews(response.data.data);
                } else {
                    toast.error('데이터를 불러오는데 실패했습니다.', {
                        autoClose: 3000,
                        position: "top-center",
                    });
                    console.error("입양 후기 글 목록 조회 실패:", response.data.message);
                }
            } catch (error) {
                console.error("입양 후기 글 목록을 불러오는 중 오류 발생:", error);
            } 
        };

        fetchReviews();
    }, []);

    // 더보기 버튼 
    const handleLoadMorePosts = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3);
    };

    const handleLoadMoreReviews = () => {
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
    };

    // 날짜 포맷 
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0'); 
        const hours = String(date.getHours()).padStart(2, '0'); 
        const minutes = String(date.getMinutes()).padStart(2, '0'); 

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    // 상세페이지 이동 핸들러
    const handlePostClick = (postId, type) => {
        navigate(`/list/${type}/${postId}`);
    };

    const handleReviewClick = (reviewId) => {
        navigate(`/review/${reviewId}`);
    };

    return (
        <WritingWrapper>
            <ProtectionWriting>
                <ProtectionHeader>작성한 임시 보호 글</ProtectionHeader>
                {posts.length === 0 ? (
                    <NoDataMessage>작성한 임시 보호 글이 없습니다.</NoDataMessage>
                ) : (
                    posts
                    .slice() 
                    .sort((a, b) => new Date(a.postDate) - new Date(b.postDate)) 
                    .slice(0, visiblePosts).map((post) => (
                        <ProtectionContent key={post.adoptPostId} onClick={() => handlePostClick(post.adoptPostId, 'adopt')}>
                            <ProtectionImg src={post.imageUrls[0]} alt="pet" />
                            <ProtectionRectangle>
                                <ProtectionDate>{formatDate(post.postDate)}</ProtectionDate>
                                <ProtectionPetName>{post.name || '이름 없음'}</ProtectionPetName>
                            </ProtectionRectangle>
                        </ProtectionContent>
                    ))
                )}
                {visiblePosts < posts.length && (  // 글이 3개 이상일 때만 더보기 버튼 활성화
                    <MoreBtn onClick={handleLoadMorePosts}>더보기</MoreBtn>
                )}
            </ProtectionWriting>

            <MyReview>
                <ReviewHeader>작성한 입양 후기</ReviewHeader>
                {reviews.length === 0 ? (
                    <NoDataMessage>작성한 입양 후기가 없습니다.</NoDataMessage>
                ) : (
                    reviews
                        .slice() // 원본 배열을 변경하지 않기 위해 복사
                        .sort((a, b) => new Date(a.reviewDate) - new Date(b.reviewDate)) // 날짜 기준 오름차순 정렬
                        .slice(0, visibleReviews) 
                        .map((review, index) => (
                            <ReviewContent key={index} onClick={() => handleReviewClick(review.reviewId)}>
                                <ReviewImg src={review.images[0].fileName} alt="pet" />
                                <ReviewRectangle>
                                    <ReviewDate>
                                        {formatDate(review.reviewDate)}
                                    </ReviewDate>
                                    <ReviewPetName>
                                        {review.content.length > 20 ? `${review.content.slice(0, 20)}...` : review.content || '내용 없음'}
                                    </ReviewPetName>
                                </ReviewRectangle>
                            </ReviewContent>
                        ))
                )}
                {visibleReviews < reviews.length && (
                    <MoreBtn onClick={handleLoadMoreReviews}>더보기</MoreBtn>
                )}
            </MyReview>
        </WritingWrapper>
    );
}


const WritingWrapper = styled.div`
    min-height: 80vh;
    display: flex;
    justify-content: space-between; 
    width: 100%;
    margin-top: 60px; 
    margin-bottom: 30px; 
`;

const ProtectionWriting = styled.div`
	min-height: 60vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: flex-start;
    width: 50%;
`;

const ProtectionHeader = styled.span`
    color: black;
    font-size: 32px;
    font-family: Inter, sans-serif;
    font-weight: 800;
    margin-left: 80px;
    margin-bottom: 20px;
`;

const ProtectionContent = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: flex-start;
    align-items: center;
    align-self: space-between;
	margin-bottom: 7px;
    margin-top: 10px;
    margin-left: 80px;
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

const ProtectionImg = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%; 
    margin-right: 25px; 
    margin-left: 15px; 
`;

const ProtectionRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.40);
    border-radius: 16px; 
    width: 75%;
	height: 65%;
`;

const ProtectionDate = styled.span`
    color: rgba(0, 0, 0, 0.6);
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-left: 17px;
    margin-bottom: 8px; 
`;

const ProtectionPetName = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
    margin-left: 17px;
`;

const NoDataMessage = styled.div`
    color: rgba(0, 0, 0, 0.6);
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-left: 80px;
    margin-top: 25px;
`;

const MyReview = styled.div`
    min-height: 60vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
`;


const ReviewHeader = styled.span`
    color: black;
    font-size: 32px;
    font-family: Inter, sans-serif;
    font-weight: 800;
    margin-left: 80px;
    margin-bottom: 20px;
`;


const ReviewContent = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: flex-start;
    align-items: center;
    align-self: space-between;
	margin-bottom: 7px;
    margin-top: 10px;
    margin-left: 80px;
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


const ReviewImg = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%; 
    margin-right: 25px; 
    margin-left: 15px; 
`;

const ReviewRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.40);
    border-radius: 16px; 
    width: 75%;
	height: 65%;
`;

const ReviewDate = styled.span`
    color: rgba(0, 0, 0, 0.6);
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-left: 17px;
    margin-bottom: 8px; 
`;

const ReviewPetName = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
    margin-left: 17px;
`;


const MoreBtn = styled.button`
    color: rgba(0, 0, 0, 0.6);
    border: none;
    background: none;
	font-size: 18px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-decoration: underline;
    align-self: flex-end;
    margin-top: 20px;
    margin-right: 150px;

    &:hover {
        transform: scale(1.1);
    }

`;
