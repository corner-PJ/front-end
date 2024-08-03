import styled from "@emotion/styled";
// import styled from 'styled-components';

export const SigninRootWrapper = styled.div`
	min-height: 100vh;
	background-color: white;
    display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: center;
`;


export const HeaderText = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 32px;
	font-family: Inter, sans-serif;
	font-weight: 800;
	text-align: left;
	position: center;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
	margin-top: 65px;

    & > *:not(:last-child) {
        width: 390px;
        max-width: 100%;
        box-sizing: border-box; 
        height: 55px;
    }
`;

export const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
	margin-bottom: 30px;
	min-height: 100px;
`;

export const Text = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 17px;
	font-family: Inter, sans-serif;
	font-weight: 500;
	text-align: left;
	margin-bottom: 8px;
`;

export const NameInputBox = styled.input`
    font-size: 17px;
    border: solid 1px rgb(217, 217, 217);
    border-radius: 5px;
    padding-left: 20px;
    width: 100%; 
    max-width: 100%; 
    box-sizing: border-box; 
	height: 50px;
	margin-bottom: 15px;

    &:focus {
        border: 1px solid rgb(252, 129, 158);
        outline: none; 
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
	height: 50px;
	margin-bottom: 15px;

	&:focus {
		border: 1px solid rgb(252, 129, 158);
		outline: none; 
	}
`;

export const EmailInputBox = styled.input`
    font-size: 17px;
    border: solid 1px rgb(217, 217, 217);
    border-radius: 5px;
    padding-left: 20px;
    width: 100%; 
	height: 50px;
    max-width: 100%; 
    box-sizing: border-box; 
	margin-bottom: 15px;

    &:focus {
        border: 1px solid rgb(252, 129, 158);
        outline: none; 
    }
`;

export const NicknameInputBox = styled.input`
	font-size: 17px;
	border: solid 1px rgb(217, 217, 217);
	border-radius: 5px;
	padding-left: 20px;
	width: 100%; 
	height: 50px;
	max-width: 100%; 
	box-sizing: border-box; 
	margin-bottom: 15px;

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
    width: 100%; 
	height: 50px;
    max-width: 100%; 
    box-sizing: border-box; 
	margin-bottom: 15px;

    &:focus {
        border: 1px solid rgb(252, 129, 158);
        outline: none; 
    }
`;

export const PasswordConfirmInputBox = styled.input`
	font-size: 17px;
	border: solid 1px rgb(217, 217, 217);
	border-radius: 5px;
	padding-left: 20px;
	width: 100%; 
	height: 50px;
	max-width: 100%; 
	box-sizing: border-box; 
	margin-bottom: 15px;

	&:focus {
		border: 1px solid rgb(252, 129, 158);
		outline: none; 
	}
`;

export const InfoText = styled.span`
	color: rgb(252, 129, 158);
	font-size: 16px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-align: left;
    margin-top: 4px; 
    display: block; 
    margin-top: 4px; 
`;

export const PolicyContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
	height: auto;
    min-height: 250px;
	margin-top: 14px;
	margin-bottom: 25px;
`;

export const PolicyText = styled.span`
    color: black;
    font-size: 19px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    text-align: left;
    margin-bottom: 8px;
`;

export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

export const CheckboxRectangle = styled.div`
    width: 88%;
    min-height: 160px;
    background-color: rgb(245, 245, 245);
    border-radius: 5px;
    position: relative;
    margin-bottom: 10px;
	padding: 20px;
	padding-left: 25px;
`;

export const CheckboxInputAll = styled.input`
    position: relative;
    margin-right: 8px;
	margin-left: -1px;
	margin-top: 10px;

	/* 기본 체크박스 숨기기 */
    appearance: none;
	-webkit-appearance: none;
    -moz-appearance: none;

	width: 1.7em;
    height: 1.7em;
    border: 2px solid rgb(169, 169, 169);
    border-radius: 50%; 
    outline: none; /
    cursor: pointer;

    &:checked {
        background-color: rgb(252, 129, 158);
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		border: none;
		background-repeat: no-repeat;
    }
`;


export const CheckboxInput = styled.input`
    position: relative;
    margin-right: 10px;

	/* 기본 체크박스 숨기기 */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

	width: 1.5em;
    height: 1.5em;
    border: 2px solid rgb(169, 169, 169);
    border-radius: 50%; 
    outline: none; /
    cursor: pointer;

    &:checked {
        background-color: rgb(252, 129, 158);
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		border: none;
		background-repeat: no-repeat;
    }
`;

export const Line = styled.hr`
	width: 100%;
	height: 1px;
	background-color: #D9D9D9;
	margin-top: 1px;
	margin-bottom: 14px;
`;

export const CheckboxLabelAll = styled.span`
	font-size: 20px;
	color: black;
	font-family: Inter, sans-serif;
	font-weight: 500;
	cursor: pointer;
	margin-top: 10px;
	white-space: nowrap;
`;

export const CheckboxLabel = styled.span`
	font-size: 18px;
	color: black;
	font-family: Inter, sans-serif;
	font-weight: 500;
	cursor: pointer;
`;


export const SigninButton = styled.button`
    background-color: ${props => props.disabled ? '#d3d3d3' : 'rgb(252, 129, 158)'};
    border: 3px solid ${props => props.disabled ? '#d3d3d3' : 'rgb(252, 129, 158)'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    color: white;
    font-weight: bold;
    font-size: 18px;
    border-radius: 5px;
    margin-top: 10px;
	margin-bottom: 300px;
    width: 100%;
	height: 50px;
    max-width: 100%; 
	display: flex;
	justify-content: center;
	align-items: center;

    &:hover {
        background-color: ${props => props.disabled ? '#d3d3d3' : 'white'};
        background-color: white;
        color: ${props => props.disabled ? '#d3d3d3' : 'rgb(252, 129, 158)'};
        box-shadow: 0px 4px 4px 2px rgba(252, 129, 158, 0.25); 
    }
`;