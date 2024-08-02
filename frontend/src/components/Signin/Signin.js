import React, { useState, useEffect } from "react";
import * as S from './SigninStyle';
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

	// const [isIdCheck, setIsIdCheck] = useState(false); // 중복 검사
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
        <S.SigninRootWrapper>
			<S.HeaderText> 회원가입 </S.HeaderText>

			<S.ContentContainer>
				<S.BoxContainer>
					<S.Text> 이름 </S.Text>
					<S.NameInputBox
						type="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</S.BoxContainer>
				
				<S.BoxContainer>
					<S.Text> 아이디 </S.Text>
					<S.IdInputBox
						type="id"
						value={id}
						onChange={onChangeIdHandler}
					/>
					{idError && <small className={isIdAvailable ? 'idAvailable' : ''}>{idError}</small>}
				</S.BoxContainer>
				
				<S.BoxContainer>
					<S.Text> 닉네임 </S.Text>
					<S.NicknameInputBox
						type="nickname"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>
				</S.BoxContainer>
				
				<S.BoxContainer>
					<S.Text> 이메일 </S.Text>
					<S.EmailInputBox
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</S.BoxContainer>
				
				<S.BoxContainer>
					<S.Text> 비밀번호 </S.Text>
					<S.PasswordInputBox
						type="password"
						value={password}
						onChange={onChangePasswordHandler}
					/>
					{passwordError && <small>{passwordError}</small>}
				</S.BoxContainer>		

				<S.BoxContainer>
					<S.Text> 비밀번호 확인 </S.Text>
					<S.PasswordConfirmInputBox
						type="passwordConfirm"
						value={passwordConfirm}
						onChange={onChangePasswordHandler}
					/>
					{confirmError && <small>{confirmError}</small>}
				</S.BoxContainer>

				<S.PolicyContent>
					<S.PolicyText>서비스 정책</S.PolicyText>
					<S.CheckboxRectangle>
						<S.CheckboxWrapper>
							<S.CheckboxInputAll type="checkbox" checked={all} onChange={handleAllChange} />
							<S.CheckboxLabelAll>전체 동의</S.CheckboxLabelAll>
						</S.CheckboxWrapper>
						<S.Line />

						<S.CheckboxWrapper>
							<S.CheckboxInput type="checkbox" checked={age} onChange={handleCheckboxChange(setAge)} />
							<S.CheckboxLabel>만 14세 이상입니다. (필수)</S.CheckboxLabel>
						</S.CheckboxWrapper>
						
						<S.CheckboxWrapper>
							<S.CheckboxInput type="checkbox" checked={service} onChange={handleCheckboxChange(setService)} />
								<S.CheckboxLabel>서비스 이용약관 동의 (필수)</S.CheckboxLabel>
						</S.CheckboxWrapper>
						
						<S.CheckboxWrapper>
							<S.CheckboxInput type="checkbox" checked={privacy} onChange={handleCheckboxChange(setPrivacy)} />
							<S.CheckboxLabel>개인정보 수집 및 이용 동의 (필수)</S.CheckboxLabel>
						</S.CheckboxWrapper>
					</S.CheckboxRectangle>	
				</S.PolicyContent>

				<S.SigninButton
					//onClick={handleLogin}
					// disabled={!id || !password || password !== passwordConfirm}
					as={Link} to="/login"
					disabled={!isButtonActive}
				>
					회원가입
				</S.SigninButton>

			</S.ContentContainer>
			{/*<InfoText> 이미 사용중인 아이디입니다.</InfoText>*/}
        </S.SigninRootWrapper>
    )
}




