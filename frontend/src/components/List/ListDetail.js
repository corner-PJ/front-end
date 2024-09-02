import styled from 'styled-components';
import ListDetailContent from './ListDetailContent';
import ListComment from './ListComment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const ACCESS_TOKEN = localStorage.getItem('authToken');
    
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
                    // console.log(response.data.data);
                } else {
                    toast.error('데이터를 불러오는데 실패했습니다.', {
                        autoClose: 3000,
                        position: "top-center",
                    });
                }
            } catch (error) {
                console.error('상세 페이지 조회 실패:', error);
            }
        };

        DetailData();
    }, [postId, type, ACCESS_TOKEN]);

	useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
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