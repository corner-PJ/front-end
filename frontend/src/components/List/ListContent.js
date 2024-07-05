import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ListContent = ({ data, setData }) => {
  const navigate = useNavigate();

  const goToDetail = (item) => {
    console.log(item)
    navigate(`/listDetail/${item.id}`, {state: {data: item}});
  }
console.log(data)
  return (
    <ListContainer>
      {data.map((item) => (
        <ListItem onClick={() => goToDetail(item)}>
          <ListImg src={item.img[0]} alt="dog" />
          <ListText>
            <ItemText>이름: {item.dogName}</ItemText>
            <ItemText>품종: {item.species}</ItemText>
            <ItemText>추정나이: {item.age}살</ItemText>
            {item.type === "Adopt"? <ItemText>임시 보호기간: {item.period}개월</ItemText> : null }
            {item.isAdopted ? <ItemText>입양됨</ItemText> : <ItemText>입양 안 됨</ItemText>}
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