import './Nav.css'
import {Link} from "react-router-dom"
import hadogIog from '../assets/HADOG.png'
import defaultImage from '../assets/defaultImage.png'
import { useState } from 'react';

function Nav() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="navbar">
            <div className="logo">
                <Link to={"./"}>
                    <img className="logo" alt="hadog_logo" src={hadogIog} />
                </Link>
            </div>
            <div className='pageLink'>
                <div>
                    <Link>
                        <strong>이름찾기</strong>
                    </Link>
                </div>
                <div className='dropmenu'>
                        <strong>입양하기</strong>
                        <div className='dropContent'>
                            <Link><h4>보호소 입양 공고</h4></Link>
                            <Link><h4>임시 보호 입양 공고</h4></Link>
                            <Link><h4>입양 후기</h4></Link>
                        </div>
                </div>
                <div>
                    <Link>
                        <strong>해독하기</strong>
                    </Link>
                </div>
                <div>
                    <Link>
                        <strong>다이어리</strong>
                    </Link>
                </div>
            </div>
            
            <div className='login'>
                {isLogin ? (
                    <div className='dropmenu'>
                        <Link>
                            <strong>유저이름</strong>
                            <div className='dropContent'>
                                <Link><h4>마이페이지</h4></Link>
                                <Link><h4>로그아웃</h4></Link>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <Link>
                        <strong>로그인</strong>
                    </Link>
                )}
                <Link>
                    <img className='profileImg' alt='profileImg' src={defaultImage}/>
                </Link>
            </div>
        </div>
    );
}

export default Nav;