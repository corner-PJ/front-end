import { useEffect, useState } from "react";
import styled from 'styled-components';
import ListContent from './ListContent';
import hadogIog from '../../assets/dogLogo.png'; // 이미지 경로 임시

function ListPage() {
    const [selectedButton, setSelectedButton] = useState('Adopt');
    const [listData, setListData] = useState([]);

    const mockRequest = [
        {
            id: 1,
            nickName: "도담",
            temperature: 37.96,
            userEmail: "123456@fdf",
            title: "프린트",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 2,
            nickName: "rer",
            temperature: 37.96,
            userEmail: "afdfadsfdsafa@dfdafd",
            title: " 해주분",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 3,
            nickName: "gddg",
            temperature: 37.96,
            userEmail: "adfasf@fdf",
            title: "프dd분",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 4,
            nickName: "도담",
            temperature: 37.96,
            userEmail: "123456@fdf",
            title: "프린트",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 5,
            nickName: "rer",
            temperature: 37.96,
            userEmail: "afdfadsfdsafa@dfdafd",
            title: " 해주분",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 6,
            nickName: "gddg",
            temperature: 37.96,
            userEmail: "adfasf@fdf",
            title: "프dd분",
            img: "../../assets/dogLogo.png"
        }
    ];
    
    const mockSherere = [
        {
            id: 1,
            nickName: "ㄹㄹㄹㄹㄹㄹㄹㄹ",
            temperature: 37.96,
            userEmail: "123456@fdf",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 2,
            nickName: "ㅇㄹㅇㄹㅇㄹㅇ",
            temperature: 37.96,
            userEmail: "ㅇㄴㄹㅇㄴㄹ@dfdafd",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 3,
            nickName: "ㅇㄹㅇㄹㅇㄹ",
            temperature: 37.96,
            userEmail: "adㅇㄹㅇㄹㅇㄹf",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 4,
            nickName: "ㄹㄹㄹㄹㄹㄹㄹㄹ",
            temperature: 37.96,
            userEmail: "123456@fdf",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 5,
            nickName: "ㅇㄹㅇㄹㅇㄹㅇ",
            temperature: 37.96,
            userEmail: "ㅇㄴㄹㅇㄴㄹ@dfdafd",
            img: "../../assets/dogLogo.png"
        },
        {
            id: 6,
            nickName: "ㅇㄹㅇㄹㅇㄹ",
            temperature: 37.96,
            userEmail: "adㅇㄹㅇㄹㅇㄹf",
            img: "../../assets/dogLogo.png"
        }
    ];
    

useEffect(() => {
    if (selectedButton === 'Adopt') {
      setListData(mockRequest);
    } else if (selectedButton === 'Shelter') {
      setListData(mockSherere);
    }
  }, [selectedButton, mockRequest, mockSherere]);

    return (
        <div>
            <Header>
                <Title>입양하기</Title>
                <hr style={{width: '83%', margin: '50px 0 50px 160px'}}/>
            </Header>
            <ListContainer>
                <ListButton>
                    <Button
                        isSelected={selectedButton === 'Adopt'}
                        onClick={() => setSelectedButton('Adopt')}
                    >
                        • 임시보호
                    </Button>
                    <Button
                        isSelected={selectedButton === 'Shelter'}
                        onClick={() => setSelectedButton('Shelter')}
                    >• 보호소
                    </Button>
                </ListButton>
                <ListContent data={listData}/>
            </ListContainer>
            
        </div>  
    )
}

const Header = styled.div``
const Title = styled.div`
    text-align: center;
    font-size: 1.5em;
`
const ListContainer = styled.div`
    display: flex;
    margin: 60px 0;
    flex-shrink: 0;
`
const ListButton = styled.div`
    width: 150px;
    margin: 80px 50px 0 18px;
    flex-shrink: 0;
`
const Button = styled.div` 
    padding: ${(props) => (props.isSelected ? '0 20px 12px' : '0 20px 12px 35px')};
    cursor: pointer;
    color: ${(props) => (props.isSelected ? 'black' : 'gray')};
    font-size: ${(props) => (props.isSelected ? '1.3em' : '1em')};
    font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
    transition: all 0.3s ease;
`

export default ListPage;
