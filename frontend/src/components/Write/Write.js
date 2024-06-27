import { useRef, useState } from 'react';
import styled from 'styled-components';
import ProfileInfo from './ProfileInfo';
import WriteText from './WriteText';
import ImgIcon from '../../assets/InputImg.png'
import { useListContext } from '../ListContext';
import { useNavigate } from 'react-router-dom';

function Write() {
    const { addList } = useListContext();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        dogname: "",
        species: "",
        age: "",
        period: "",
        phonenum: "",
        tnr: null,
    });

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

    const handleSubmit = () => {
        if (!profile.dogname || !profile.species || !profile.age || !profile.phonenum || !content) {
            alert("모든 필드를 작성해 주세요.");
            return;
        }

        if (dogImg.length === 0) {
            alert("이미지를 최소 1장 이상 업로드해야 합니다.");
            return;
        }
        
        const newPost = {
            id: Date.now(), 
            dogName: profile.dogname,
            species: profile.species,
            age: profile.age,
            period: profile.period,
            img: dogImg,  
            text: content,
            tnr: profile.tnr,
            type: "Adopt"
        };

        const type = profile.period ? 'Adopt' : 'Shelter'; 
        addList(newPost, type);
        navigate('/list');
    };

    const voicedata = [
        {
            id: 1,
            name: "중/장년 - 남",
        },
        {
            id: 2,
            name: "청소년 - 여",
        },
        {
            id: 3,
            name: "청년 - 남",
        },
    ]

    const namedata = [
        {
            id: 1,
            name: "초코",
        },
        {
            id: 2,
            name: "까미",
        },
        {
            id: 3,
            name: "쿠키",
        },
    ]

    return (
        <WritePageContainer>
            <MainTitle>입양 공고</MainTitle>
            <ProfileInfo profile={profile} setProfile={setProfile} />
            <AIResult>
                <Reaction>
                    <ResultTilte>목소리 반응 결과</ResultTilte>
                    <ResultItme>
                        {voicedata.map((item) => (
                        <Result>{item.name}</Result>
                    ))}
                    </ResultItme>              
                </Reaction>
                <div style={{borderLeft: "2px solid #545454", height: "100%"}} />
                <Reaction>
                    <ResultTilte>이름 반응 결과</ResultTilte>
                    <ResultItme>
                        {namedata.map((item) => (
                        <Result>{item.name}</Result>
                    ))}
                    </ResultItme>
                    
                </Reaction>
            </AIResult>
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
            <PsotButton onClick={handleSubmit}>등록하기</PsotButton>
        </WritePageContainer>
    )
}

const WritePageContainer = styled.div`
    margin: 50px;
    text-align: center;
`

const MainTitle = styled.div`
    font-size: 2.5em;
    font-weight: bold;
    margin: 50px 0;
`

const AIResult = styled.div`
    width: 1080px;
    height: 130px;
    margin-left: 14em;
    border: 2px solid #000000;
    border-radius: 15px;
    padding: 30px 30px 40px;
    display: flex;
    gap: 30px;
    text-align: center;
`

const Reaction = styled.div`
    width: 50%;
`

const ResultTilte = styled.div`
    font-size: 1.3em;
    font-weight: bold;
    text-align: left;
    margin-left: 20px;
`

const ResultItme = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 50px 0 0 20px;
    gap: 20px;
`

const Result = styled.div`
    display: inline-block;
    font-size: 1.3em;
    padding: 10px 20px;
    background: #FFF3C7;
    border: none;
    border-radius: 20px;
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
    margin-left: 44em;
    padding: 15px 80px;
    color: #FFFFFF;
    font-size: 25px;
    font-weight: bold;
    background-color: #FC819E;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);    
`

export default Write;