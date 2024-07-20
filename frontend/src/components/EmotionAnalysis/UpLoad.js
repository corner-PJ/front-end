import styled from 'styled-components';
import { useState, useRef } from 'react';
import UpLoadIcon from '../../assets/UpLoadIcon.png';
import { useNavigate, useParams } from 'react-router-dom';

function UpLoad() {
    const [video, setVideo] = useState(null);
    const fileInputRef = useRef(null);
    const { selectedDog } = useParams();
    const navigate = useNavigate();

    const goToResult = () => {
        if (video === null) {
            alert("영상을 업로드 해주세요.");
            return;
        }
        console.log(selectedDog);
        navigate(`/result/${selectedDog}`);
    }

    const videoUpload = e => {
        const selectedVideo = e.target.files[0];
        if (selectedVideo) {
            setVideo(URL.createObjectURL(selectedVideo));
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };


    return (
        <UpLoadContainer>
            <Title>반려견의 모습이 담긴 영상을 첨부해주세요</Title>
            <VideoContainer onClick={handleUploadButtonClick}>
                {video ? 
                ( <Video autoPlay loop muted src={video} /> ) :
                (
                    <FileContainer>
                        <FileIcon src={UpLoadIcon} alt="Upload Icon" />
                        <FileText>동영상을 첨부해주세요.</FileText>
                    </FileContainer>
                )}
            </VideoContainer>
                <UpLoadVideo 
                    type="file" 
                    accept="video/*" 
                    onChange={videoUpload}
                    ref={fileInputRef}
                />
            
            <StartButton onClick={() => goToResult()}>감정추적하기</StartButton>
        </UpLoadContainer>
    );
}

const UpLoadContainer = styled.div`
    margin: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 100px;
`;

const VideoContainer = styled.div`
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    width: 1000px;
    height: 500px;
    border: 2px dashed #000000;

    &:before {
        content: "";
        position: absolute;
        top: 300px; 
        left: 310px; 
        right: 310px; 
        bottom: 65px; 
        border-radius: 20px;
        background: #FFE6E6;
        z-index: -1;
    }
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    border-radius: 20px;
`;

const UpLoadVideo = styled.input`
    display: none;
`;

const FileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000;
`;

const FileIcon = styled.img`
    width: 85px;
    height: 100px;
    margin-bottom: 50px;
`;

const FileText = styled.div`
    font-size: 1.3em;
    font-weight: bold;
`;

const StartButton = styled.button`
    display: block;
    margin: 100px auto;
    padding: 22px 80px;
    font-size: 25px;
    font-weight: bold;
    background-color: #FFE6E6;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
`

export default UpLoad;
