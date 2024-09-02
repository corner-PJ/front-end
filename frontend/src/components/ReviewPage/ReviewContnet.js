import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ReviewContent = ({reviews}) => {
    const navigate = useNavigate();

    const goToDetail = (reviewId) => {
        navigate(`/review/${reviewId}`);
    };

    return (
        <ReviewContainer>
            {reviews.map((item) => (
                <ReviewItem key={item.reviewId} onClick={() => goToDetail(item.reviewId)}>
                    <ReviewImg  src={item.images[0].fileName} />
                    <ReviewName>
                        {item.authorName}님의 후기
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