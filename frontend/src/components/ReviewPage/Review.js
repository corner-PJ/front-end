import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReviewContent from './ReviewContnet';
import ReviewMainImg from '../../assets/ReviewMainImg.png'

const mockReview = [
    {
        id: 1,
        nickName: "f",
        update: "2024.03.19",
        content: "유기견 입양 후기 내영1",
        img: [
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
    {
        id: 5,
        nickName: "fss",
        update: "2024.03.19",
        content: "유기견 입양 후기 내영1",
        img: [ "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            
           
        ]
    },
    {
        id: 2,
        nickName: "s",
        update: "2024.09.15",
        content: "유기견 입양 후기 내영2",
        img: ["https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
    {
        id: 3,
        nickName: "t",
        update: "2024.06.15",
        content: "유기견 입양 후기 내영3",
        img: ["https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            
        ]
    },
    {
        id: 4,
        nickName: "fe",
        update: "2024.03.21",
        content: "유기견을 입양한 것은 정말 큰 축복이었습니다. 그는 우리의 가족에게 무한한 사랑과 즐거움을 줍니다. 우리는 그를 더 많은 사랑으로 감싸고, 그의 행복을 위해 노력할 것입니다.",
        img: [ "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
           "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
]

function ReviewPage() { 
    const navigate = useNavigate(); 

    const goToWritePage = () => {
        navigate('/reviewWrite');
    };   

    return (
        <ReviewPageContainer>
            <Header>
                <HeaderImg src={ReviewMainImg} />
                <HeaderText>
                    여러분의 입양 후기를 남겨주세요
                </HeaderText>
            </Header>
            <UploadButton onClick={goToWritePage}>후기 작성하기</UploadButton>
            <ReviewList>
                <ReviewContent data={mockReview} />
            </ReviewList>
        </ReviewPageContainer>  
    )
}

const ReviewPageContainer = styled.div`
    margin-top: -90px;
`
const Header = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    margin-bottom: 30px;
    overflow: hidden;
    `
const HeaderImg = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    opacity: 0.5;
`
const HeaderText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2.8em;
    font-weight: bold;
    text-align: center;
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

const ReviewList = styled.div`
    display: flex;
    padding: 40px;
    justify-content: center;
`

export default ReviewPage;