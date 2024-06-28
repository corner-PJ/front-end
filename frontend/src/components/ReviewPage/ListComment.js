import styled from 'styled-components';
import { useState } from 'react';
import { useReviewContext } from '../ReviewContext';


function ListComment() {
    const { reviewsComments, addReviewComment, addReviewReply } = useReviewContext();
    const [isSecret, setIsSecret] = useState(false);
    const [replyIndex, setReplyIndex] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState('');

    const handleSecretClick = () => {
        setIsSecret(!isSecret);
    };

    const handleReplyClick = (index) => {
        setReplyIndex(replyIndex === index ? null : index); 
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (!newComment) return;

        const commentData = {
            text: newComment,
            isSecret: isSecret,
        };

        console.log("새로운 댓글:", newComment);


        addReviewComment(commentData);
        setNewComment('');
        setIsSecret(false);
    };

    const handleReplySubmit = (parentIndex) => {
        if (!replyText) return;

        addReviewReply(parentIndex, replyText);
        setReplyText('');
        setReplyIndex(null);
    };

    return(
        <CommentContainer>
            {reviewsComments.map((comment, index) => (
                <Comment key={index}>
                    <CommentHeader>
                        <CommentId>ID. {comment.isSecret ? '익명' : comment.id}</CommentId>
                    </CommentHeader>
                    <CommentBody>
                        <CommentText>{comment.text}</CommentText>
                        <CommentDate>{comment.date}</CommentDate>
                    </CommentBody>
                    <ReplyButton onClick={() => handleReplyClick(index)}>답글</ReplyButton>
                    {replyIndex === index && (
                        <ReplyInputContainer>
                            <ReplyInput value={replyText} onChange={handleReplyChange} placeholder="답글 입력" />
                            <ReplySubmitButton  onClick={() => handleReplySubmit(index)}>답글 달기</ReplySubmitButton>
                        </ReplyInputContainer>
                    )}
                    {comment.replies && comment.replies.map((reply, idx) => (
                        <ReplyBox key={idx}>
                            <ReplyId>ID. {reply.id}</ReplyId>
                            <ReplyText>{reply.text}</ReplyText>
                            <ReplyDate>{reply.date}</ReplyDate>
                        </ReplyBox>
                    ))}
                    <hr style={{marginTop: "20px"}} />
                </Comment>
            ))}
            <CommentAdd>
                <CommentAddHeader>댓글</CommentAddHeader>
                <CommentInput value={newComment} onChange={handleNewCommentChange}  />
                <CommentOptions>
                    <SecretOption onClick={handleSecretClick}>
                        <SecretCheckbox
                            type="checkbox"
                            checked={isSecret}
                            onChange={() => setIsSecret(!isSecret)}
                        />
                        <SecretLabel>비밀댓글</SecretLabel>
                    </SecretOption>
                    <SubmitButton onClick={handleCommentSubmit}>댓글 달기</SubmitButton>
                </CommentOptions>
            </CommentAdd>
        </CommentContainer>
    )
}

const CommentContainer = styled.div`
    padding: 20px;
    margin-top: 30px;
`;

const Comment = styled.div`
    padding: 15px;
    background-color: #FFFFFF;
    margin-bottom: 10px;
`;

const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`;

const CommentId = styled.div`
    font-weight: bold;
    padding: 6px;
    border: 1.5px solid #000000;
    border-radius: 10px;
`;

const CommentBody = styled.div`
    margin-bottom: 10px;
`;

const CommentText = styled.div`
    margin-bottom: 5px;
`;

const CommentDate = styled.div`
    font-size: 0.8em;
    color: #888;
`;

const ReplyButton = styled.button`
    background: none;
    border: 1px solid #000000;
    padding: 5px 15px;
    cursor: pointer;
`;

const ReplyInputContainer = styled.div`
    margin: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ReplySubmitButton = styled.button`
    align-self: flex-end;
    margin-right: 30px;
    background-color: #FFFFFF;
    font-weight: bold;
    padding: 5px 10px;
    border: 1px solid #000000;
    cursor: pointer;
`;

const ReplyInput = styled.input`
    width: 96%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const ReplyBox = styled.div`
    margin-top: 10px;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
`;

const ReplyId = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const ReplyText = styled.div`
    margin-bottom: 5px;
`;

const ReplyDate = styled.div`
    font-size: 0.8em;
    color: #888;
`;

const CommentAdd = styled.div`
    padding: 15px;
    background-color: #FFF;
    border-radius: 10px;
    margin-top: 10px;
`;

const CommentAddHeader = styled.div`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 20px;
`

const CommentInput = styled.input`
    width: 96%;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const CommentOptions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const SecretOption = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const SecretCheckbox = styled.input`
    margin-right: 5px;
    cursor: pointer;
`;
const SecretLabel = styled.label`
    margin-right: 15px;
`;

const SubmitButton = styled.button`
    background-color: #FFFFFF;
    font-weight: bold;
    padding: 5px 10px;
    border: 1px solid #000000;
    cursor: pointer;
`;

export default ListComment;