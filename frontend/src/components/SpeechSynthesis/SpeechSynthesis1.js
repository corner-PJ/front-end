import React, { useState, useRef  } from "react";
import { useNavigate } from 'react-router-dom';
import { VoiceChart } from "./VioceChart";
import ChildImg from "../../assets/child.png"
import AdultImg from "../../assets/adult.png"
import OldImg from "../../assets/old.png"
import styled from "@emotion/styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { PiFilePlus } from "react-icons/pi";
import { LuClipboardList } from "react-icons/lu";
import { GrLinkNext } from "react-icons/gr";


export function SpeechSynthesisPage1() {
	const [showResult, setShowResult] = useState(false);
	const [video, setVideo] = useState(null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const goToNext = () => {
        navigate('/SpeechSynthesis2/');
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

	const handleShowResult = () => {
		setShowResult(true);
	};

    return (
        <SpeechSynthesisWrapper>
            <SpeechHeader>STEP 1. 목소리 선택하기</SpeechHeader>
            <ContentContainer>
				<ImageContent>
					<ContentImg src={ChildImg} />
					<ContentImg src={AdultImg} />
					<ContentImg src={OldImg} />
				</ImageContent>

				<SpeechBtn>
					<FontAwesomeIcon icon={faVolumeUp} style={{ marginLeft: '6px' }}/>
					<SpeechBtnText>음성 듣기</SpeechBtnText>
				</SpeechBtn>

				<ExplanationText>
					소아, 성인, 노년층의 음성이 첨부되어있습니다.<br/>
					가이드에 맞게 유기견에게 음성을 들려주며<br/>
					동영상을 촬영하고, 해당 동영상을 첨부해주세요!<br/><br/>
					유기견의 반응을 분석하여, 먼저 선호하는 목소리를 선정합니다.
				</ExplanationText>
                
				<VideoWrapper>
					<VideoRectangle>
						<VideoContainer onClick={handleUploadButtonClick}>
							{video ? 
							( <Video autoPlay loop muted src={video} /> ) :
							(
								<FileContainer>
									<PiFilePlus size={50}/>
									<FileText>동영상을 첨부해주세요.</FileText>
								</FileContainer>
							)}
							<UpLoadVideo 
								type="file" 
								accept="video/*" 
								onChange={videoUpload}
								ref={fileInputRef}
							/>
						</VideoContainer>
					</VideoRectangle>
					<SpeechBtn>
						<LuClipboardList size={40} />
						<SpeechBtnText onClick={handleShowResult}>결과 보기</SpeechBtnText>
					</SpeechBtn>
				</VideoWrapper>

				{showResult && (
					<ResultWrapper>
						<ResultText>해당 유기견이 선호하는 목소리는 청년 여성입니다.</ResultText>
						<VoiceChart />
					</ResultWrapper>
				)}
				
				<NextBtn>
					<NextBtnText onClick={goToNext}>다음으로</NextBtnText>
					<GrLinkNext size={35} />
				</NextBtn>
            </ContentContainer>
            
        </SpeechSynthesisWrapper>
    );
}


const SpeechSynthesisWrapper = styled.div`
    min-height: 280vh;
	width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SpeechHeader = styled.span`
	color: rgb(252, 129, 158);
	font-size: 36px;
	font-family: Inter, sans-serif;
	font-weight: 900;
	text-align: left;
	margin-bottom: 30px;
`;

const ContentContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
    flex-direction: column;
    align-items: center;
`;

const ImageContent = styled.div`
    width: 100%;
    display: flex;
	justify-content: center;
    align-items: center;
	margin-bottom: 100px;
	gap: 130px;
`;

const ContentImg = styled.img`
    width: 290px;
    height: 290px;
    object-fit: cover;
    border-radius: 50%; 
    margin-top: 50px;
`;


const SpeechBtn = styled.button`
	display: flex;
    align-items: center;
	color: white;
	font-size: 27px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: center;
    border: 2px;
    border-radius: 25px;
    background-color: rgb(252, 129, 158);
	box-shadow: 0px 3px 2px 1px #a9a9a9;
    padding: 10px 20px;
	width: 210px;

    &:hover {
        background-color: white;
        border: 2px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
		width: 220px;
    }
`;

const SpeechBtnText = styled.span`
    margin-left: 10px;
`;

const ExplanationText = styled.span`
	color: rgb(100, 100, 100);
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-align: center;
	margin-top: 100px;
`;


const VideoWrapper = styled.div`
    width: 40%;
	height: 330px;
    display: flex;
    flex-direction: column;
    gap: 20px;
	align-items: center;
	margin-top: 90px;
`;

const VideoRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    background-color: #FFE6E6;
    border-radius: 20px; 
    width: 100%;
	height: 100%;
	margin-bottom: 6px;
`;

const VideoContainer = styled.div`
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px dashed #000000;
	background-color: #FFE6E6;
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

const FileText = styled.div`
    font-size: 1.3em;
    font-weight: bold;
	margin-top: 10px;
`;

const ResultWrapper = styled.div`
    width: 90%;
	height: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
	align-items: center;
	margin-top: 150px;
`;

const ResultText = styled.div`
    font-size: 23px;
    font-weight: bold;
	margin-top: 10px;
`;

const NextBtn = styled.button`
	display: flex;
    align-items: center;
	color: rgb(252, 129, 158);
	font-size: 29px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: center;
    border: 2px;
    border-radius: 25px;
	background-color: white;
    border: 2px solid rgb(252, 129, 158);
	box-shadow: 0px 3px 2px 1px #a9a9a9;
    padding: 10px 20px;
	width: 210px;
	margin-top: 50px;

    &:hover {
        background-color: rgb(252, 129, 158);
        border: 2px solid rgb(252, 129, 158);
        color: white;
		width: 220px;
    }
`;

const NextBtnText = styled.span`
    margin-left: 5px;
	margin-right: 5px;
`;



