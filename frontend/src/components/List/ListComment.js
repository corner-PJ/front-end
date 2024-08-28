import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListComment({ postId }) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyIndex, setReplyIndex] = useState(null);
    const [replyText, setReplyText] = useState('');
    // const [isSecret, setIsSecret] = useState(false);

    // // localStorage에서 토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('authToken');
    
    useEffect(() => {          
        ListCommentsData();
    }, [postId, navigate]);    

    // 공고 댓글 조회
    const ListCommentsData = async () => {
        try {
            const response = await axios.get(`/comment/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            });

            if (response.status === 200) {
                const comments = response.data.data;
    
                // 댓글 정렬
                comments.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

                // 대댓글 정렬
                comments.forEach(comment => {
                    comment.replies.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                });
    
                setComments(comments);
                console.log('댓글 확인: ', comments);
                // console.log('댓글 확인: ', parentComments);
            } else {
                toast.error('댓글을 불러오는데 실패했습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });

            }
        } catch (error) {
            console.error("댓글 조회 실패:", error);
            
            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                toast.error('토큰이 만료되었습니다. 다시 로그인하세요.', {
                    autoClose: 3000,
                    position: "top-center",
                });
                navigate('/login');
            }     
        }
    };

    // 작성 시간 표현 설정
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // 댓글 등록
    const handleCommentSubmit = async () => {
        if (!newComment) return;

        try {
            const response = await axios.post(`/addComment?postId=${postId}&content=${newComment}`, {
                postId: postId,
                content: newComment
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });
            const result = response.data;
            console.log(result);
            if (response.status === 200) {
                ListCommentsData();
                setNewComment('');
                // setIsSecret(false);
                toast.success('댓글이 등록되었습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
            } else {
                toast.error('댓글 등록에 실패했습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error("댓글 작성 실패:", error);
            
            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                toast.error('토큰이 만료되었습니다. 다시 로그인하세요.', {
                    autoClose: 3000,
                    position: "top-center",
                });
                navigate('/login');
            }
        }
    };

    // 대댓글 등록
    const handleReplySubmit = async (parentIndex) => {
        if (!replyText) return;

        const comment = comments[parentIndex];
        try {
            const response = await axios.post(`/addComment?postId=${postId}&content=${replyText}&parentCommentId=${comment.commentId}`, {
                postId: postId,
                content: replyText,
                parentCommentId: comment.commentId
            }, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });
            const result = response.data;
            console.log(result);
            if (response.status === 200) {
                ListCommentsData();
                setReplyText('');
                setReplyIndex(null);
                toast.success('댓글이 등록되었습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
            } else {
                toast.error('댓글 등록에 실패했습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error("대댓글 작성 실패:", error);
            
            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                toast.error('토큰이 만료되었습니다. 다시 로그인하세요.', {
                    autoClose: 3000,
                    position: "top-center",
                });
                navigate('/login');
            }
        }
    };

    // 댓글 삭제
    const handleCommentDelete = async (commentId) => {
        try {
            const response = await axios.delete(`/delComment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });
            const result = response.data;
            console.log(result);
            if (response.status === 200) {
                ListCommentsData();
                toast.success('댓글이 삭제되었습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
            } else {
                toast.error('댓글 삭제에 실패했습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error("댓글 삭제 실패:", error);

            if (error.response.status === 403 || error.response.status === 404 ) {
                toast.error('작성자만 변경할 수 있습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
            }

            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                toast.error('토큰이 만료되었습니다. 다시 로그인하세요.', {
                    autoClose: 3000,
                    position: "top-center",
                });
                navigate('/login');
            }
        }
    };

    // const handleSecretClick = () => {
    //     setIsSecret(!isSecret);
    // };

    const handleReplyClick = (index) => {
        setReplyIndex(replyIndex === index ? null : index); 
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    return (
        <CommentContainer>
            {comments.map((comment, index) => (
                <Comment key={comment.commentId}>
                    <CommentHeader>
                        <CommentId>ID. {comment.isSecret ? '익명' : comment.userId}</CommentId>
                        <DeleteButton onClick={() => handleCommentDelete(comment.commentId)}>삭제</DeleteButton>
                    </CommentHeader>
                    <CommentBody>
                        <CommentText>{comment.content}</CommentText>
                        <CommentDate>{formatDate(comment.createdDate)}</CommentDate>
                    </CommentBody>
                    <ReplyButton onClick={() => handleReplyClick(index)}>답글</ReplyButton>
                    {replyIndex === index && (
                        <ReplyInputContainer>
                            <ReplyInput value={replyText} onChange={handleReplyChange} placeholder="답글 입력" />
                            <ReplySubmitButton onClick={() => handleReplySubmit(index)}>답글 달기</ReplySubmitButton>
                        </ReplyInputContainer>
                    )}
                    {comment.replies && comment.replies.map((reply) => (
                        <ReplyBox key={reply.commentId}>
                            <ReplyHeader>
                                <ReplyId>ID. {reply.userId}</ReplyId>
                            <DeleteButton onClick={() => handleCommentDelete(reply.commentId)}>삭제</DeleteButton>
                            </ReplyHeader>
                            <ReplyText>{reply.content}</ReplyText>
                            <ReplyDate>{formatDate(comment.createdDate)}</ReplyDate>
                        </ReplyBox>
                    ))}
                    <hr style={{ marginTop: "20px" }} />
                </Comment>
            ))}
            <CommentAdd>
                <CommentAddHeader>댓글</CommentAddHeader>
                <CommentInput value={newComment} onChange={handleNewCommentChange} />
                <CommentOptions>
                    {/* <SecretOption onClick={handleSecretClick}>
                        <SecretCheckbox
                            type="checkbox"
                            checked={isSecret}
                            onChange={() => setIsSecret(!isSecret)}
                        />
                        <SecretLabel>비밀댓글</SecretLabel>
                    </SecretOption> */}
                    <SubmitButton onClick={handleCommentSubmit}>댓글 달기</SubmitButton>
                </CommentOptions>
            </CommentAdd>
        </CommentContainer>
    );
}

const CommentContainer = styled.div`
    padding: 20px;
    margin-top: 30px;
    text-align: left;
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

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 1em;
  cursor: pointer;
  margin-left: 10px;
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

const ReplyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
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

// const SecretOption = styled.div`
//     display: flex;
//     align-items: center;
//     cursor: pointer;
// `;

// const SecretCheckbox = styled.input`
//     margin-right: 5px;
//     cursor: pointer;
// `;
// const SecretLabel = styled.label`
//     margin-right: 15px; 
// `;

const SubmitButton = styled.button`
    background-color: #FFFFFF;
    font-weight: bold;
    padding: 5px 10px;
    border: 1px solid #E4EAF0;
    
    &:hover {
        border: 1.5px solid #000000;
       cursor: pointer;
    }    
`;

export default ListComment;