import './Footer.css'
import {Link} from "react-router-dom"
import logImage from '../assets/dogLogo.png';

function Footer() {
    return (
        <div className="footer">
            <img className="logo" alt="buleumbuleung" src={logImage} />
            <hr />
            <div className='pageLink'>
                <div>
                    <Link>
                        <h5>이름찾기</h5>
                    </Link>
                </div>
                <div>
                    <Link>
                        <h5>입양공고</h5>
                    </Link>
                </div>
                <div>
                    <Link>
                        <h5>해독하기</h5>
                    </Link>
                </div>
                <div>
                    <Link>
                        <h5>다이어리</h5>
                    </Link>
                </div>
            </div>
            <div className="copyright">
                <h6>Copyright © HADOG</h6>
            </div>
        </div>
    );
}

export default Footer;