import { useEffect, useState } from "react";
import styled from 'styled-components';
import ListContent from './ListContent';
import { useListContext } from '../ListContext';
import { useNavigate } from 'react-router-dom';

function ListPage() {
    const { adoptList, shelterList, updateAdoptionStatus  } = useListContext();
    const [selectedButton, setSelectedButton] = useState('Adopt');
    const [listData, setListData] = useState([]);
    const navigate = useNavigate();

    const goToWritePage = () => {
        navigate('/write');
    };   

useEffect(() => {
    if (selectedButton === 'Adopt') {
      setListData(adoptList);
    } else if (selectedButton === 'Shelter') {
      setListData(shelterList);
    }
  }, [selectedButton, adoptList, shelterList]);

    return (
        <div>
            <Header>
                <Title>입양하기</Title>
                <UploadButton onClick={goToWritePage}>공고 작성하기</UploadButton>

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
                <ListContent data={listData} updateAdoptionStatus={updateAdoptionStatus} />
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


const UploadButton = styled.button`
    display: block;
    margin-left: 64em;
    padding: 15px 60px;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
    background-color: #FC819E;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);    
`

export default ListPage;
