import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import checkmark from '../../assets/checkmark.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SelectDog() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedDog, setSelectedDog] = useState(null);
    
    // localStorage에서 토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('authToken');

    useEffect(() => {
        // 반려견 정보 조회
        const ReviewsData = async () => {
            try {
                const response = await axios.get('/mypage/petinfo', {
                    headers: {
                        'Authorization' : `Bearer ${ACCESS_TOKEN}`,
                    }
                });
                if (response.status === 200) {
                    const responseData = response.data.data.map((item, index) => ({
                        ...item,
                        petId: index+1 // id 값을 1부터 시작하는 인덱스로 설정
                    }));
                    setData(responseData);
                    // console.log(response.data.data)                    
                } else {
                    toast.error('반려견 목록 조회하는데 실패했습니다.', {
                        autoClose: 3000,
                        position: "top-center",
                    });        
                }
            } catch (error) {
                console.error('반려견 목록 조회 실패:', error);
                
                // 토큰이 만료되었거나 유효하지 않을 때
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('ACCESS_TOKEN');
                    toast.error('토큰이 만료되었습니다. 다시 로그인해주세요', {
                        autoClose: 3000,
                        position: "top-center",
                    });
        
                    navigate('/login');
                }
            }
        };

        ReviewsData();
    }, [ACCESS_TOKEN, navigate]);

    const ChooseDog = (id) => {
        setSelectedDog(id);
        // console.log(selectedDog);
    }

    const goToAnalysis = () => {
        if (selectedDog) {
            navigate(`/analysis/${selectedDog}`);
        }
    }
        console.log("반려견 데이터:", data);
    return (
        <SelectDogConatiner>
            <Title>감정 해독할 반려견을 선택해주세요</Title>
            <ImgOption>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        // 아직 id 값이 없음
                        <ListItem key={item.petId} onClick={() => ChooseDog(item.petId)}>
                            <DogImgWrapper>
                                <DogImg src={item.image} selected={selectedDog === item.id} />
                                {selectedDog === item.petId && <Checkmark src={checkmark} />}
                            </DogImgWrapper>                        
                            <DogName>{item.name}</DogName>
                        </ListItem>
                    ))
                ) : (
                    <NoDogsMessage>선택할 반려견이 없습니다.</NoDogsMessage>
                )}
            </ImgOption>
            <NextButton onClick={goToAnalysis} disabled={!selectedDog}>다음</NextButton>
        </SelectDogConatiner>
    )
}

const SelectDogConatiner = styled.div`
    margin: 100px;
`

const Title = styled.div`
    text-align: center;
    font-size: 2.2em;
    font-weight: bold;
    margin-bottom: 150px;
`

const ImgOption = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 100px 0px;
    justify-items: center;
`

const NoDogsMessage = styled.p`
    font-size: 18px;
    color: gray;
`;

const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    algin-item: center
`

const DogImgWrapper = styled.div`
    position: relative;
`

const DogImg = styled.img`
    width: 250px;
    height: 270px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    position: relative;
    filter: ${props => props.selected ? 'opacity(60%) brightness(80%)' : 'none'};

`

const Checkmark = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 60px;
`

const DogName = styled.div`
    text-align: center;
    margin-top: 30px;
    font-size: 1.7em;
    font-weight: bold;
`

const NextButton = styled.button`
    display: block;
    margin: 100px auto;
    padding: 18px 110px;
    font-size: 25px;
    font-weight: bold;
    background-color: ${props => props.selectedDog ? '#FFE6E6' : '#FDA7BC'};
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
`

export default SelectDog;