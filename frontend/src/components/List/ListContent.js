import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const ListContent = ({ data }) => {
  const [isAdopted, setIsAdopted] = useState(false);
  const navigate = useNavigate();

  const goToDetail = (listId) => {
    navigate(`/listDetail/${listId}`);
  }

  return (
    <ListContainer>
      {data.map((item) => (
        <ListItem onClick={() => goToDetail(item.id)}>
          <ListImg src={item.img} alt="dog" />
          <ListText>
            <ItemText>이름: {item.nickName}</ItemText>
            <ItemText>품종: {item.temperature}</ItemText>
            <ItemText>추정나이: {item.userEmail}</ItemText>
            {item.title ? <ItemText>임시 보호기간: {item.title}</ItemText> : null}
            {isAdopted ? <ItemText>입양됨</ItemText> : <ItemText>입양 안 됨</ItemText>}
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
    height: 150px;
    object-fit: contain;
    margin-bottom: 15px;
`

const ListText = styled.div`
    width: 100%;
    height: 150px;
    background: #FFFCFC;
    border-radius: 10px;
`

const ItemText = styled.div`
    font-size: 1.2em;
`

export default ListContent;