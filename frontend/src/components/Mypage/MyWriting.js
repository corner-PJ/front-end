import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Choco from "../../assets/Choco.jpg"
import axios from "axios";

export function MyWriting() {
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState([]);

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
                } else {
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
                    console.error("입양 후기 글 목록 조회 실패:", response.data.message);
                }
            } catch (error) {
                console.error("입양 후기 글 목록을 불러오는 중 오류 발생:", error);
            } 
        };

        fetchReviews();
    }, []);



    return (
        <WritingWrapper>
            <ProtectionWriting>
                <ProtectionHeader>작성한 임시 보호 글</ProtectionHeader>
                {posts.length === 0 ? (
                    <TextX>작성한 임시 보호 글이 없습니다.</TextX>
                ) : (
                    posts.map((post, index) => (
                        <ProtectionContent key={index}>
                            <ProtectionImg src={post.imageUrls[0] || Choco} alt="pet" />
                            <ProtectionRectangle>
                                <ProtectionDate>{post.createdAt || '날짜 정보 없음'}</ProtectionDate>
                                <ProtectionPetName>{post.name || '이름 없음'}</ProtectionPetName>
                            </ProtectionRectangle>
                        </ProtectionContent>
                    ))
                )}

                <MoreBtn>더보기</MoreBtn>
            </ProtectionWriting>

            <MyReview>
                <ReviewHeader>작성한 입양 후기</ReviewHeader>
                {reviews.length === 0 ? (
                    <TextX>작성한 임시 보호 글이 없습니다.</TextX>
                ) : (
                    reviews.map((reviews, index) => (
                        <ReviewContent key={index}>
                            <ReviewImg src={reviews.imageUrls[0] || Choco} alt="pet" />
                            <ReviewRectangle>
                                <ReviewDate>{reviews.createdAt || '날짜 정보 없음'}</ReviewDate>
                                <ReviewPetName>{reviews.name || '이름 없음'}</ReviewPetName>
                            </ReviewRectangle>
                        </ReviewContent>
                    ))
                )}

                <MoreBtn>더보기</MoreBtn>
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

const TextX = styled.div`
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
    margin-right: 90px;

    &:hover {
        transform: scale(1.1);
    }

`;
