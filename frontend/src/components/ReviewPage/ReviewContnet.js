import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ReviewContent = ({data}) => {
    const navigate = useNavigate();

    const goToDetail = (item) => {
        navigate(`/reviewDetail/${item.id}`, {state: {data: item}});
    };
    console.log(data)

    return (
        <ReviewContainer>
            {data.map((item) => (
                <ReviewItem onClick={() => goToDetail(item)}>
                    <ReviewImg  src={item.img[0]} />
                    <ReviewName>
                        {item.nickName} 님의 후기
                    </ReviewName>
                </ReviewItem>
            ))}
        </ReviewContainer>
    );
};    

const ReviewContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 45px;
    justify-content: center;
`
const ReviewItem = styled.div`
    width: 400px;
    margin: 20px;
    cursor: pointer;
    text-align: center;
`
const ReviewImg = styled.img`
    width: 100%;
    height: 380px;
    object-fit: cover;
`
const ReviewName = styled.div`
    margin-top: 10px;
    font-size: 1.1em;
    font-weight: bold;
`

export default ReviewContent;