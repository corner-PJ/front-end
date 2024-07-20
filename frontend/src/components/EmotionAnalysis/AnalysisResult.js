import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../assets/Emotionbackground.png'
import Choco from "../../assets/Choco.jpg"
import Loading from "../Loading/Loading"
import { useState, useEffect } from 'react';

function AnalysisResult() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(50); // 로딩바 길이 임의로 지정

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return(
        <>{ isLoading? <Loading text="감정분석중 · · ·" progress={progress} /> :
        <AnalysisResultContainer>
            <Header>
                <Title>뭉치의 감정 해독 결과</Title>
                <ResultDate>감정 해독 시각: 2024.03.15 금요일 오후 3시 12분</ResultDate>
            </Header>
            <ImgContainer>                
                <CurrentImg src={Choco} style={{ top: '15%', left: '18%' }} />
            </ImgContainer>
            <TextContainer>
                <Text>뭉치의 지금 기분은 </Text>
                <Result>"놀고 싶어요" 상태</Result>
                <Text>입니다.</Text>
           </TextContainer>
           <hr style={{margin: "85px 0"}}/>
           <ExplainResult>
                <ResultTitle>놀고 싶어요 상태란?</ResultTitle>
                <ResultDetail> 
 “놀고 싶어요 상태”는 반려견이 활발하고 호기심이 많은 때를 말합니다. 이는 보통 몸을 움직여 활동하고, 사물을 탐색하며, 사회적 상호작용을 즐기는 것으로 나타날 수 있습니다. 반려견이 놀고 싶어하는 것을 알아채는 것은 그들의 행복과 건강에 중요한 부분입니다. 그들이 충분한 운동과 자극을 받지 못할 경우, 불만족스러운 행동이 발생할 수 있으며, 이는 심지어 건강 문제로 이어질 수도 있습니다.

 놀이는 반려견과 주인 사이의 유대를 강화하고, 그들의 지적 및 신체적 요구를 충족시키는 좋은 방법입니다. 반려견이 놀고 싶어하는 신호를 파악하는 것은 중요합니다. 예를 들어, 그들이 장난감을 가져오거나 흔들고 뛰어다니는 경우, 또는 당신에게 애정 어린 시선을 보내는 경우 놀 준비가 되어 있다는 신호일 수 있습니다.

 그럴 때 주인으로서 어떤 행동을 취할지에 대해 생각해 봅시다. 우선적으로, 놀이 시간을 지정하는 것이 중요합니다. 규칙적인 운동은 반려견의 건강을 유지하는 데 도움이 됩니다. 또한, 반려견이 놀기를 원할 때는 주인이 이를 지원하고 적극적으로 참여해야 합니다. 이를 통해 주인과 반려견 간의 유대감이 강화될 뿐만 아니라, 반려견은 더욱 행복하고 만족스러운 삶을 살게 될 것입니다.
                </ResultDetail>
           </ExplainResult>
           <ButtonContainer>
                <ResultButton>
                    이미지로 저장하기
                </ResultButton>
                <ResultButton onClick={() => navigate(`/diary/new`)}>
                    감정 일기 기록하기
                </ResultButton>
           </ButtonContainer>
            
        </AnalysisResultContainer>
        }
        </>
    )
}

const AnalysisResultContainer = styled.div`
    width: auto;
    height: 100%;
    background-image: url(${backgroundImg});
    margin-top: -90px;
    padding: 100px 80px;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    margin: 50px;
`

const Title = styled.div`
    font-size: 2.8em;
    font-weight: bold;
`

const ResultDate = styled.div`
    margin: 20px;
    font-size: 1.1em;
`

const ImgContainer = styled.div`
    text-align: center;
    margin-top: 60px;
`

const CurrentImg = styled.img`
    width: 400px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);

`

const TextContainer = styled.div`
    text-align: center;
    margin-top: 40px;
`

const Text = styled.div`
    font-size: 1.6em;
`

const Result = styled.div`
    font-size: 2.2em;
    font-weight: bold;
    margin: 20px 0;

`

const ExplainResult = styled.div`
    margin: 0 30px;

`

const ResultTitle = styled.div`
    font-size: 1.8em;
    font-weight: bold;
    margin: 30px 0;

`

const ResultDetail = styled.div`
    font-size: 1.2em;
    margin: 30px 20px;
    line-height:2;
    word-break: keep-all;
    white-space: pre-line;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 60px;
    align-items: center;
    justify-content: center;
`

const ResultButton = styled.button`
    margin: 80px 0;
    padding: 19px 70px;
    color: #000000;
    background: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 15px;
    box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.3);
`


export default AnalysisResult;