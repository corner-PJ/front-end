import React, { useState, useRef  } from "react";
import { useNavigate } from 'react-router-dom';
import { NameChart } from "./NameChart";

import styled from "@emotion/styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { PiFilePlus } from "react-icons/pi";
import { LuClipboardList } from "react-icons/lu";

const names = [
	"해피", "초코", "마루", "구름", "뭉치",
	"까미", "보리", "설이", "몽이", "토리",
	"코코", "콩이", "두부", "별이", "호두", "사랑이",
	"까미", "보리", "설이", "몽이", "토리",
];

export function SpeechSynthesisPage2() {
	const [selectedNames, setSelectedNames] = useState([]);

	const toggleSelection = (name) => {
		setSelectedNames(prevSelectedNames =>
			prevSelectedNames.includes(name)
				? prevSelectedNames.filter(n => n !== name)
				: [...prevSelectedNames, name]
		);
	};

	
	const [video, setVideo] = useState(null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const goToResult = () => {
        navigate('/speechSynthesis/result/');
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
        <SpeechSynthesisWrapper>
            <SpeechHeader>STEP 2. 이름 찾기</SpeechHeader>
            <ContentContainer>
				<ListenName>
					<ResultText>유기견이 선호하는 목소리 : 청년 여성</ResultText>
					<NameBox>
						{names.map(name => (
							<NameItem
							key={name}
							selected={selectedNames.includes(name)}
							onClick={() => toggleSelection(name)}
							>
							{name}
							</NameItem>
						))}
					</NameBox>
				</ListenName>
				<SpeechBtn>
					<FontAwesomeIcon icon={faVolumeUp} style={{ marginLeft: '6px' }}/>
					<SpeechBtnText>이름 들려주기</SpeechBtnText>
				</SpeechBtn>

				<ExplanationText>
					앞서 선정된 목소리로 우리나라의 흔한 반려견 이름 50개를 불러줍니다.<br/>
					유기견에게 해당 이름들을 들려주면서 동영상을 촬영하고, 해당 동영상을 첨부해주세요!<br/>
					<br/>유기견의 반응을 분석하여, 유기견이 크게 반응한 이름 TOP8을 찾아줍니다.
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
					<ResultBtn>
						<LuClipboardList size={40} />
						<SpeechBtnText>결과 보기</SpeechBtnText>
					</ResultBtn>
				</VideoWrapper>

				<ResultWrapper>
					<ResultText>해당 유기견이 선호하는 목소리는 청년 여성입니다.</ResultText>
					<NameChart />
				</ResultWrapper>
				
				<NextBtn>
					<NextBtnText onClick={goToResult}>결과 전체 보기</NextBtnText>
				</NextBtn>
            </ContentContainer>
            
        </SpeechSynthesisWrapper>
    );
}


const SpeechSynthesisWrapper = styled.div`
    min-height: 250vh;
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

const ListenName = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
	align-items: center;
	margin-bottom: 50px;
`;

const NameBox = styled.div`
	display: flex;
    justify-content: flex-start;
	flex-wrap: wrap;
	gap: 10px;
	padding: 20px;
	width: 480px;
	height: auto;
	max-height: 250px;
	border: 2px solid #FEC7B4;
	border-radius: 15px;
	margin-top: 20px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 8px; 
		height: 6px;
		right: 30px; 
	}
	
	&::-webkit-scrollbar-thumb {
		background-color: #FEC7B4;
		border-radius: 15px;
		backdrop-filter: blur(50px);
		margin-right: 15px;
	}
	
	
`;

const NameItem = styled.div`
	font-size: 21px;
	font-family: Inter, sans-serif;
	text-align: center;
	padding: 8px;
	border-radius: 8px;
	cursor: pointer;
	height: 26px;
	width: 76px;
	background-color: ${props => props.selected ? '#FEC7B4' : '#fff'};
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
	width: 280px;

    &:hover {
        background-color: white;
        border: 2px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
		width: 280px;
    }
`;

const ResultBtn = styled.button`
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
	width: 220px;

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
    width: 57%;
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
    width: 100%;
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
	margin-top: 40px;
`;

const NextBtn = styled.button`
	display: flex;
    align-items: center;
	color: rgb(252, 129, 158);
	font-size: 27px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	text-align: center;
    border: 2px;
    border-radius: 25px;
	background-color: white;
    border: 2px solid rgb(252, 129, 158);
	box-shadow: 0px 3px 2px 1px #a9a9a9;
    padding: 10px 20px;
	width: 250px;
	margin-top: 50px;

    &:hover {
        background-color: rgb(252, 129, 158);
        border: 2px solid rgb(252, 129, 158);
        color: white;
		width: 250px;
    }
`;

const NextBtnText = styled.span`
    margin-left: 12px;
`;



