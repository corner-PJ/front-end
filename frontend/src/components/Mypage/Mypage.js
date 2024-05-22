import React from "react";
import styled from "@emotion/styled";


export function Mypage() {

    return (
        <MypageRootWrapper>
            <h1>마이페이지</h1>
            <hr/>
            <button Link to="/mypage/passwordChange" >비밀번호 변경 페이지</button>
        </MypageRootWrapper>
    );
}

const MypageRootWrapper = styled.div`
	min-height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: center;
`;
