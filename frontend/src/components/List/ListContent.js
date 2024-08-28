import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const ListContent = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToDetail = (postId) => {
    const searchParams = new URLSearchParams(location.search);
    const queryType = searchParams.get('type') || 'adopt';
    navigate(`/list/${queryType}/${postId}`);
  }

  return (
    <ListContainer>
      {data.length === 0 ? (
        <NoDataMessage>등록된 글이 없습니다.</NoDataMessage>
      ) : (
        data.map((item) => (
          <ListItem key={item.adoptPostId || item.shelterPostId} onClick={() => goToDetail(item.adoptPostId || item.shelterPostId)}>
            <ListImg src={item.thumbnail} alt="dog" />
            <ListText>
              <ItemText>이름: {item.name || item.title}</ItemText>
              {item.duration ? <ItemText>품종: {item.breed}</ItemText> : <ItemText>성별: {item.sex}</ItemText> }
              <ItemText>추정나이: {item.age}</ItemText>
              {item.duration ? <ItemText>임시 보호기간: {item.duration}</ItemText> : null }
              {/* {item.isAdopt ? <ItemText>입양됨</ItemText> : <ItemText>입양 안 됨</ItemText>} */}
            </ListText>
          </ListItem>
        ))
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 45px;
`;

const ListItem = styled.div`
    width: 400px; 
    padding: 10px;
    text-align: center;
    box-sizing: border-box;
    background: #FFE6E6;
    border-radius: 10px;
    box-shadow: 0 3px 10px 0px rgba(0, 0, 0, 0.3);
`;

const ListImg = styled.img`
    width: 100%;
    height: 180px;
    object-fit: contain;
    margin: 10px 0;
`

const ListText = styled.div`
    width: 100%;
    height: auto;
    padding: 10px 0;
    background: #FFFCFC;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
`

const ItemText = styled.div`
    font-size: 1.2em;
`

const NoDataMessage = styled.div`
    color: rgba(0, 0, 0, 0.6);
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-left: 80px;
    margin-top: 25px;
`;

export default ListContent;