import { useRef } from 'react';
import styled from 'styled-components';

function WriteText({content, setContent}) {
    const contentRef = useRef();

    return(
        <WriteTextConatiner>
            <TextBox 
                placeholder="글 작성"
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </WriteTextConatiner>
    )
}


const WriteTextConatiner = styled.div`
    margin: 20px 0 60px;
`
const TextBox = styled.textarea`
    font-size: 1.4em;
    box-sizing: border-box;
    width: 1150px;
    min-height: 220px;
    resize: vertical;
    border: 2px solid #000000;
    border-radius: 15px;
    padding: 30px;
`

export default WriteText;