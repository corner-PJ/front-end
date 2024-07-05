import s from './Footer.module.css'
import {Link} from "react-router-dom"
import logImage from '../../assets/dogLogo.png';

function Footer() {
    return (
        <div className={s.footer}>
            <img className={s.logo} alt="buleumbuleung" src={logImage} />
            <hr />
            <div className={s.pageLink}>
                <div>
                    <Link to={"./speechSynthesis"}>
                        <h5>이름찾기</h5>
                    </Link>
                </div>
                <div>
                    <Link to={"./list"}>
                        <h5>입양공고</h5>
                    </Link>
                </div>
                <div>
                    <Link to={"./emotionAnalysis"}>
                        <h5>해독하기</h5>
                    </Link>
                </div>
                <div>
                    <Link to={"./diary"}>
                        <h5>다이어리</h5>
                    </Link>
                </div>
            </div>
            <div className={s.copyright}>
                <h6>Copyright © HADOG</h6>
            </div>
        </div>
    );
}

export default Footer;