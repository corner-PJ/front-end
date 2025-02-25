import React, { useEffect  } from "react";
import { NameChart } from "./NameChart";
import { VoiceChart } from "./VioceChart";
import styled from "@emotion/styled";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function SpeechSynthesisResultPage() {
    const navigate = useNavigate();

	useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

	const onClickDownloadButton = () => {
		const target = document.getElementById("download");
		if (!target) {
			return (
				toast.error('사진 저장에 실패했습니다.', {
					autoClose: 3000,
					position: "top-center",
				})
			)	
		};

		html2canvas(target, {
			ignoreElements: (element) => {
				return element.id === 'button';
			}
		}).then((canvas) => {
			const link = document.createElement("a");
			document.body.appendChild(link);
			link.href = canvas.toDataURL("image/png");
			link.download = "result.png"; // 다운로드 이미지 이름 
			link.click();
			document.body.removeChild(link);
		});
		};

	
    return (
        <SpeechSynthesisResultWrapper >
            <ResultHeader>결과 확인</ResultHeader>
			<ContentContainer>
				<ResultRectangle id="download">
					<IconWrapper id="button">
						<FiDownload onClick={onClickDownloadButton} size={30}/>
					</IconWrapper>
					<VoiceResult>
						<TextWrapper>
							<ResultText>목소리 반응 결과</ResultText>
							<ExplanationText>반려견이 선호하는 목소리는 청년 여성입니다.</ExplanationText>
						</TextWrapper>
						<VoiceChart />
					</VoiceResult>
					
					<Line />

					<NameResult>
						<TextWrapper>
							<ResultText>이름 반응 결과</ResultText>
							<ExplanationText>유기견이 선호하는 이름은 별이입니다.</ExplanationText>
						</TextWrapper>
						<NameChart />
					</NameResult>
				</ResultRectangle>
				
				<ButtonWrapper>
					<NextBtn onClick={() => navigate(`/list/write`)}>글쓰러 가기</NextBtn>
					<BackBtn onClick={() => navigate(`/`)}>돌아가기</BackBtn>
				</ButtonWrapper>
				
				
            </ContentContainer>
        </SpeechSynthesisResultWrapper>
    );
}


const SpeechSynthesisResultWrapper = styled.div`
    min-height: 250vh;
	width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ResultHeader = styled.span`
	color: black;
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

const ResultRectangle = styled.div`
	display: flex;
	flex-direction: column;
    justify-content: flex-start;
	align-items: flex-start;
	gap: 10px;
	padding: 20px;
	width: 70%;
	min-height: 100vh;
	background-color: #FFE6E6;
	border-radius: 15px;
	box-shadow: 0px 4px 3px 3px #a9a9a9;
	margin-top: 20px;
`;

const IconWrapper = styled.div`
	width: 100%;  
	display: flex;
	justify-content: flex-end;
	align-items: center; 
	margin-bottom: 10px;
`;

const VoiceResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
	align-items: center; 
	margin-bottom: 50px;
`;

const Line = styled.hr`
	width: 95%;
	height: 1px;
	flex-direction: center;
	background-color: black;
	margin-top: 1px;
	margin-bottom: 14px;
	margin-left: auto;
	margin-right: auto;
`;

const NameResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
	align-items: center; 
	margin-bottom: 50px;
`;

const TextWrapper = styled.div`
	display: flex;
	width: 100%;
    flex-direction: column;
    align-items: flex-start;
	margin-top: 10px;
	margin-bottom: 20px;
	margin-left: 90px;
`;

const ResultText = styled.div`
    font-size: 25px;
    font-weight: bold;
	margin-top: 40px;
`;


const ExplanationText = styled.span`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 300;
	text-align: center;
	margin-top: 10px;
	margin-left: 15px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	width: 100%;
    flex-direction: row;
	justify-content: flex-end;
    align-items: flex-end;
	margin-top: 50px;
	margin-right: 530px;
`;

const NextBtn = styled.button`
	display: flex;
	color: white;
	font-size: 24px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	justify-content: center;
	border: 2px;
	border-radius: 15px;
	background-color: rgb(252, 129, 158);
	box-shadow: 0px 3px 2px 1px #a9a9a9;
	padding: 10px 20px;
	width: 180px;

	&:hover {
		background-color: white;
		border: 2px solid rgb(252, 129, 158);
		color: rgb(252, 129, 158);
		width: 180px;
	}
`;

const BackBtn = styled.button`
	display: flex;
	color: white;
	font-size: 24px;
	font-family: Inter, sans-serif;
	font-weight: 600;
	justify-content: center;
	border: 2px;
	border-radius: 15px;
	background-color: rgb(252, 129, 158);
	box-shadow: 0px 3px 2px 1px #a9a9a9;
	padding: 10px 20px;
	width: 150px;
	margin-left: 30px;

	&:hover {
		background-color: white;
		border: 2px solid rgb(252, 129, 158);
		color: rgb(252, 129, 158);
		width: 150px;
	}
`;



