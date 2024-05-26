import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Choco from "../../assets/Choco.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export function Mypage() {

    return (
        <MypageRootWrapper>
            <MyInfoWrapper>
                <MyInfoHeader>내 정보</MyInfoHeader>
                <MyInfoRectangle>
                    <BoxContainer>
                        <Text>이름</Text>
                        <InfoSpan data-info="name">홍길동</InfoSpan>
                    </BoxContainer>
                    <BoxContainer>
                        <Text>닉네임</Text>
                        <InfoSpan data-info="nickname">홍홍</InfoSpan>
                    </BoxContainer>
                    <BoxContainer>
                        <Text>아이디</Text>
                        <InfoSpan data-info="id">hong</InfoSpan>
                    </BoxContainer>
                    <BoxContainer>
                        <Text>이메일</Text>
                        <InfoSpan data-info="email">hong@gmail.com</InfoSpan>
                    </BoxContainer>
                    <BoxContainer>
                        <PasswordChangeButton as={Link} to="/mypage/passwordChange">비밀번호 변경하기</PasswordChangeButton>
                    </BoxContainer>
                    <BoxContainer>
                        <WithdrawButton>탈퇴하기</WithdrawButton>
                    </BoxContainer>
                </MyInfoRectangle>
            </MyInfoWrapper>


            <MyPetWrapper>
                <HeaderWrapper>
                    <MypetHeader>나의 반려견 정보</MypetHeader>
                    <MypetRegisterBtn>
                        <FontAwesomeIcon icon={faPlus} />
                        <MypetRegisterBtnText>반려견 등록하기</MypetRegisterBtnText>
                    </MypetRegisterBtn>
                </HeaderWrapper>

                <ScrollContainer>
                    <MyPetWrapperFlex>
                        <MypetContainer>
                            <MypetContent>
                                <MypetImg src={Choco}/>
                                <MypetRectangle>
                                    <MypetBoxContainer>
                                        <Mypetname>초코</Mypetname>
                                        <MypetEdit>프로필 수정</MypetEdit>
                                    </MypetBoxContainer>

                                    <ContentContainer>
                                        <MypetText>남</MypetText>
                                        <MypetText>중성화 O</MypetText>
                                        <MypetText>5살</MypetText>
                                        <MypetText>믹스</MypetText>
                                        <MypetText>크림입, 흰양말, 주황눈썹</MypetText>
                                    </ContentContainer>
                                </MypetRectangle>
                            </MypetContent>
                            <MypetHistoryBtn>감정 해독 결과 히스토리 보기</MypetHistoryBtn>
                        </MypetContainer>

                        <MypetContainer>
                            <MypetContent>
                                <MypetImg src={Choco}/>
                                <MypetRectangle>
                                    <MypetBoxContainer>
                                        <Mypetname>초코</Mypetname>
                                        <MypetEdit>프로필 수정</MypetEdit>
                                    </MypetBoxContainer>

                                    <ContentContainer>
                                        <MypetText>남</MypetText>
                                        <MypetText>중성화 O</MypetText>
                                        <MypetText>5살</MypetText>
                                        <MypetText>믹스</MypetText>
                                        <MypetText>크림입, 흰양말, 주황눈썹</MypetText>
                                    </ContentContainer>
                                </MypetRectangle>
                            </MypetContent>
                            <MypetHistoryBtn>감정 해독 결과 히스토리 보기</MypetHistoryBtn>
                        </MypetContainer>

                        <MypetContainer>
                            <MypetContent>
                                <MypetImg src={Choco}/>
                                <MypetRectangle>
                                    <MypetBoxContainer>
                                        <Mypetname>초코</Mypetname>
                                        <MypetEdit>프로필 수정</MypetEdit>
                                    </MypetBoxContainer>

                                    <ContentContainer>
                                        <MypetText>남</MypetText>
                                        <MypetText>중성화 O</MypetText>
                                        <MypetText>5살</MypetText>
                                        <MypetText>믹스</MypetText>
                                        <MypetText>크림입, 흰양말, 주황눈썹</MypetText>
                                    </ContentContainer>
                                </MypetRectangle>
                            </MypetContent>
                            <MypetHistoryBtn>감정 해독 결과 히스토리 보기</MypetHistoryBtn>
                        </MypetContainer>
                    </MyPetWrapperFlex>
                </ScrollContainer>
            </MyPetWrapper>


            



        {/*<NaN_0002>
        작성한 임시 보호 글
      </NaN_0002>
      <ColorSwatch_0001/>
      
      <Rectangle174/>
      <NaN_0016>
        초코
      </NaN_0016>
      
      <Rectangle175 src="grida://assets-reservation/images/193:912" alt="image of Rectangle175"/>
      <_202403171604>
        2024.03.17 16:04
      </_202403171604>
      
      <NaN_0014>
        더보기
      </NaN_0014>
      <NaN_0003>
        작성한 입양 후기
      </NaN_0003> */}
      
        </MypageRootWrapper>
    );
}

const MypageRootWrapper = styled.div`
	min-height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
`;

const MyInfoWrapper = styled.div`
	min-height: 60vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;

`;

const MyInfoHeader = styled.span`
    color: black;
    text-overflow: ellipsis;
    font-size: 32px;
    font-family: Inter, sans-serif;
    font-weight: 800;
    text-align: left;
    position: center;
    margin-bottom: 30px;
`;

const MyInfoRectangle = styled.div`
	display: flex;
	flex-direction: column;
    position: relative;
    background-color: rgb(255, 243, 199);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
	border: solid 1px rgb(235, 235, 235);
	border-radius: 16px;
	width: 510px;
	height: 360px;

`;

const BoxContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
	margin-bottom: 7px;
    margin-top: 25px;
`;

const Text = styled.span`
    position: relative;
	color: black;
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: bold;
    margin-left: 30px;
`;

const InfoSpan = styled.span`
	color: rgb(0, 0, 0, 0.6);
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-right: 30px;
`;

const PasswordChangeButton = styled.button`
	color: black;
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: bold;
    margin-left: 30px;
    border: none;

    &:hover {
        text-decoration: underline;
    }
`;

const WithdrawButton = styled.span`
	color: rgba(0, 0, 0, 0.6);
	text-overflow: ellipsis;
	font-size: 16px;
	font-family: Inter, sans-serif;
	font-weight: 400;
    margin-left: 30px;
    margin-top: -8px;
    border: none;

    &:hover {
        text-decoration: underline;
    }
`;

const MyPetWrapper = styled.div`
	min-height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
    margin-bottom: 30px;
    width: 100%;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const MypetHeader = styled.span`
    color: black;
    font-size: 32px;
    font-family: Inter, sans-serif;
    font-weight: 800;
    text-align: center;
    flex: 1;  /* 헤더가 중간에 위치 */
    margin-left: 270px;
`;

const MypetRegisterBtn = styled.button`
	color: white;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: right;
    border: 2px;
    border-radius: 25px;
    background-color: rgb(252, 129, 158);
    padding: 10px 20px;
    margin-right: 20px;

    &:hover {
        background-color: white;
        border: 1px rgb(252, 129, 158);
        color: rgb(252, 129, 158);
    }
`;

const MypetRegisterBtnText = styled.span`
    margin-left: 5px;
`;

const ScrollContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 20px;
    white-space: nowrap; 
    overflow-x: scroll;

    scrollbar-width: none; 
    -ms-overflow-style: none; 
    &::-webkit-scrollbar {
        display: none; 
    }
`;

const MyPetWrapperFlex = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    margin-left: 80px;
`;

const MypetContainer = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: flex-start;
    align-items: center;
    align-self: flex-start;
	margin-bottom: 7px;
    margin-top: 25px;
    margin-left: 30px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
	border: solid 1px rgb(235, 235, 235);
	border-radius: 16px;
	width: 33%;
    height: 94%;
	background-color: rgb(255, 230, 230);
	box-sizing: border-box;
	padding: 16px;
    flex-shrink: 0;
`;

const MypetImg = styled.img`
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 50%; 
    margin-right: 25px; 
    margin-left: 15px; 
    margin-top: 50px;
`;

const MypetContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%; 
`;

const MypetRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.40);
    border-radius: 16px; 
    width: 75%;
	height: 80%;
`;

const MypetBoxContainer = styled.div`
    display: flex;
    align-items: center;
	margin-bottom: 25px;
    margin-left: 17px;
    margin-top: 10px;
`;

const Mypetname = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 24px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
`;

const MypetEdit = styled.button`
	color: rgb(252, 129, 158);
	font-size: 14px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-align: center;
    background: none;
    border-color: rgb(252, 129, 158);
    border-radius: 25px;
    margin-left: 20px;

    &:hover {
        background-color: rgb(252, 129, 158);
        color: white;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const MypetText = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-left: 17px;
    margin-bottom: 8px; 
`;

const MypetHistoryBtn = styled.button`
	color: white;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: center;
	background-color: rgb(252, 129, 158);
    border: none;
    border-radius: 10px;
    width: 68%;
    padding: 10px; 
    margin-top: 10px;
    align-self: flex-end; 

    &:hover {
        background-color: white;
        border: 1px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
        outline: none;
    }
`;







const NaN_0002 = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 32px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
	position: absolute;
	left: calc((calc((50% + -504px)) - 132px));
	top: 1130px;
`;

const NaN_0003 = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 32px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: left;
	position: absolute;
	left: calc((calc((50% + 152px)) - 113px));
	top: 1130px;
`;



const ColorSwatch_0001 = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	align-items: flex-start;
	flex: none;
	gap: 16px;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
	border: solid 1px rgb(235, 235, 235);
	border-radius: 16px;
	width: 594px;
	height: 121px;
	background-color: rgb(255, 230, 230);
	box-sizing: border-box;
	padding: 16px;
	position: absolute;
	left: 84px;
	top: 1204px;
`;


const Rectangle174 = styled.div`
	width: 447px;
	height: 90px;
	background-color: rgba(255, 255, 255, 0.26);
	border-radius: 10px;
	position: absolute;
	left: 211px;
	top: 1220px;
`;

const _202403171604 = styled.span`
	color: rgba(0, 0, 0, 0.6);
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	line-height: 15px;
	text-align: left;
	width: 221px;
	position: absolute;
	left: 233px;
	top: 1242px;
`;


const NaN_0014 = styled.span`
	color: rgba(0, 0, 0, 0.6);
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	line-height: 15px;
	text-align: left;
	text-decoration: underline;
	width: 57px;
	position: absolute;
	left: 621px;
	top: 1619px;
`;


const NaN_0016 = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	line-height: 15px;
	text-align: left;
	width: 162px;
	min-height: 19px;
	position: absolute;
	left: 233px;
	top: 1272px;
	height: 19px;
`;


const Rectangle175 = styled.img`
	width: 84px;
	height: 84px;
	object-fit: cover;
	position: absolute;
	left: 104px;
	top: 1220px;
`;

