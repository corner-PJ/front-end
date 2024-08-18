import React, { useState, useEffect } from "react";
import * as S from './SigninStyle';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function SigninPage() {
	// 로그인 formData 상태변수 
	const [formData, setFormData] = useState({
        name: "",
        id: "",
        email: "",
        nickname: "",
        password: "",
        passwordConfirm: ""
    });

	const navigate = useNavigate();

	// 유효성 검사 
	const [idError, setIdError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");

	// 체크박스 상태 변수
	const [all, setAll] = useState(false);
	const [age, setAge] = useState(false);
	const [service, setService] = useState(false);
	const [privacy, setPrivacy] = useState(false);

	// 폼에서 변경이벤트 처리
	const handleChange = (e) => {
        setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
    };

	// 중복 확인
	const checkIdAvailability = async (id) => {
        try {
            const response = await axios.get(`/user/id`, { params: { id } });
            return response.data.data;
        } catch (error) {
            console.error("아이디 중복 확인 중 오류 발생:", error);
        }
    };

    const checkNicknameAvailability = async (nickname) => {
        try {
            const response = await axios.get(`/user/nickName`, { params: { nickName: nickname } });
            return response.data.data;
        } catch (error) {
            console.error("닉네임 중복 확인 중 오류 발생:", error);
        }
    };

    const checkEmailAvailability = async (email) => {
        try {
            const response = await axios.get(`/user/email`, { params: { email } });
            return response.data.data;
        } catch (error) {
            console.error("이메일 중복 확인 중 오류 발생:", error);
        }
    };

	const checkPasswordAvailability = (password) => {
        const passwordRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (!passwordRegex.test(password)) {
            return "비밀번호는 8~16자 이내로 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.";
        }
        return "";
    };

	// 유효성 검사 함수 
	const validateForm = async () => {
        let isValid = true;

        // 아이디 중복 검사
        const isIdAvailable = await checkIdAvailability(formData.id);
        if (isIdAvailable) {
            setIdError("이미 사용중인 아이디입니다.");
            isValid = false;
        } else {
            setIdError("");
        }

        // 닉네임 중복 검사
        const isNicknameAvailable = await checkNicknameAvailability(formData.nickname);
        if (isNicknameAvailable) {
            setNicknameError("이미 사용중인 닉네임입니다.");
            isValid = false;
        } else {
            setNicknameError("");
        }

        // 이메일 중복 검사
        const isEmailAvailable = await checkEmailAvailability(formData.email);
        if (isEmailAvailable) {
            setEmailError("이미 사용중인 이메일입니다.");
            isValid = false;
        } else {
            setEmailError("");
        }

		// 비밀번호 유효성 검사
        const ispasswordError = checkPasswordAvailability(formData.password);
        if (ispasswordError) {
            setPasswordError(ispasswordError);
            isValid = false;
        } else {
            setPasswordError("");
        }

        // 비밀번호 확인
        if (formData.password !== formData.passwordConfirm) {
            setConfirmError("비밀번호가 일치하지 않습니다.");
            isValid = false;
        } else {
            setConfirmError("");
        }

        return isValid;
    };

	// 전송 버튼 클릭 시 회원가입 진행
	const handleSubmit = async (e) => {
		e.preventDefault();

		// 유효성 검사
        const isValid = await validateForm();
        if (!isValid) return;
	
		try {
			const response = await axios.post(
				"/user",
				formData
			);
			// 페이지 이동 
			navigate("/login");
			console.log(response.data); 

		} catch (error) {
			console.error("데이터 전송 중 오류 발생:", error);
		}
	};

	// 체크박스 상태 동기화 (개별 체크 - 전체 체크)
	useEffect(() => {
		if (age && service && privacy) {
			setAll(true);
		} else {
			setAll(false);
		}
	}, [age, service, privacy]);
	
	// 전체 동의 체크박스 변경 핸들러 
	const handleAllChange = (e) => {
		const isChecked = e.target.checked;
		setAll(isChecked);
		setAge(isChecked);
		setService(isChecked);
		setPrivacy(isChecked);
	};
	
	// 개별 체크박스 변경 핸들러
	const handleCheckboxChange = (setState) => (e) => {
		setState(e.target.checked);
	}

	// 회원가입 버튼 활성화
	const isButtonActive = formData.name && formData.id && formData.email && formData.nickname && formData.password && formData.passwordConfirm &&
	!idError && !nicknameError && !emailError && !passwordError && !confirmError &&
	age && service && privacy;

    return (
        <S.SigninRootWrapper>
			<S.HeaderText> 회원가입 </S.HeaderText>

			<S.ContentContainer>
				<S.BoxContainer>
					<S.Text> 이름 </S.Text>
					<S.NameInputBox
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</S.BoxContainer>
				
				<S.BoxContainer>
					<S.Text> 아이디 </S.Text>
					<S.IdInputBox
						type="text"
						name="id"
						value={formData.id}
						onChange={handleChange}
					/>
					{idError && <S.InfoText>{idError}</S.InfoText>}
				</S.BoxContainer>
				
				<S.BoxContainer>
					<S.Text> 닉네임 </S.Text>
					<S.NicknameInputBox
						type="text"
						name="nickname"
						value={formData.nickname}
						onChange={handleChange}
					/>
					{nicknameError && <S.InfoText>{nicknameError}</S.InfoText>}
				</S.BoxContainer>
				
				<S.BoxContainer>
					<S.Text> 이메일 </S.Text>
					<S.EmailInputBox
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
					{emailError && <S.InfoText>{emailError}</S.InfoText>}
				</S.BoxContainer>
				
				<S.BoxContainer>
					<S.Text> 비밀번호 </S.Text>
					<S.PasswordInputBox
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
					{passwordError && <S.InfoText>{passwordError}</S.InfoText>}
				</S.BoxContainer>		

				<S.BoxContainer>
					<S.Text> 비밀번호 확인 </S.Text>
					<S.PasswordConfirmInputBox
						type="password"
						name="passwordConfirm"
						value={formData.passwordConfirm}
						onChange={handleChange}
					/>
					{confirmError && <S.InfoText>{confirmError}</S.InfoText>}
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
					type="submit"
					onClick={handleSubmit}
					$disabled={!isButtonActive}
				>
					회원가입
				</S.SigninButton>
			</S.ContentContainer>
        </S.SigninRootWrapper>
    )
}




