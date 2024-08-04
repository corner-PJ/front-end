import styled from "@emotion/styled";

/* MyInfo */
export const MyInfoWrapper = styled.div`
	min-height: 60vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	align-items: center;
`;

export const MyInfoHeader = styled.span`
    color: black;
    text-overflow: ellipsis;
    font-size: 32px;
    font-family: Inter, sans-serif;
    font-weight: 800;
    text-align: left;
    position: center;
    margin-bottom: 30px;
`;

export const MyInfoRectangle = styled.div`
	display: flex;
	flex-direction: column;
    position: relative;
    background-color: rgb(255, 243, 199);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
	border: solid 1px rgb(235, 235, 235);
	border-radius: 16px;
	width: 510px;
	height: 360px;

`;

export const BoxContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
	margin-bottom: 7px;
    margin-top: 25px;
`;

export const Text = styled.span`
    position: relative;
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: bold;
    margin-left: 30px;
`;

export const InfoSpan = styled.span`
	color: rgb(0, 0, 0, 0.6);
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 500;
    margin-right: 30px;
`;

export const modifyBtn = styled.button`
    cursor: pointer;
    color: black; 
    background: none;
    border: none;

    svg {
        font-size: 14px; 
    }
`;

export const PasswordChangeButton = styled.button`
	color: black;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: bold;
    margin-left: 30px;
    border: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const WithdrawButton = styled.span`
	color: rgba(0, 0, 0, 0.6);
	font-size: 16px;
	font-family: Inter, sans-serif;
	font-weight: 400;
    margin-left: 30px;
    margin-top: -8px;
    border: none;

    &:hover {
        text-decoration: underline;
    }
`;