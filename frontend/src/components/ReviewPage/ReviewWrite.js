import { useRef, useState } from 'react';
import styled from 'styled-components';
import WriteText from './WriteText';
import ImgIcon from '../../assets/InputImg.png'

function ReviewWrite() {
    const [content, setContent] = useState("");

    const [dogImg, setDogImg] = useState([]);
    const fileInputRef = useRef(null);

    const ImgUpload = e => {
        const selectedImg = e.target.files;
        if (dogImg.length + selectedImg.length > 10) {
            alert("이미지는 최대 10개까지 업도르할 수 있습니다.");
            return;
        } 
        
        const newImages = Array.from(selectedImg).map(file => URL.createObjectURL(file));
        setDogImg(prevImages => [...prevImages, ...newImages]);
    };

    const handleUploadButtonClick = () => {
        if (dogImg.length >= 10) {
            alert("이미지는 최대 10개까지 업도르할 수 있습니다.");
            return;
        }

        fileInputRef.current.click();
    };

    const handleRemoveButtonClick = (index) => {
        setDogImg(prevImages => prevImages.filter((_, i) => i !== index));
    }

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
            <PsotButton>등록하기</PsotButton>
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