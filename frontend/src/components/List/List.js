import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import ListContent from './ListContent';
import Pagination from './Pagination';
import axios from 'axios';

function ListPage() {
    const location = useLocation();
    const navigate = useNavigate();   

    const [listData, setListData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    // 임보 목록 조회
    const AdoptData = async (page) => {
        try {
            const response = await axios.get('/adoptPost/list', {
                params: { page, size: 15 }
            });  
            if (response.status === 200) {
                setListData(response.data.data.content); 
                setTotalPages(response.data.data.totalPages);
                // console.log("임보", response.data.data.content); 
            } else {
                alert("데이터를 불러오는데 실패했습니다.");
            }
        } catch (error) {
            console.error('임보 페이지 조회 실패:', error);
        }
    };

    // 보호소 목록 조회
    const ShelterData = async (page) => {
        try {
            const response = await axios.get('/shelterPost/list', {
                params: { page, size: 15  }
            });  
            if (response.status === 200) {
                setListData(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
                // console.log("보호소", response.data.data.content); 
            } else {
                alert("데이터를 불러오는데 실패했습니다.");
            }
        } catch (error) {
            console.error('보호소 페이지 조회 실패:', error);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryType = searchParams.get('type') || 'adopt';
        const page = parseInt(searchParams.get('page')) || 0;

        setCurrentPage(Number(page));

        if (queryType === 'shelter') {
            ShelterData(page);
        } else if (queryType === 'adopt') {
            AdoptData(page);
        }
    }, [location.search]);

    const PageChange = (page) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', page);
        navigate(`?${searchParams.toString()}`);
    };

    return (
        <List>
            <Header>
                <Title>입양하기</Title>
                <hr style={{width: '83%', margin: '50px 0 50px 160px'}}/>
            </Header>
            <ListContainer>
                <ListButton>
                    <Button isSelected={location.search.includes('type=adopt')} onClick={() => navigate(`?type=adopt`)}>• 임시보호</Button>
                    <Button isSelected={location.search.includes('type=shelter')}  onClick={() => navigate(`?type=shelter`)}>• 보호소</Button>
                </ListButton>
                <ListContent data={listData} />
            </ListContainer>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={PageChange} />
        </List>  
    );
}

const List = styled.div`
    margin-bottom: 35px;
`;

const Header = styled.div``;
const Title = styled.div`
    text-align: center;
    font-size: 1.7em;
    font-weight: bold;
`;
const ListContainer = styled.div`
    display: flex;
    margin: 60px 0;
    flex-shrink: 0;
    min-height: 40vh;
`;
const ListButton = styled.div`
    width: 150px;
    margin: 80px 50px 0 18px;
    flex-shrink: 0;
`;
const Button = styled.div` 
    padding: ${(props) => (props.isSelected ? '0 20px 12px' : '0 20px 12px 35px')};
    cursor: pointer;
    color: ${(props) => (props.isSelected ? 'black' : 'gray')};
    font-size: ${(props) => (props.isSelected ? '1.3em' : '1em')};
    font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
    transition: all 0.3s ease;
`;

export default ListPage;
