import styled from 'styled-components';
import LoadingImage from '../../assets/dogLogo.png';

function Loading({ text, progress }) {
    return (
        <LoadingContainer>
            <LoadingImg src={LoadingImage} />
            <LoadingText>{text}</LoadingText>
            <LoadingBarContainer>
                <LoadingBar  progress={progress}/>
            </LoadingBarContainer>
        </LoadingContainer>
    );
}

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fff;
`;

const LoadingImg = styled.img`
    margin-bottom: 70px;
`;

const LoadingText = styled.p`
    font-size: 40px;
    font-weight: bold;
    color: #333;
    margin-bottom: 60px;
`;

const LoadingBarContainer = styled.div`
    position: relative;
    width: 70%;
    height: 10px;
    background-color: #D9D9D9;
    border-radius: 5px;
`;

const LoadingBar = styled.div`
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: #555555;
    border-radius: 5px;
`;

export default Loading;
