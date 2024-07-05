import { useEffect, useState } from "react";
import styled from 'styled-components';
import ListContent from './ListContent';
import { useListContext } from '../ListContext';
import { useLocation, useNavigate } from 'react-router-dom';

function ListPage() {
    const { adoptList, shelterList, updateAdoptionStatus } = useListContext();
    const [type, setType] = useState('adopt');
    const location = useLocation();
    const [listData, setListData] = useState([]);
    const navigate = useNavigate();

    // const goToWritePage = () => {
    //     navigate('/write');
    // };   

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryType = searchParams.get('type') || 'adopt';
        setType(queryType);

        if (queryType === 'shelter') {
            setListData(shelterList);
        } else {
            setListData(adoptList);
        }
    }, [location.search, adoptList, shelterList]);

    return (
        <div>
            <Header>
                <Title>입양하기</Title>
                {/* <UploadButton onClick={goToWritePage}>공고 작성하기</UploadButton> */}

                <hr style={{width: '83%', margin: '50px 0 50px 160px'}}/>
            </Header>
            <ListContainer>
                 <ListButton>
                    <Button isSelected={type === 'adopt'} onClick={() => navigate(`?type=adopt`)}>• 임시보호</Button>
                        <Button isSelected={type === 'shelter'} onClick={() => navigate(`?type=shelter`)}>• 보호소</Button>
                    </ListButton>
                <ListContent data={listData} updateAdoptionStatus={updateAdoptionStatus} />
            </ListContainer>
            
        </div>  
    )
}

const Header = styled.div``
const Title = styled.div`
    text-align: center;
    font-size: 1.7em;
    font-weight: bold;

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


// const UploadButton = styled.button`
//     display: block;
//     margin-left: 64em;
//     padding: 15px 60px;
//     color: #FFFFFF;
//     font-size: 20px;
//     font-weight: bold;
//     background-color: #FC819E;
//     border: none;
//     border-radius: 15px;
//     box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);    
// `

export default ListPage;
