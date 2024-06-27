import { useState } from "react";
import styled from 'styled-components';
import checkmark from '../../assets/checkmark.png'
import { useNavigate } from 'react-router-dom';

function SelectDog() {
    const navigate = useNavigate();

    const [selectedDog, setSelectedDog] = useState(null);

    const data = [
        {
            id: 1,
            dogname: "진구",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxuGFo3mMbJvJ5qmXqgOEv4IqR06S929K2vw&s"
        },
        {
            id: 2,
            dogname: "뭉치",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIw9-C6uc-OzhgL4bXAb2gjc1ubu8el29xEA&s"
        },
        {
            id: 3,
            dogname: "몽실",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI6hU1UePpJeJWYoY44IJKhZPRHkrlo43ADw&s"
        },
        {
            id: 4,
            dogname: "망고",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXJd22bv_zCY9yMB3oLzpGrT9dnl4f-BOhdw&s"
        },
        {
            id: 5,
            dogname: "럭키",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZXinKaTgeOdXL3VLshOHNbctlr2NKgfbOmA&s"
        },
    ];

    const ChooseDog = (id) => {
        setSelectedDog(id);
        console.log(selectedDog);
    }

    const goToAnalysis = () => {
        if (selectedDog) {
            navigate(`/analysis/${selectedDog}`);
        }
    }
     
    return (
        <SelectDogConatiner>
            <Title>감정 해독할 반려견을 선택해주세요</Title>
            <ImgOption>
                {data.map((item) => (
                    <ListItem onClick={() => ChooseDog(item.id)}>
                        <DogImgWrapper>
                            <DogImg src={item.img} selected={selectedDog === item.id} />
                            {selectedDog === item.id && <Checkmark src={checkmark} />}
                        </DogImgWrapper>                        <DogName>{item.dogname}</DogName>
                    </ListItem>
                ))}
            </ImgOption>
            <NextButton onClick={() => goToAnalysis()} disabled={!selectedDog}>다음</NextButton>
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
    height: 250px;
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