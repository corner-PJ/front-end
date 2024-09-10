import React, { useState, useRef, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';
import { NameChart } from "./NameChart";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { PiFilePlus } from "react-icons/pi";
import { LuClipboardList } from "react-icons/lu";
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const names = [
	"해피", "초코", "마루", "구름", "뭉치",
	"까미", "보리", "설이", "몽이", "토리",
	"코코", "콩이", "두부", "별이", "호두", "사랑이",
	"망고", "쿠키", "하루", "루비", "흰둥이",
	"레오", "뚱이", "모모", "가을", "모찌"
];

export function SpeechSynthesisPage2() {
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [selectedNames, setSelectedNames] = useState([]);
	const [showResult, setShowResult] = useState(false);
	const [chartData, setChartData] = useState([]);
	const [topName, setTopName] = useState("");
	const [video, setVideo] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

	useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

	const toggleSelection = (name) => {
		setSelectedNames(prevSelectedNames =>
			prevSelectedNames.includes(name)
				? prevSelectedNames.filter(n => n !== name)
				: [...prevSelectedNames, name]
		);
	};

    const goToResult = () => {
        navigate('/speechSynthesis/result/');
    }

	const videoUpload = async (e) => {
		const selectedVideo = e.target.files[0];
		if (selectedVideo) {
			setVideo(URL.createObjectURL(selectedVideo));
			
			const formData = new FormData();
			formData.append('video', selectedVideo);
	
			try {
				const response = await axios.post('http://127.0.0.1:5000/predict', 
					formData, 
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				console.log(response);
				
				// 서버로부터의 응답 처리
				if (response.status === 200){
					toast.success('영상 업로드에 성공했습니다.', {
						autoClose: 3000,
						position: "top-center",
					});
				} else {
					toast.error('영상 업로드에 실패했습니다. 다시 시도해주세요.', {
						autoClose: 3000,
						position: "top-center",
					});
				}
			} catch (error) {
				console.error('영상 업로드 중 오류 발생:', error);
			}
		}
	};

	const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

	const handleShowResult = () => {
		if (video === null) {
            toast.error('영상을 업로드해 주세요.', {
                autoClose: 3000,
                position: "top-center",
            });
            return;
		}

		setIsLoading(true);

		const totalDuration = 3000; 
		const intervalDuration = 50; 
		const totalIntervals = totalDuration / intervalDuration;
	
		let intervalCount = 0;
	
		const timer = setInterval(() => {
			intervalCount += 1;
			setProgress((intervalCount / totalIntervals) * 100);
		
			if (intervalCount >= totalIntervals) {
				clearInterval(timer);
				setIsLoading(false);
				setShowResult(true);
				fetchRankingData();
			}
		}, intervalDuration);
	};

	const fetchRankingData  = async () => {
		try {
			const response = await axios.post('http://127.0.0.1:5000/calculate_movement', {
				names: selectedNames,
			});
			console.log('POST Response:', response);
	
			const rankingResponse = await axios.get('http://127.0.0.1:5000/get_ranking');
			const ranking = rankingResponse.data.ranking;
			const filteredRanking = ranking.filter(item => selectedNames.includes(item.name));
			
			// 1위 이름 찾기
            const topRank = filteredRanking.find(item => item.rank === 1);
            if (topRank) {
                setTopName(topRank.name);
            }

			setChartData(filteredRanking);

			// 서버로부터의 응답 처리
			if (response.status === 200){
				console.log("결과 불러오기 성공");
			} else {
				console.log("결과 불러오기 실패 ")
			}
	
		} catch (error) {
			console.error('데이터 가져오기 실패:', error);
			toast.error('데이터를 불러오는데 실패했습니다.', {
				autoClose: 3000,
				position: 'top-center',
			});
		}
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
					<ResultBtn onClick={handleShowResult}>
						<LuClipboardList size={40} />
						<SpeechBtnText>결과 보기</SpeechBtnText>
					</ResultBtn>
				</VideoWrapper>

                {isLoading && <Loading text="영상 분석 중 · · ·" progress={progress} />}

                {!isLoading && showResult && (
					<ResultWrapper>
						<ResultText>해당 유기견이 선호하는 이름은 "{topName}"입니다.</ResultText>
						<NameChart data={chartData} />

						<NextBtn onClick={goToResult}>
							<NextBtnText>결과 전체 보기</NextBtnText>
						</NextBtn>
					</ResultWrapper>
				)}
            </ContentContainer>
        </SpeechSynthesisWrapper>
    );
}


const SpeechSynthesisWrapper = styled.div`
    min-height: 260vh;
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
	padding: 20px;
	margin: 50px 0;
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
	margin-top: 50px;

    &:hover {
        background-color: white;
        border: 2px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
		width: 220px;
    }
`;

const ResultWrapper = styled.div`
    width: 90%;
	height: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
	align-items: center;
	margin-top: 200px;
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



