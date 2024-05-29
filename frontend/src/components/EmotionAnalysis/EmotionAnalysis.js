import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../assets/Emotionbackground.png'
import dogImg1 from '../../assets/dogImg1.png'
import dogImg2 from '../../assets/dogImg2.png'
import dogImg3 from '../../assets/dogImg3.png'
import dogImg4 from '../../assets/dogImg4.png'

function EmotionAnalysis() {
    const navigate = useNavigate();

    const goToAnalysis = () => {
        navigate(`/analysis/`);
    }

    return(
        <EmotionAnalysisContainer>
            <MianTitle>
                반려견의 감정을 해독해보세요
            </MianTitle>
            <MainImgContainer>                
                <MainImg src={dogImg2} style={{ top: '15%', left: '18%' }} />
                <MainImg src={dogImg1} style={{ top: '45%', left: '34%' }} />
                <MainImg src={dogImg3} style={{ top: '34%', left: '55%' }} />
                <MainImg src={dogImg4} style={{ top: '16%', left: '64%' }} />
            </MainImgContainer>
            <MainTextContainer>
                <MainText>
                입양한 반려견이 무슨 생각을 하는지 궁금하신가요?
                지금, 강아지의 감정을 알아내는 새로운 방법이 있습니다! 
                간단히 반려견의 동영상을 업로드하면, 강아지가 무엇을 
                느끼고 있는지를 신속하게 분석해 드립니다. 
                이렇게 분석된 강아지의 감정을 통해 더 깊은 이해를 얻고, 
                더 나은 동반자가 되어보세요.
                </MainText>
           </MainTextContainer>
            <StartButton onClick={() => goToAnalysis()}>
                시작하기
            </StartButton>
        </EmotionAnalysisContainer>
    )
}

const EmotionAnalysisContainer = styled.div`
    width: auto;
    height: 100%;
    background-image: url(${backgroundImg});
    margin-top: -90px;
    padding: 100px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const MianTitle = styled.div`
    font-size: 2em;
    font-weight: bold;
    text-align: center;
`

const MainImgContainer = styled.div`
    position: relative;
    width: 100%;
    height: 800px;
`;

const MainImg = styled.img`
    position: absolute;
    transform: scale(0.95);
 `;

const MainTextContainer= styled.div`
    margin-top: 80px;
    width: 900px;
`;

const MainText = styled.div`
    width: 100%;
    font-size: 25px;
    word-break: keep-all;
    white-space: pre-line;
    text-align: center;
`;

const StartButton = styled.button`
    margin: 80px 0;
    padding: 20px 80px;
    color: #000000;
    background: #FFFFFF;
    font-size: 30px;
    font-weight: bold;
    border: none;
    border-radius: 15px;
    box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.3);
`


export default EmotionAnalysis;