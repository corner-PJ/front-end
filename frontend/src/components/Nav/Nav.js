import s from'./Nav.module.css'
import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import hadogIog from '../../assets/HADOG.png'
import logout from "../../assets/logout.png"
import axios from 'axios';

function Nav() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    
    // // localStorage에서 토큰 가져오기
    const ACCESS_TOKEN = localStorage.getItem('authToken');
    
    useEffect(() => {
        console.log('토큰 확인: ', ACCESS_TOKEN);

        if (ACCESS_TOKEN) {
            // 토큰이 있으면 로그인 상태로 설정
            setIsLogin(true);
        }
    }, [ACCESS_TOKEN]);

    const handleLogoutButtonClick = () => {
        if (isLogin) {
            // 로그아웃 시 토큰과 유저 정보 삭제
            localStorage.removeItem('authToken');
            setIsLogin(false);
            alert("로그아웃 되었습니다.")
            navigate(`/`);
        } else {
            navigate(`/login`);
        }
    };

        // 유저 정보 저장
        const [userInfo, setUserInfo] = useState({
            name: "",
            id: "",
            nickname: "",
            password: "",
            email: "",
        });
    
        // 유저 정보 서버로부터 가져옴
        useEffect(() => {
            const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("authToken");
                // console.log("토큰:", token);
    
                const response = await axios.get("/mypage/userinfo", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                // console.log("서버 응답 데이터:", response.data);
    
                setUserInfo(response.data.data);
            } catch (error) {
                console.error("사용자 정보를 불러오는 중 오류 발생:", error);
            }
            };
    
            fetchUserInfo();
        }, []);
    

    return (
        <div className={s.navbar}>
            <div className={s.logo}>
                <Link to={"./"}>
                    <img className={s.logo}alt="hadog_logo" src={hadogIog} />
                </Link>
            </div>
            <div className={s.pageLink}>
                <div>
                    <Link to={"./speechSynthesis"}>
                        <strong>이름찾기</strong>
                    </Link>
                </div>
                <div className={s.dropmenu}>
                        <strong>입양하기</strong>
                        <div className={s.dropContent}>
                            <Link to={"./list?type=shelter"}><h4>보호소 입양 공고</h4></Link>
                            <hr />
                            <Link to={"./list?type=adopt"}><h4>임시 보호 입양 공고</h4></Link>
                            <hr />
                            <Link to={"./review"}><h4>입양 후기</h4></Link>
                        </div>
                </div>
                <div>
                    <Link to={"./emotionAnalysis"}>
                        <strong>해독하기</strong>
                    </Link>
                </div>
                <div>
                    <Link to={"./diary"}>
                        <strong>다이어리</strong>
                    </Link>
                </div>
            </div>
            
            <div className={s.login}>
                {isLogin ? (
                    <>
                    <div className={s.dropmenu}>
                        {/* 아직 이름 불러오는 부분 구현 x */}
                        <Link to={"./mypage"}><strong>{userInfo.name}</strong></Link>
                    </div>
                    <img onClick={handleLogoutButtonClick} className={s.logoutImg} alt='logoutImg' src={logout}/>
                    </>
                ) : (
                    <>
                    <strong onClick={handleLogoutButtonClick}>로그인/회원가입</strong>
                    </>
                    
                )}
            </div>
        </div>
    );
}

export default Nav;