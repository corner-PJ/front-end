import s from'./Nav.module.css'
import {Link} from "react-router-dom"
import hadogIog from '../../assets/HADOG.png'
import defaultImage from '../../assets/defaultImage.png'
import { useState } from 'react';

function Nav() {
    const [isLogin, setIsLogin] = useState(true);

    const handleLogoutButtonClick = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className={s.navbar}>
            <div className={s.logo}>
                <Link to={"./"}>
                    <img className={s.logo}alt="hadog_logo" src={hadogIog} />
                </Link>
            </div>
            <div className={s.pageLink}>
                <div>
                    <Link to={"./"}>
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
                    <Link>
                        <strong>다이어리</strong>
                    </Link>
                </div>
            </div>
            
            <div className={s.login}>
                {isLogin ? (
                    <>
                    <div className={s.dropmenu}>
                        <strong>유저이름</strong>
                        <div className={s.dropContent}>
                            <Link><h4>마이페이지</h4></Link>
                            <hr />
                           <h4 onClick={handleLogoutButtonClick}>로그아웃</h4>
                        </div>                
                    </div>
                    <img className={s.profileImg} alt='profileImg' src={defaultImage}/>
                    </>
                    
                ) : (
                    <>
                    <Link>
                        <strong onClick={handleLogoutButtonClick}>로그인</strong>
                    </Link>
                    <img className={s.profileImg} alt='profileImg' src={defaultImage}/>
                    </>
                    
                )}
            </div>
        </div>
    );
}

export default Nav;