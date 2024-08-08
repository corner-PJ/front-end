import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const ListContent = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToDetail = (postId) => {
    console.log(postId);
    const searchParams = new URLSearchParams(location.search);
    const queryType = searchParams.get('type') || 'adopt';
    navigate(`/list/${queryType}/${postId}`);
  }

console.log(data.index)
  return (
    <ListContainer>
      {data.map((item, index) => (
        // 공고 상세 페이지 id를 못 찾아서 일단 index로만 설정,,
        <ListItem key={index} onClick={() => goToDetail(index + 1)}>
          <ListImg src={item.thumbnail} alt="dog" />
          <ListText>
            <ItemText>이름: {item.name || item.title}</ItemText>
            {item.duration ? <ItemText>품종: {item.breed}</ItemText> : <ItemText>성별: {item.sex}</ItemText> }
            <ItemText>추정나이: {item.age}</ItemText>
            {item.duration ? <ItemText>임시 보호기간: {item.duration}</ItemText> : null }
            {item.isAdopt ? <ItemText>입양됨</ItemText> : <ItemText>입양 안 됨</ItemText>}
          </ListText>
        </ListItem>
      ))}
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

export default ListContent;