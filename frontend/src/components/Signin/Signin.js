import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export function SigninPage() {
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	// 유효성 검사
	const [idError, setIdError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmError, setConfirmError] = useState('');

	const [isIdCheck, setIsIdCheck] = useState(false); // 중복 검사
	const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용 가능한지 아닌지

	const onChangeIdHandler = (e) => {
		const idValue = e.target.value;
		setId(idValue);
		// idCheckHandler(idValue);
	}

	const onChangePasswordHandler = (e) => {
		const { name, value } = e.target;
		if (name === 'password') {
			setPassword(value);
			passwordCheckHandler(value, passwordConfirm);
		} else {
			setPasswordConfirm(value);
			passwordCheckHandler(password, value);
		}
	}

	// 아이디 유효성 검사 
	// const idCheckHandler = async (id) => {
	// 	const idRegex = /^[a-z\d]{5,10}$/;
	// 	if (id === '') {
	// 		setIdError('아이디를 입력해주세요.');
	// 		setIsIdAvailable(false);
	// 		return false;
	// 	} else if (!idRegex.test(id)) {
	// 		setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
	// 		setIsIdAvailable(false);
	// 		return false;
	// 	}
	// 	try {
	// 		const responseData = await idDuplicateCheck(id);
	// 		if (responseData) {
	// 			setIdError('사용 가능한 아이디입니다.');
	// 			setIsIdCheck(true);
	// 			setIsIdAvailable(true);
	// 			return true;
	// 		} else {
	// 			setIdError('이미 사용중인 아이디입니다.');
	// 			setIsIdAvailable(false);
	// 			return false;
	// 		}
	// 	} catch (error) {
	// 		alert('서버 오류입니다. 관리자에게 문의하세요.');
	// 		console.error(error);
	// 		return false;
	// 	}
	// }

	// 비밀번호 유효성 검사
	const passwordCheckHandler = (password, passwordConfirm) => {
		const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
		if (password === '') {
			setPasswordError('비밀번호를 입력해주세요.');
			return false;
		} else if (!passwordRegex.test(password)) {
			setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
			return false;
		} else if (passwordConfirm !== password) {
			setPasswordError('');
			setConfirmError('비밀번호가 일치하지 않습니다.');
			return false;
		} else {
			setPasswordError('');
			setConfirmError('');
			return true;
		}
	}

	// 회원가입 정보 서버에 전달 (추후)
	// const signupHandler = async (e) => {
	// 	e.preventDefault();
		
	// 	const idCheckresult = await idCheckHandler(id);
	// 	if (idCheckresult) setIdError('');
	// 	else return;
	// 	if (!isIdCheck || !isIdAvailable) {
	// 		alert('아이디 중복 검사를 해주세요.');
	// 		return;
	// 	}
	
	// 	const passwordCheckResult = passwordCheckHandler(password, passwordConfirm);
	// 	if (passwordCheckResult) { setPasswordError(''); setConfirmError(''); }
	// 	else return;
	
	// 	try {
	// 		const responseData = await signup(id, password, confirm);
	// 		if (responseData) {
	// 			localStorage.setItem('loginId', id);
	// 			setOpenModal(true);
	// 		} else {
	// 			alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
	// 		}
	// 		} catch (error) {
	// 			alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
	// 			console.error(error);
	// 	}
	// }

	// 체크박스 상태 관리 
	const [all, setAll] = useState(false);
	const [age, setAge] = useState(false);
	const [service, setService] = useState(false);
	const [privacy, setPrivacy] = useState(false);

	// 개별 항목 체크 시 전체 동의 체크 여부 판단 및 업데이트
	useEffect(() => {
        if (age && service && privacy) {
            setAll(true);
        } else {
            setAll(false);
        }
    }, [age, service, privacy]);

	const handleAllChange = (e) => {
        const isChecked = e.target.checked;
        setAll(isChecked);
        setAge(isChecked);
        setService(isChecked);
        setPrivacy(isChecked);
    };

	const handleCheckboxChange = (setState) => (e) => {
        setState(e.target.checked);
	}

	const isFormFilled = () => {
        return !!name && !!id && !!email && !!nickname && !!password && !!passwordConfirm && age && service && privacy;
    };

    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        setIsButtonActive(isFormFilled());
    }, [name, id, email, nickname, password, passwordConfirm, age, service, privacy]);

	
    return (
        <SigninRootWrapper>
			<HeaderText> 회원가입 </HeaderText>

			<ContentContainer>
				<BoxContainer>
					<Text> 이름 </Text>
					<NameInputBox
						type="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</BoxContainer>
				
				<BoxContainer>
					<Text> 아이디 </Text>
					<IdInputBox
						type="id"
						value={id}
						onChange={onChangeIdHandler}
					/>
					{idError && <small className={isIdAvailable ? 'idAvailable' : ''}>{idError}</small>}
				</BoxContainer>
				
				<BoxContainer>
					<Text> 닉네임 </Text>
					<NicknameInputBox
						type="nickname"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>
				</BoxContainer>
				
				<BoxContainer>
					<Text> 이메일 </Text>
					<EmailInputBox
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</BoxContainer>
				
				<BoxContainer>
					<Text> 비밀번호 </Text>
					<PasswordInputBox
						type="password"
						value={password}
						onChange={onChangePasswordHandler}
					/>
					{passwordError && <small>{passwordError}</small>}
				</BoxContainer>		

				<BoxContainer>
					<Text> 비밀번호 확인 </Text>
					<PasswordConfirmInputBox
						type="passwordConfirm"
						value={passwordConfirm}
						onChange={onChangePasswordHandler}
					/>
					{confirmError && <small>{confirmError}</small>}
				</BoxContainer>

				<PolicyContent>
					<PolicyText>서비스 정책</PolicyText>
					<CheckboxRectangle>
						<CheckboxWrapper>
							<CheckboxInputAll type="checkbox" checked={all} onChange={handleAllChange} />
							<CheckboxLabelAll>전체 동의</CheckboxLabelAll>
						</CheckboxWrapper>
						<Line />

						<CheckboxWrapper>
							<CheckboxInput type="checkbox" checked={age} onChange={handleCheckboxChange(setAge)} />
							<CheckboxLabel>만 14세 이상입니다. (필수)</CheckboxLabel>
						</CheckboxWrapper>
						
						<CheckboxWrapper>
							<CheckboxInput type="checkbox" checked={service} onChange={handleCheckboxChange(setService)} />
								<CheckboxLabel>서비스 이용약관 동의 (필수)</CheckboxLabel>
						</CheckboxWrapper>
						
						<CheckboxWrapper>
							<CheckboxInput type="checkbox" checked={privacy} onChange={handleCheckboxChange(setPrivacy)} />
							<CheckboxLabel>개인정보 수집 및 이용 동의 (필수)</CheckboxLabel>
						</CheckboxWrapper>
					</CheckboxRectangle>	
				</PolicyContent>

				<SigninButton
					//onClick={handleLogin}
					// disabled={!id || !password || password !== passwordConfirm}
					as={Link} to="/login"
					disabled={!isButtonActive}
				>
					회원가입
				</SigninButton>

			</ContentContainer>
			{/*<InfoText> 이미 사용중인 아이디입니다.</InfoText>*/}
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


const HeaderText = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 32px;
	font-family: Inter, sans-serif;
	font-weight: 800;
	text-align: left;
	position: center;
`;

const ContentContainer = styled.div`
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

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
	margin-bottom: 30px;
	min-height: 100px;
`;

const Text = styled.span`
	color: black;
	text-overflow: ellipsis;
	font-size: 17px;
	font-family: Inter, sans-serif;
	font-weight: 500;
	text-align: left;
	margin-bottom: 8px;
`;

const NameInputBox = styled.input`
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

const IdInputBox = styled.input`
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

const EmailInputBox = styled.input`
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

const NicknameInputBox = styled.input`
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

const PasswordInputBox = styled.input`
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

const PasswordConfirmInputBox = styled.input`
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

const InfoText = styled.span`
	color: rgb(252, 129, 158);
	text-overflow: ellipsis;
	font-size: 16px;
	font-family: Inter, sans-serif;
	font-weight: 400;
	text-align: left;
	position: absolute;
	left: 544px;
	top: 456px;
`;

const PolicyContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
	height: auto;
    min-height: 250px;
	margin-top: 14px;
	margin-bottom: 25px;
`;

const PolicyText = styled.span`
    color: black;
    font-size: 19px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    text-align: left;
    margin-bottom: 8px;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const CheckboxRectangle = styled.div`
    width: 88%;
    min-height: 160px;
    background-color: rgb(245, 245, 245);
    border-radius: 5px;
    position: relative;
    margin-bottom: 10px;
	padding: 20px;
	padding-left: 25px;
`;

const CheckboxInputAll = styled.input`
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


const CheckboxInput = styled.input`
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

const Line = styled.hr`
	width: 100%;
	height: 1px;
	background-color: #D9D9D9;
	margin-top: 1px;
	margin-bottom: 14px;
`;

const CheckboxLabelAll = styled.span`
	font-size: 20px;
	color: black;
	font-family: Inter, sans-serif;
	font-weight: 500;
	cursor: pointer;
	margin-top: 10px;
	white-space: nowrap;
`;

const CheckboxLabel = styled.span`
	font-size: 18px;
	color: black;
	font-family: Inter, sans-serif;
	font-weight: 500;
	cursor: pointer;
`;


const SigninButton = styled.button`
    color: white;
    font-weight: bold;
    font-size: 18px;
    background-color: rgb(252, 129, 158);
    border-radius: 5px;
    border: 3px solid;
    margin-top: 10px;
	margin-bottom: 300px;
    width: 100%;
	height: 50px;
    max-width: 100%; 
	display: flex;
	justify-content: center;
	align-items: center;


    &:hover {
        background-color: white;
        border: 3px solid rgb(252, 129, 158);
        color: rgb(252, 129, 158);
        box-shadow: 0px 4px 4px 2px rgba(252, 129, 158, 0.25); 
    }
`;