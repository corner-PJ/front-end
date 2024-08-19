import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import WriteText from './WriteText';
import ImgIcon from '../../assets/InputImg.png';
import axios from 'axios';

function ListWrite() {
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
    const [dogImgFiles, setDogImgFiles] = useState([]);
    const fileInputRef = useRef(null);

    // // localStorage에서 토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('authToken');

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
            alert("이미지는 최대 10개까지 업도르할 수 있습니다.");
            return;
        }

        fileInputRef.current.click();
    };

    const handleRemoveButtonClick = (index) => {
        setDogImg(prevImages => prevImages.filter((_, i) => i !== index));
        setDogImgFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }

    // 임보 공고 작성
    const handleSubmit = async () => {
        if (!profile.dogname || !profile.species || !profile.age || !profile.phonenum || !content) {
            alert("모든 필드를 작성해 주세요.");
            return;
        }

        if (dogImg.length === 0) {
            alert("이미지를 최소 1장 이상 업로드해야 합니다.");
            return;
        }

        const formData = new FormData();
        // console.log(profile);
        // console.log(content);
        
        // 내용 저장
        const blob = new Blob([JSON.stringify({
            content: content,
            name: profile.dogname,
            breed: profile.species,
            sex: "Unknown",
            age: profile.age,
            phone: profile.phonenum,
            duration: profile.period,
            neutering: profile.tnr,
        })], {type: 'application/json'});
        formData.append('adoptPostDTO', blob, { contentType: 'application/json' });

        // 이미지 저장
        dogImgFiles.forEach((file) => {
            formData.append('images', file);
        });

        try {
            console.log("공고 내용 확인", [...formData]);

            const response = await axios.post(`/adoptPost`, formData, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                },
            });

            if (response.data.success) {
                alert('입양 공고가 등록되었습니다.');
                navigate('/list?type=adopt');
            } else {
                alert('입양 공고 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('공고 등록 실패:', error);

            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                alert('토큰이 만료되었습니다. 다시 로그인하세요.');
                navigate('/login');
            }           
        }
    };

    const voicedata = [
        {
            id: 1,
            name: "청년 - 여",
        },
        {
            id: 2,
            name: "중/장년 - 남",
        },
        {
            id: 3,
            name: "청년 - 남",
        },
    ];

    const namedata = [
        {
            id: 1,
            name: "별이",
        },
        {
            id: 2,
            name: "설이",
        },
        {
            id: 3,
            name: "몽이",
        },
    ];

    return (
        <WritePageContainer>
            <MainTitle>입양 공고</MainTitle>
            <WriteContainer>
                <ProfileInfo profile={profile} setProfile={setProfile} />
                <AIResult>
                    <Reaction>
                        <ResultTilte>목소리 반응 결과</ResultTilte>
                        <ResultItme>
                            {voicedata.map((item, index) => (
                                <ResultRank key={item.id}>
                                    <Result>{item.name}</Result>
                                    <Rank>{index + 1}순위</Rank>
                                </ResultRank>
                            ))}
                        </ResultItme>
                    </Reaction>
                    <div style={{ borderLeft: "2px solid #545454", height: "100%" }} />
                    <Reaction>
                        <ResultTilte>이름 반응 결과</ResultTilte>
                        <ResultItme>
                            {namedata.map((item, index) => (
                                <ResultRank key={item.id}>
                                    <Result>{item.name}</Result>
                                    <Rank>{index + 1}순위</Rank>
                                </ResultRank>
                            ))}
                        </ResultItme>
                    </Reaction>
                </AIResult>
                <WriteText content={content} setContent={setContent} />
                <ImgContainer>
                    <FileContainer onClick={handleUploadButtonClick}>
                        <FileIcon src={ImgIcon} alt="ImgIcon" />
                        <FileText>이미지 선택</FileText>
                        <FileText>{dogImg ? dogImg.length : 0}/10</FileText>
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
            </WriteContainer>
            <PsotButton onClick={handleSubmit}>등록하기</PsotButton>
        </WritePageContainer>
    );
}

const WritePageContainer = styled.div`
    margin: 50px;
`

const WriteContainer = styled.div`
    margin-left: 15em;
`

const MainTitle = styled.div`
    font-size: 2.5em;
    font-weight: bold;
    margin: 50px 0;
    text-align: center;
`

const AIResult = styled.div`
    width: 1080px;
    height: 130px;
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
    gap: 20px;
    flex-wrap: nowrap;
    justify-content: center;
`

const ResultRank = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    margin-top: 30px;
`

const Result = styled.div`
    display: inline-block;
    font-size: 1.3em;
    padding: 10px 15px;
    background: #FFF3C7;
    border: none;
    border-radius: 20px;
    width: 5.6em;
    box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3);    
`

const Rank = styled.div`
    display: inline-block;
    font-size: 1.3em;
    padding: 10px 15px;
    width: 5.6em;
`

const ImgContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: left;
    width: 1150px;
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

export default ListWrite;