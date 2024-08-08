import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useTokenContext } from '../TokenContext';

function ReviewComment({ reviewId }) {
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState('');
    // const [isSecret, setIsSecret] = useState(false); // 비밀댓글관련 부분이 백엔드에 없어서 적용되지 않음
    const [replyIndex, setReplyIndex] = useState(null);

    // // localStorage에서 토큰 가져오기
    // const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    // 임시로 context를 활용해 토큰 가져옴
    const { ACCESS_TOKEN } = useTokenContext();

    useEffect(() => {
        ReviewCommentsData();
    }, [reviewId, navigate]);

    // 리뷰 댓글 조회
    const ReviewCommentsData = async () => {
        try {
            const response = await axios.get(`/reviews/${reviewId}/comments`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });

            if (response.status === 200) {
                const comments = response.data.data;

                // 댓글만 분리
                const parentComments = comments.filter(comment => comment.parentCommentId === null);

                // 각 댓글에 해당하는 대댓글 저장
                parentComments.forEach(parent => {
                    parent.replies = comments.filter(comment => comment.parentCommentId === parent.cmtId);

                    parent.replies.sort((a, b) => new Date(b.cmtDate) - new Date(a.cmtDate));
                });

                parentComments.sort((a, b) => new Date(b.cmtDate) - new Date(a.cmtDate));

                setComments(parentComments);
                // console.log('댓글 확인: ', parentComments);
            } else {
                alert("댓글을 불러오는데 실패했습니다.");
            }
        } catch (error) {
            console.error('댓글 조회 실패:', error);

            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                alert('토큰이 만료되었습니다. 다시 로그인하세요.');
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

    // 리뷰 댓글 작성 
    const handleCommentSubmit = async () => {
        if (!newComment) return;

        try {
            const response = await axios.post(
                `/reviews/${reviewId}/comments`,
                {
                    content: newComment,
                    parentCommentId: null,
                    // isSecret: isSecret
                },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`
                    }
                }
            );
            if (response.status === 200) {
                ReviewCommentsData();
                setNewComment('');
                // setIsSecret(false);
                // console.log("댓글 확인:", comments);
                alert("댓글이 등록되었습니다.");
            } else {
                alert("댓글을 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error('댓글 작성 실패:', error);

            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                alert('토큰이 만료되었습니다. 다시 로그인하세요.');
                navigate('/login');
            }
        }
    };

    // 리뷰 대댓글 작성
    const handleReplySubmit = async (index) => {
        try {
            const comment = comments[index];
            const response = await axios.post(
                `/reviews/comments/${comment.cmtId}/replies`,
                {
                    content: replyText,
                    parentCommentId: comment.cmtId
                },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`
                    }
                }
            );
            if (response.status === 200) {
                ReviewCommentsData();
                setReplyText('');
                setReplyIndex(null);
                alert("대댓글이 등록되었습니다.");
                // console.log("대댓글 확인:", comments);
            } else {
                alert("대댓글 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error('대댓글 작성 실패:', error);

            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                alert('토큰이 만료되었습니다. 다시 로그인하세요.');
                navigate('/login');
            }
        }
    };

    // 리뷰 댓글 삭제
    const handleCommentDelete = async (commentId) => {
        try {
            const response = await axios.delete(`/reviews/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });
            if (response.status === 200) {
                ReviewCommentsData();
                alert("댓글이 삭제되었습니다.");
            } else {
                alert("댓글 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error('댓글 삭제 실패:', error);

            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                alert('토큰이 만료되었습니다. 다시 로그인하세요.');
                navigate('/login');
            }
        }
    };

    // 리뷰 대댓글 삭제
    const handleReplyDelete = async (replyId) => {
        try {
            const response = await axios.delete(`/reviews/comments/replies/${replyId}`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });
            if (response.status === 200) {
                ReviewCommentsData();
                alert("대댓글이 삭제되었습니다.");
            } else {
                alert("대댓글 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error('대댓글 삭제 실패:', error);

            // 토큰이 만료되었거나 유효하지 않을 때
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                alert('토큰이 만료되었습니다. 다시 로그인하세요.');
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
                <Comment key={comment.cmtId}>
                    <CommentHeader>
                        {/* 익명 표시 현재 작동x & 닉네임을 전달 받지 못해 임시로 id 출력 중 */}
                        <CommentId>ID. {comment.isSecret ? '익명' : comment.cmtId}</CommentId>
                        {/* 자신이 작성한 댓글만 삭제 못함 ( 현재 모두에게 삭제 버튼 표시 중 ) */}                                
                        <DeleteButton onClick={() => handleCommentDelete(comment.cmtId)}>삭제</DeleteButton>
                    </CommentHeader>
                    <CommentBody>
                        <CommentText>{comment.content}</CommentText>
                        <CommentDate>{formatDate(comment.cmtDate)}</CommentDate>
                    </CommentBody>
                    <ReplyButton onClick={() => handleReplyClick(index)}>답글</ReplyButton>
                    {replyIndex === index && (
                        <ReplyInputContainer>
                            <ReplyInput value={replyText} onChange={handleReplyChange} placeholder="답글 입력" />
                            <ReplySubmitButton onClick={() => handleReplySubmit(index)}>답글 달기</ReplySubmitButton>
                        </ReplyInputContainer>
                    )}
                    {comment.replies && comment.replies.map((reply) => (
                        <ReplyBox key={reply.cmtId}>
                            <ReplyHeader>
                                <ReplyId>ID. {reply.cmtId}</ReplyId>
                            <DeleteButton onClick={() => handleReplyDelete(reply.cmtId)}>삭제</DeleteButton>
                            </ReplyHeader>
                            <ReplyText>{reply.content}</ReplyText>
                            <ReplyDate>{formatDate(reply.cmtDate)}</ReplyDate>
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
    border: 1.5px solid #E4EAF0;

    &:hover {
        border: 1.5px solid #000000;
       cursor: pointer;
    }
`;

export default ReviewComment;