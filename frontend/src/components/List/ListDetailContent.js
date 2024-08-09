import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIResult from './AIResult';
import axios from 'axios';

import { useTokenContext } from '../TokenContext';

function ListDetailContent({ data, postId }) {
    const navigate = useNavigate();
    const [slideIndex, setSlideIndex] = useState(0);
    const [adoptStatus, setAdoptStatus] = useState(data.adoptStatus)

    // // localStorage에서 토큰 가져오기
    // const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    // 임시로 context를 활용해 토큰 가져옴
    const { ACCESS_TOKEN } = useTokenContext();

    if (!data) {
        return <div>데이터가 없습니다.</div>;
    }
    // console.log("데이터확인",data);

    const moveToPrevSlide = () => {
        setSlideIndex((prev) => (prev === 0 ? data.imageUrls.length - 1 : prev - 1));
    };

    const moveToNextSlide = () => {
        setSlideIndex((prev) => (prev === data.imageUrls.length - 1 ? 0 : prev + 1));
    };

    const moveDot = (index) => {
        setSlideIndex(index);
    };

    const handleCheckboxChange = async () => {
      try {
          const response = await axios.patch(`/adoptPost`, null,{ 
            params: {
              adoptPostId: postId,
              isAdopt: !adoptStatus
            }, 
            headers: {
              'Authorization': `Bearer ${ACCESS_TOKEN}`,
            },
          });
          // console.log("값 확인", response);
          if (response.status === 200) {
            alert('입양 상태가 변경되었습니다.');
            setAdoptStatus(!adoptStatus);
          } else {
            alert("데이터를 불러오는데 실패했습니다.");
          }
      } catch (error) {
          console.error('입양 상태 변화 실패:', error);            
          
          // 토큰이 만료되었거나 유효하지 않을 때
          if (error.response && error.response.status === 401) {
              localStorage.removeItem('ACCESS_TOKEN');
              alert('토큰이 만료되었습니다. 다시 로그인하세요.');
              navigate('/login');
          }    
      }
  };

  return (
        <ListDetailContainer>
            <ListUser>
              {data.user && data.user.name ? <ListId>ID. {data.user.name}</ListId> : <ListId>ID. {data.center}</ListId> }
              <ListTime>{data.update}</ListTime>
            </ListUser>
            <ListData>
                {/* 이미지와 입양 체크박스 */}
                <ImgContainer>
                    <Arrow direction="prev" onClick={moveToPrevSlide}>
                        ‹
                    </Arrow>
                    <Wrapper slideIndex={slideIndex}>
                        {data.imageUrls && data.imageUrls.map((url, index) => (
                            <ImgSlide key={index}>
                                <Img src={url} />
                            </ImgSlide>
                        ))}
                    </Wrapper>
                    <Arrow direction="next" onClick={moveToNextSlide}>
                        ›
                    </Arrow>
                    <DotContainer>
                        {data.imageUrls && data.imageUrls.map((_, index) => (
                            <Dot
                                key={index}
                                className={index === slideIndex ? "active" : null}
                                onClick={() => moveDot(index)}
                            />
                        ))}
                    </DotContainer>
                </ImgContainer>
                <AdoptionStatus onClick={handleCheckboxChange}>
                    <AdoptionCheckbox
                        type="checkbox"
                        checked={adoptStatus}
                        onChange={handleCheckboxChange}
                    />
                    <AdoptionLabel>입양 완료</AdoptionLabel>
                </AdoptionStatus>
            </ListData>
            {/* 기본사항, 작성한 글 내용 */}
            <ListDetail>
                <ListInfo>
                    <InfoTitle>기본사항</InfoTitle>
                    <InfoTextContainer>
                        <InfoText>이름: {data.name ? data.name : data.title}</InfoText>
                        {data.duration ? <InfoText>품종: {data.breed}</InfoText> : <InfoText>성별: {data.sex}</InfoText> }
                        {data.duration ? <InfoText>임시 보호 기간: {data.duration}</InfoText> : <InfoText>보호소명: {data.department}</InfoText>}
                        <InfoText>중성화 여부: {data.neutering ? "O" : "X"}</InfoText>
                        {data.phone ? <InfoText>연락처: {data.phone}</InfoText> :  <InfoText>보호소 연락처: {data.centerPhone}</InfoText> }
                        <InfoText>추정나이: {data.age}</InfoText>
                    </InfoTextContainer>
                </ListInfo>
                <ListText>{data.content}</ListText>
                {data.name ? <AIResult /> : null}
            </ListDetail>
        </ListDetailContainer>
    );
}

const ListDetailContainer = styled.div`
  height: auto;
  background: #FFE6E6;
  border-radius: 10px;
  padding: 20px;
`;

const ListUser = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 15px;
  font-weight: bold;
`;

const ListId = styled.div`
  background: #FFFFFF;
  border-radius: 10px;
  padding: 15px 35px;
`;

const ListTime = styled.div`
  margin: 5px 15px 5px;
`;

const ListData = styled.div`
  display: flex;
  align-items: baseline;
`;

const ImgContainer = styled.div`
  width: 800px;
  height: 600px;
  margin: 50px 70px 50px 23%;
  overflow: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${({ slideIndex }) => slideIndex * -100}%);
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

const AdoptionStatus = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

const AdoptionCheckbox = styled.input`
  margin-right: 5px;
  cursor: pointer;
`;

const AdoptionLabel = styled.label`
  cursor: pointer;
`;

const ListDetail = styled.div`
  margin: auto 80px;
`;

const ListInfo = styled.div`
  background: #FFFFFF;
  padding: 30px  40px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const InfoTextContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 100px;
  margin-bottom: 20px;
  text-align: left;
`;

const InfoText = styled.div`
  margin: 5px 100px;
  font-size: 1.2em;
`;

const ListText = styled.div`
  background: #FFFFFF;
  padding: 50px  40px;
  border-radius: 10px;
  margin-bottom: 20px;
  line-height: 1.5;
  font-size: 1.2em;
  word-break: keep-all;
  white-space: pre-line;
`;

export default ListDetailContent;
