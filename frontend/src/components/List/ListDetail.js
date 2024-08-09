import styled from 'styled-components';
import ListDetailContent from './ListDetailContent';
import ListComment from './ListComment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTokenContext } from '../TokenContext';

function ListDetail() {
    const { postId, type } = useParams();
    const [data, setData] = useState({
        imageUrls: [],
        content: '',
        name: '',
        breed: '',
        sex: '',
        age: '',
        phone: '',
        duration: '',
        neutering: false,
        adoptStatus: false,
        user: {
            userId: null,
            name: '',
            id: '',
            password: '',
            nickname: '',
            email: ''
        }
    });

    // // localStorage에서 토큰 가져오기
    // const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    // 임시로 context를 활용해 토큰 가져옴
    const { ACCESS_TOKEN } = useTokenContext();

    useEffect(() => {
        const DetailData = async () => {
            try {
                const url = type === 'shelter'
                    ? `/shelterPost`
                    : `/adoptPost/post`;
                
                const response = await axios.get(url, {
                    params: {
                        postId: postId
                    },
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    }
                });

                if (response.status === 200) {
                    setData(response.data.data);
                    console.log(response.data.data);
                } else {
                    alert("데이터를 불러오는데 실패했습니다.");
                }
            } catch (error) {
                console.error('상세 페이지 조회 실패:', error);
            }
        };

        DetailData();
    }, [postId, type, ACCESS_TOKEN]);


    return (
        <ListDetailContainer>
            <ListDetailContent data={data} postId={postId} />
            {type === 'adopt' && <ListComment postId={postId} type={type} />}
        </ListDetailContainer>
    );
}

const ListDetailContainer = styled.div`
    margin: 8em;
    text-align: center;
`

export default ListDetail;