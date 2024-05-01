import styled from 'styled-components';
import styled from "@emotion/styled";

export const LoginRootWrapper = styled.div`
	min-height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: center;
`;


export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 94px
`;

export const LogoImg = styled.img`
	text-overflow: ellipsis;
	font-size: 70px;
	font-family: Knewave, sans-serif;
	font-weight: 400;
	text-align: left;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	width: 216px;
    margin-bottom: 20px;
    margin-top: 55px;
`;

export const Text1 = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 21px;
	font-family: Inter, sans-serif;
	font-weight: light;
	text-align: left;
`;


export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;

    & > *:not(:last-child) {
        width: 390px;
        max-width: 100%;
        box-sizing: border-box; 
        height: 55px;
    }
`;

export const IdInputBox = styled.input`
    font-size: 17px;
    border: solid 1px rgb(217, 217, 217);
    border-radius: 5px;
    padding-left: 20px;
    width: 100%; 
    max-width: 100%; 
    box-sizing: border-box; 

    &:focus {
        border: 1px solid rgb(252, 129, 158);
        outline: none; 
    }
`;

export const PasswordInputBox = styled.input`
    font-size: 17px;
    border: solid 1px rgb(217, 217, 217);
    border-radius: 5px;
    padding-left: 20px;
    margin-top: 10px;
    width: 100%; 
    max-width: 100%; 
    box-sizing: border-box; 

    &:focus {
        border: 1px solid rgb(252, 129, 158);
        outline: none; 
    }
`;

export const LoginButton = styled.button`
    color: white;
    font-weight: bold;
    font-size: 18px;
    background-color: rgb(252, 129, 158);
    border-radius: 5px;
    border: none;
    margin-top: 10px;
    width: 100%; 
    max-width: 100%; 
    box-sizing: border-box; 

    &:hover {
        background-color: white;
        border: 4px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
        box-shadow: 0px 4px 4px 2px rgba(252, 129, 158, 0.25); 
    }
`;

export const SigninButton = styled.button`
    color: white;
    font-weight: bold;
    font-size: 18px;
    background-color: rgb(254, 199, 180);
    border-radius: 5px;
    border: none;
    margin-top: 10px;
    width: 100%; 
    max-width: 100%; 
    box-sizing: border-box; 
    height: 55px;

    &:hover {
        background-color: white;
        border: 4px solid rgb(254, 199, 180);
        color: rgb(254, 199, 180);
        box-shadow: 0px 4px 4px 2px rgba(254, 199, 180, 0.25); 
    }
`;

export const SocialContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`;

export const Line = styled.div`
	width: 390px;
	height: 0px;
	border-top: solid 1.5px rgb(217, 217, 217);
    margin-top: 20px;
	transform: rotate(0deg);
	transform-origin: top left;
`;

export const Text2 = styled.span`
	color: rgb(217, 217, 217);
	text-overflow: ellipsis;
	font-size: 20px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-align: left;
    margin-top: 20px;
`;

export const SocialLogo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-left: 20px;
`;

export const SocialLogoImg = styled.img`
	object-fit: cover;
    margin-right: 30px;
`;

