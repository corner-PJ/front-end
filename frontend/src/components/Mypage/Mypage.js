import React from "react";
import styled from "@emotion/styled";
import { MyInfo } from "./MyInfo";
import { MyPet } from "./MyPet";
import { MyWriting } from "./MyWriting";

export function Mypage() {

    return (
        <MypageRootWrapper>
            <MyInfo />
            <MyPet />
            <MyWriting />
        </MypageRootWrapper>
    );
}

const MypageRootWrapper = styled.div`
	min-height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
`;


