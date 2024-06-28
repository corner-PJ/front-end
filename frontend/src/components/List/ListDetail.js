import styled from 'styled-components';
import ListDetailContent from './ListDetailContent';
import ListComment from './ListComment';
import { useLocation } from 'react-router-dom';

function ListDetail() {
    const location = useLocation();
    const { data } = location.state || {}; 

    return(
        <ListDetailContainer>
            <ListDetailContent />
            {data.type === "Adopt"? <ListComment /> : null}            
        </ListDetailContainer>
    )
}

const ListDetailContainer = styled.div`
    margin: 8em;
    text-algin: center;
`


export default ListDetail;