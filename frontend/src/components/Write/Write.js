import { useState } from 'react';
import styled from 'styled-components';
import ProfileInfo from './ProfileInfo';
import WriteText from './WriteText';

function Write() {
    const [profile, setProfile] = useState({
        dogname: "",
        species: "",
        age: "",
        period: "",
        phonenum: "",
        tnr: true
    });

    const [content, setContent] = useState("");


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
            <InputImg>이미지 첨부</InputImg>
            <PsotButton>등록하기</PsotButton>
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
    margin-left: 319px;
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

const InputImg = styled.div`
`

const PsotButton = styled.button`
    display: block;
    margin-left: 1180px;
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