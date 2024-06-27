import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ListComment from './ListComment';

const ReviewDetail = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const location = useLocation();
    const { data } = location.state || {}; 

    if (!data) {
        return <div>데이터가 없습니다.</div>;
    }

    const moveToPrevSlide = () => {
        setSlideIndex((prev) => (prev === 0 ? data.img.length - 1 : prev - 1));
    };
    
    const moveToNextSlide = () => {
        setSlideIndex((prev) => (prev === data.img.length - 1 ? 0 : prev + 1));
    };
    
    const moveDot = (index) => {
        setSlideIndex(index);
    };

    return (
        <ReviewDetailContainer>
            <ReviewHeader>
                <ReviewTitle>{data.nickName} 님의 후기</ReviewTitle>
                <ReviewUpdate>{data.update}</ReviewUpdate>
            </ReviewHeader>
            <ReviewMain>
                <ImgContainer>
                    <Arrow direction="prev" onClick={moveToPrevSlide}>
                        ‹
                    </Arrow>
                    <Wrapper slideIndex={slideIndex}>
                        {data.img.map((item, index) => (
                            <ImgSlide key={index}>
                                <Img src={item} />
                            </ImgSlide>
                        ))}
                    </Wrapper>
                    <Arrow direction="next" onClick={moveToNextSlide}>
                        ›
                    </Arrow>
                    <DotContainer>
                        {data.img.map((item, index) => (
                            <Dot
                                key={index}
                                className={index === slideIndex ? "active" : null}
                                onClick={() => moveDot(index)}
                            />
                        ))}
                    </DotContainer>
                </ImgContainer>
                <ReviewText>
                    {data.content}
                </ReviewText>
            </ReviewMain>
            <ListComment />
        </ReviewDetailContainer>
    );
}

const ReviewDetailContainer = styled.div`
    margin: 90px;
`;

const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    padding: 20px 30px 40px;
`;

const ReviewTitle = styled.div`
    font-size: 2.2em;
    font-weight: bold;
`;

const ReviewUpdate = styled.div`
    display: flex;
    align-items: flex-end;
`;

const ReviewMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid black;
    padding: 80px 0 150px;
`;

const ImgContainer = styled.div`
    width: 800px;
    height: 600px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px auto;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${({ slideIndex }) => slideIndex * -100 + "%"});
`;

const ImgSlide = styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFEFEF;
    border-radius: 10px;
`;

const Img = styled.img`
    width: 90%;
    height: 90%;
    object-fit: cover;
    border-radius: 10px;
`;

const Arrow = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    left: ${({ direction }) => direction === "prev" && "0px"};
    right: ${({ direction }) => direction === "next" && "0px"};
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1;
    font-size: 4em;
    color: #f59fb47d;

    &:hover {
        color: #FC819E;
    }
`;

const DotContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100px;
    display: flex;
    justify-content: space-between;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #FFFFFF;
    cursor: pointer;

    &.active {
        background-color: #FC819E;
    }
`;

const ReviewText = styled.div`
    margin-top: 40px;
    width: 900px;
    word-break: keep-all;
    white-space: pre-line;
    line-height: 1.6;
    font-size: 1.2em;
    text-align: center;
`;

export default ReviewDetail;
