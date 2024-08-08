import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImgIcon from '../../assets/InputImg.png';
import WriteText from './WriteText';
import axios from 'axios';

import { useTokenContext } from '../TokenContext';

function ReviewWrite() {
    const [content, setContent] = useState("");
    const [dogImg, setDogImg] = useState([]);
    const [dogImgFiles, setDogImgFiles] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // // localStorage에서 토큰 가져오기
    // const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    // 임시로 context를 활용해 토큰 가져옴
    const { ACCESS_TOKEN } = useTokenContext();

    const ImgUpload = e => {
        const selectedFiles = e.target.files;
        if (dogImg.length + selectedFiles.length > 10) {
            alert("이미지는 최대 10개까지 업로드할 수 있습니다.");
            return;
        } 
        
        const newImageURLs = Array.from(selectedFiles).map(file => URL.createObjectURL(file));

        setDogImg(prevImages => [...prevImages, ...newImageURLs]);
        setDogImgFiles(prevFiles => [...prevFiles, ...selectedFiles]);    
    };

        const handleUploadButtonClick = () => {
        if (dogImg.length >= 10) {
            alert("이미지는 최대 10개까지 업로드할 수 있습니다.");
            return;
        }

        fileInputRef.current.click();
    };

    const handleRemoveButtonClick = (index) => {
        setDogImg(prevImages => prevImages.filter((_, i) => i !== index));
        setDogImgFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }

    // 리뷰 작성하기
    const handlePost = async () => {
        const formData = new FormData();

        // 리뷰 내용 저장
        const blob = new Blob([JSON.stringify({content: content})], {type: 'application/json'});
        formData.append('reviewDTO', blob, { contentType: 'application/json' });

        // 이미지 저장
        dogImgFiles.forEach((file) => {
            formData.append('images', file);
        });

        try {       
            // console.log("리뷰 내용 확인", [...formData]);
            const response = await axios.post('/reviews', formData, {
                headers: {
                    'Authorization' : `Bearer ${ACCESS_TOKEN}`,
                }
            });

            if (response.status === 200) {
                alert('입양 후기가 등록되었습니다.'); 
                navigate('/review')
            } else {
                alert("후기 등록에 실패했습니다.")
            }
        } catch (error) {
            console.error('후기 등록 오류:', error);

            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                alert('토큰이 만료되었습니다. 다시 로그인하세요.');
                navigate('/login');
            }   
        }
    };

    return (
        <WritePageContainer>
            <MainTitle>입양 후기</MainTitle>
            <WriteText content={content} setContent={setContent}/>
            <ImgContainer>
                    <FileContainer onClick={handleUploadButtonClick}>
                        <FileIcon src={ImgIcon} alt="ImgIcon" />
                        <FileText>이미지 선택</FileText>
                        <FileText>{dogImg ? dogImg.length : 0 }/10</FileText>
                        <UploadImg
                            type="file" 
                            accept="image/*" 
                            multiple
                            onChange={ImgUpload}
                            ref={fileInputRef}
                        />
                    </FileContainer>
                    {dogImg.map((imgSrc, index) => (
                        <Img key={index} src={imgSrc} onDoubleClick={() => handleRemoveButtonClick(index)} />
                    ))}
            </ImgContainer>
            <PsotButton onClick={handlePost}>등록하기</PsotButton>
        </WritePageContainer>
    )
}

const WritePageContainer = styled.div`
    margin: 50px 50px 120px;
    text-align: center;
`

const MainTitle = styled.div`
    font-size: 2.5em;
    font-weight: bold;
    margin: 50px 0 75px;
`

const ImgContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: left;
    width: 1150px;
    margin-left: 14em;
    margin-bottom: 20px;

`

const UploadImg = styled.input`
    display: none;
`

const FileContainer = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #000000;
    border-radius: 15px;
    padding: 20px;
    cursor: pointer;
`

const FileIcon = styled.img`
    width: 50px;
    height: 50px;
`

const FileText = styled.div`
    margin-top: 3px;
`

const Img = styled.img`
    width: 120px;
    height: 120px;
    border: 2px solid #000000;
    border-radius: 15px;
    padding: 10px;
`

const PsotButton = styled.button`
    display: block;
    margin-left: 52em;
    padding: 15px 60px;
    color: #FFFFFF;
    font-size: 22px;
    font-weight: bold;
    background-color: #FC819E;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);    
`

export default ReviewWrite;