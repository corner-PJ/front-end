import React, { useState, useRef } from "react";
import petRegisterImg from "../../assets/petRegister.jpg"
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import { PetRadioGroup } from './petRadioGroup';
import { PetRadio } from './petRadio';


export function MypetEditPage() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [characteristic, setCharacteristic] = useState('');
    const [image, setImage] = useState(null);
    const [gender, setGender] = useState(null);
    const [neutering, setNeutering] = useState(null);

    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
    const imgUpload = e => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const moveToMypage = () => {
        navigate('/mypage/');
    };

    return (
        <MyPetWrapper>
                <MypetHeader>반려견 정보 수정하기</MypetHeader>
                <ContentContainer>
                    <LeftContent>
                        <MypetImg onClick={handleUploadButtonClick}> 
                            {image ? 
                                <RPImg src={image} alt="Uploaded Image"/> :
                                <RPImg src={petRegisterImg} alt="Default Image" />
                            }
                            <HiddenFileInput 
                                ref={fileInputRef}
                                type="file" 
                                accept="image/*" 
                                onChange={imgUpload} 
                            />
                        </MypetImg>
                    </LeftContent>

                    <CenterContent>
                        <BoxContainer>
                            <Text> 이름 </Text>
                            <ContentInputBox
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </BoxContainer>
                        <PetRadioGroup label="성별" value={gender} onChange={setGender}>
                            <PetRadio value="남">남</PetRadio>
                            <PetRadio value="여">여</PetRadio>
                        </PetRadioGroup>
                        <PetRadioGroup label="중성화 여부" value={neutering} onChange={setNeutering}>
                            <PetRadio value="예">예</PetRadio>
                            <PetRadio value="아니오">아니오</PetRadio>
                        </PetRadioGroup>
                    </CenterContent>

                    <RightContent>
                        <BoxContainer>
                            <Text> 나이 </Text>
                            <ContentInputBox
                                type="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </BoxContainer>
                        <BoxContainer>
                            <Text> 견종 </Text>
                            <ContentInputBox
                                type="breed"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                            />
                        </BoxContainer>
                        <BoxContainer>
                            <Text> 특징 </Text>
                            <ContentInputBox
                                type="characteristic"
                                value={characteristic}
                                onChange={(e) => setCharacteristic(e.target.value)}
                            />
                        </BoxContainer>
                    </RightContent>
                </ContentContainer>
                
                <MypetEditBtn onClick={moveToMypage}>수정하기</MypetEditBtn>
                

        </MyPetWrapper>
    );
}


const MyPetWrapper = styled.div`
	min-height: 80vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
    margin-bottom: 10px;
    width: 100%;
`;

const MypetHeader = styled.span`
    color: black;
    font-size: 32px;
    font-family: Inter, sans-serif;
    font-weight: 800;
    text-align: center;
    align-items: center;
    flex: 1;  /* 헤더가 중간에 위치 */
`;

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 100px;
    gap: 20px;
    min-height: 55vh;
`;

const MypetImg = styled.div`
    width: 220px;
    height: 220px;
    object-fit: cover;
    border-radius: 50%; 
    justify-content: center;
    align-item: center;
    margin-bottom: 20px;
    margin-top: 55px;
    margin-left: 70px;
    position: relative;
    cursor: pointer;
`;

const RPImg = styled.img`
    width: 260px;
    height: 260px;
    border-radius: 50%;
    object-fit: cover;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const LeftContent = styled.div`
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
    width: 33.33%;
`;

const CenterContent = styled.div`
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: flex-start;
    width: 33.33%;
    padding-left: 20px;
`;

const RightContent = styled.div`
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: flex-start;;
    width: 33.33%;
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
	margin-bottom: 20px;
	min-height: 100px;
    width: 70%;
`;

const Text = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
	text-align: left;
	margin-bottom: 8px;
`;

const ContentInputBox = styled.input`
    font-size: 20px;
    border: solid 1px rgb(217, 217, 217);
    border-radius: 5px;
    padding-left: 20px;
    width: 100%; 
    max-width: 100%; 
    box-sizing: border-box; 
	height: 50px;
	margin-bottom: 30px;

    &:focus {
        border: 1px solid rgb(252, 129, 158);
        outline: none; 
    }
`;

const MypetEditBtn = styled.button`
	color: white;
	font-size: 30px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: center;
    justify-content: center;
    border: 2px;
    border-radius: 50px;
    background-color: rgb(252, 129, 158);
    padding: 10px 20px;
    margin-right: 25px;
    margin-bottom: 30px;
    width: 260px;

    &:hover {
        background-color: white;
        border: 2px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
    }
`;
