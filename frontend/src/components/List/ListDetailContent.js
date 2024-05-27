import { useState } from 'react';
import styled from 'styled-components';

const data = [
    {
      id: 1,
      img: "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
    },
    {
      id: 2,
      img: "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
    },
    {
      id: 3,
      img: "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
    },
    {
      id: 4,
      img: "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
    },
    {
      id: 5,
      img: "https://www.fitpetmall.com/wp-content/uploads/2023/10/b37132cb-8757-4678-b8f6-9f9e25cb04ca-1.png",
    },
  ];
function ListDetailContent() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [isAdopted, setIsAdopted] = useState(false);
        
    const moveToPrevSlide = () => {
      setSlideIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    };
  
    const moveToNextSlide = () => {
      setSlideIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    };
  
    const moveDot = (index) => {
      setSlideIndex(index);
    };
    
    const handleCheckboxChange = () => {
      setIsAdopted(!isAdopted);
    };

    return(
        <ListDetailContainer>
            {/* 아이디, 작성된 날짜 */}
            <ListUser>
                <ListId>ID.나무맘</ListId>
                <ListTime>2024.03.03 23:10:09</ListTime>
            </ListUser>
            <ListData>
                {/* 이미지와 입양 체크박스 */}
                <ImgContainer>
                    <Arrow direction="prev" onClick={moveToPrevSlide}>
                        ‹
                    </Arrow>
                    <Wrapper slideIndex={slideIndex}>
                        {data.map((item) => (
                        <ImgSlide key={item.id}>
                            <Img
                            src={process.env.PUBLIC_URL + `${item.img}`}
                            />
                        </ImgSlide>
                        ))}
                    </Wrapper>
                    <Arrow direction="next" onClick={moveToNextSlide}>
                        ›
                    </Arrow>
                    <DotContainer>
                        {data.map((item, index) => (
                        <Dot
                            key={item.id}
                            className={index === slideIndex ? "active" : null}
                            onClick={() => moveDot(index)}
                        />
                        ))}
                    </DotContainer>
                </ImgContainer>
                <AdoptionStatus onClick={handleCheckboxChange}>
                        <AdoptionCheckbox
                            type="checkbox"
                            checked={isAdopted}
                            onChange={() => setIsAdopted(!isAdopted)}
                        />
                        <AdoptionLabel>입양 완료</AdoptionLabel>
                </AdoptionStatus>
              </ListData>
                {/* 기본사항, 작성한 글 내용 */}
              <ListDetail>
                  <ListInfo>
                    <InfoTitle>기본사항</InfoTitle>
                    <InfoTextContainer>
                      <InfoText>이름: 해피</InfoText>
                      <InfoText>품종:믹스견 </InfoText>
                      <InfoText>임시 보호 기간: 3개월</InfoText>
                      <InfoText>중성화 여부: o</InfoText>
                      <InfoText>임시 보호자 연락처: 010-1517-5151</InfoText>
                      <InfoText>추정나이: 3살</InfoText>
                    </InfoTextContainer>
                  </ListInfo>
                  <ListText>안녕하세요. 해피를 3개월 동안 임시 보호하고 있는 임시 보호자 입니다. 
저희 해피는 사진에서 보시는 것처럼 밝고, 잘 웃습니다. 그래서 해피가 주는 기쁨만큼 해피에게 과거에 행복했고 사랑받았던 일을 기억하게 해주고 싶습니다. 아래는 해피의 ai 분석 결과입니다. 그 결과는 아래에서 확인할 수 있습니다. 해피에게 행복한 일상을 선물해줄 주인을 기다립니다.  </ListText>
              </ListDetail>
        </ListDetailContainer>
    )
}

const ListDetailContainer = styled.div`
  height: auto;
  background: #FFE6E6;
  border-radius: 10px;
  padding: 20px;
`;

const ListUser = styled.div`
  display: flex;
  flex-weap = weap;
  justify-content: space-between;
  font-size: 15px;
  font-weight: blod;
`;

const ListId = styled.div`
  background: #FFFFFF;
  border-radius: 10px;
  padding: 15px 35px;
`;

const ListTime =styled.div`
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
  text-argin: center;
`;

const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center
`;

const InfoTextContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;  

const InfoText = styled.div`
  margin: 5px 80px;
`;

const ListText = styled.div`
  background: #FFFFFF;
  padding: 50px  40px;
  border-radius: 10px;
  margin-bottom: 20px;
  line-height: 1.5;

`;

export default ListDetailContent;