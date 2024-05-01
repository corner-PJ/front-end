import React from "react";
import styled from "@emotion/styled";

export function SigninPage() {

    return (
        <SigninRootWrapper>
            회원가입 페이지
        </SigninRootWrapper>
    )
}

const SigninRootWrapper = styled.div`
	min-height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: center;
`;
