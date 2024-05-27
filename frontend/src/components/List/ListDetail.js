import styled from 'styled-components';
import ListDetailContent from './ListDetailContent';
import ListComment from './ListComment';

function ListDetail() {


    return(
        <ListDetailContainer>
            <ListDetailContent />
            <ListComment />
        </ListDetailContainer>
    )
}

const ListDetailContainer = styled.div`
    margin: 8em;
    text-algin: center;
`


export default ListDetail;