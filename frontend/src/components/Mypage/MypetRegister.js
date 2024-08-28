import React, { useState, useRef } from "react";
import petRegisterImg from "../../assets/petRegister.jpg"
import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import { PetRadioGroup } from './petRadioGroup';
import { PetRadio } from './petRadio';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function MypetRegisterPage() {

    // 반려견 정보 
    const [petInfo, setPetInfo] = useState({
        name: "",
        age: "",
        breed: "",
        sex: "",
        image: null,
        neuter: null,
        feature: "",
    }); 

    const navigate = useNavigate();

    const [file, setFile] = useState(null); 
    const fileInputRef = useRef(null);

    const imgUpload = e => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setFile(selectedImage);
            setPetInfo(prevState => ({
                ...prevState,
                image: URL.createObjectURL(selectedImage)
            }));
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    // 폼에서 변경 이벤트 처리 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 등록하기 
    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("authToken");

            // FormData 객체 생성
            const formData = new FormData();
            formData.append("pet", new Blob([JSON.stringify({
                name: petInfo.name,
                age: petInfo.age,
                breed: petInfo.breed,
                sex: petInfo.sex,
                neuter: petInfo.neuter ? 1 : 0,
                feature: petInfo.feature,
            })], { type: "application/json" }));
    

            if (file) {
                formData.append("file", file); // 이미지 파일 추가
            }

            const response = await axios.post(
                "/pet/register",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // 'Content-Type': 'application/json' 
                    },
                }
            );

            if (response.data.success) {
                toast.success('반려견 등록에 성공했습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
                console.log("반려견 등록 성공:", response.data);
                navigate('/mypage');
            } else {
                toast.error('반려견 등록에 실패했습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
                console.error("반려견 등록 실패:", response.data.message);
            }
        } catch (error) {
            console.error("반려견 등록 중 오류 발생:", error);
        }
    };


    return (
        <MyPetWrapper>
                <MypetHeader>반려견 등록하기</MypetHeader>
                <ContentContainer>
                    <LeftContent>
                        <MypetImg onClick={handleUploadButtonClick}> 
                            {petInfo.image? 
                                <RPImg src={petInfo.image} alt="Uploaded Image"/> :
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
                                type="text"
                                name="name"
                                value={petInfo.name}
                                onChange={handleChange}
                            />
                        </BoxContainer>
                        <PetRadioGroup label="성별" value={petInfo.sex} onChange={value => setPetInfo(prevState => ({ ...prevState, sex: value }))}>
                            <PetRadio value="남">남</PetRadio>
                            <PetRadio value="여">여</PetRadio>
                        </PetRadioGroup>
                        <PetRadioGroup label="중성화 여부" value={petInfo.neuter} onChange={value => setPetInfo(prevState => ({ ...prevState, neuter: value }))}>
                            <PetRadio value="예">예</PetRadio>
                            <PetRadio value="아니오">아니오</PetRadio>
                        </PetRadioGroup>
                    </CenterContent>

                    <RightContent>
                        <BoxContainer>
                            <Text> 나이 </Text>
                            <ContentInputBox
                                type="text"
                                name="age"
                                value={petInfo.age}
                                onChange={handleChange}
                            />
                        </BoxContainer>
                        <BoxContainer>
                            <Text> 견종 </Text>
                            <ContentInputBox
                                type="text"
                                name="breed"
                                value={petInfo.breed}
                                onChange={handleChange}
                            />
                        </BoxContainer>
                        <BoxContainer>
                            <Text> 특징 </Text>
                            <ContentInputBox
                                type="text"
                                name="feature"
                                value={petInfo.feature}
                                onChange={handleChange}
                            />
                        </BoxContainer>
                    </RightContent>
                </ContentContainer>
                
                <MypetRegisterBtn onClick={handleSubmit}>등록하기</MypetRegisterBtn>
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

const MypetRegisterBtn = styled.button`
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
