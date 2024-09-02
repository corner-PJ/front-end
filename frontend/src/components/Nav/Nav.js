import s from'./Nav.module.css'
import { useEffect, useState, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom"
import hadogIog from '../../assets/HADOG.png'
import logout from "../../assets/logout.png"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Nav() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    
    // localStorage에서 토큰 및 만료 시간 가져오기
    const ACCESS_TOKEN = localStorage.getItem('authToken');
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');

    const handleLogout = useCallback(() => {
        // 로그아웃 시 토큰과 유저 정보 삭제
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpirationTime');

        setIsLogin(false);
        toast.success('로그아웃 되었습니다.', {
            autoClose: 3000,
            position: "top-center",
        });
        navigate(`/`);
    }, [navigate, ACCESS_TOKEN]);

    const handleLogoutButtonClick = () => {
        if (isLogin) {
            handleLogout();
        } else {
            navigate(`/login`);
        }
    };

    // 토큰 만료 확인 및 자동 로그아웃
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            if (tokenExpirationTime && currentTime > tokenExpirationTime) {
                handleLogout();
            }
        }, 3600000); // 1시간 마다 확인

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
    }, [handleLogout, tokenExpirationTime]);

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
            if (token) {
                const response = await axios.get("/mypage/userinfo", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserInfo(response.data.data);
                setIsLogin(true);
            }
        } catch (error) {
            console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        }
        };

        fetchUserInfo();
    }, [ACCESS_TOKEN]);

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
                        <Link to={"./mypage"}><strong>{userInfo.name}님</strong></Link>
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