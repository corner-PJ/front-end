import React from "react";
import styled from "@emotion/styled";
import Choco from "../../assets/Choco.jpg"


export function MyWriting() {

    return (
            <WritingWrapper>
            <ProtectionWriting>
                <ProtectionHeader>작성한 임시 보호 글</ProtectionHeader>
                <ProtectionContent>
                    <ProtectionImg src={Choco} />
                    <ProtectionRectangle>
                        <ProtectionDate>2024.03.17 16:04</ProtectionDate>
                        <ProtectionPetName>초코</ProtectionPetName>
                    </ProtectionRectangle>
                </ProtectionContent>
                <ProtectionContent>
                    <ProtectionImg src={Choco} />
                    <ProtectionRectangle>
                        <ProtectionDate>2024.03.17 16:04</ProtectionDate>
                        <ProtectionPetName>초코</ProtectionPetName>
                    </ProtectionRectangle>
                </ProtectionContent> <ProtectionContent>
                    <ProtectionImg src={Choco} />
                    <ProtectionRectangle>
                        <ProtectionDate>2024.03.17 16:04</ProtectionDate>
                        <ProtectionPetName>초코</ProtectionPetName>
                    </ProtectionRectangle>
                </ProtectionContent>

                <MoreBtn>더보기</MoreBtn>
            </ProtectionWriting>

            <MyReview>
                <ReviewHeader>작성한 입양 후기</ReviewHeader>
                <ReviewContent>
                    <ReviewImg src={Choco} />
                    <ReviewRectangle>
                        <ReviewDate>2024.03.17 16:04</ReviewDate>
                        <ReviewPetName>초코</ReviewPetName>
                    </ReviewRectangle>
                </ReviewContent>
                <ReviewContent>
                    <ReviewImg src={Choco} />
                    <ReviewRectangle>
                        <ReviewDate>2024.03.17 16:04</ReviewDate>
                        <ReviewPetName>초코</ReviewPetName>
                    </ReviewRectangle>
                </ReviewContent>
                <ReviewContent>
                    <ReviewImg src={Choco} />
                    <ReviewRectangle>
                        <ReviewDate>2024.03.17 16:04</ReviewDate>
                        <ReviewPetName>초코</ReviewPetName>
                    </ReviewRectangle>
                </ReviewContent>

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