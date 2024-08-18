import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Home.module.css';
import Modal from "./Modal";
import mainLogo from '../../assets/Home_log.png';
import nameLogo from '../../assets/homeImg1.png';
import decodeLogo from '../../assets/homeImg2.png';
import diaryLogo from '../../assets/homeImg3.png';
import listLogo from '../../assets/homeImg4.png';

export default function Home() {
    const [modalVisible, setModalVisible] = useState(true);

    const closeModal = (e) => {
        setModalVisible(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={s.home}>
            {modalVisible && (
                <Modal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal} />
            )}
            <div className={s.main}>
                <img className={s.mainLogo} alt="mainLogo" src={mainLogo} />
                <p>유기견 입양 성공률을 높이기 위한 유기견 행동 분석 서비스</p>
            </div>
            <div className={s.page}>
                <div className={s.name}>
                    <img className={s.nameLogo} alt="buleumbuleung" src={nameLogo} />
                    <div className={s.content}>
                        <h1>이름 찾기</h1>
                        <p>음성합성 기술을 활용하여 유기견의 이전 주인의 목소리와 과거 이름을 추적하여, 유기견의 과거 정보를 확인해 새로운 주인과의 성공적인 만남을 주도합니다.</p>
                        <Link className={s.pageButton} to={"./speechSynthesis"}>이름 찾으로 가기</Link>
                    </div>
                </div>
                <div className={s.decode}>
                    <div className={s.content}>
                        <h1>감정 해독</h1>
                        <p>반려견의 감정을 해독하므로써 성격이나 선호 사항 등 심리를 더 잘 이해하게 되어 깊은 유대감을 쌓을 수 있습니다.</p>
                        <Link className={s.pageButton} to={"./emotionAnalysis"}>감정 해독하러 가기</Link>
                    </div>
                    <img className={s.decodeLogo} alt="buleumbuleung" src={decodeLogo} />
                </div>
                <div className={s.diary}>
                    <img className={s.diaryLogo} alt="buleumbuleung" src={diaryLogo} />
                    <div className={s.content}>
                        <h1>다이어리</h1>
                        <p>반려견의 감정 분석 결과와 함께 기록한 일기를 통해 반려견을 더 잘 이해하고 케어할 수 있습니다.</p>
                        <Link className={s.pageButton} to={"./diary"}>다이어리 작성하러 가기</Link>
                    </div>
                </div>
                <div className={s.list}>
                    <div className={s.content}>
                        <h1>입양글</h1>
                        <p>이름찾기 결과가 포함된 임시보호 입양 공고를 통해 입양자는 더욱 자세한 정보를 받을 수 있으며, 입양 과정에서부터 유대감을 쌓을 수 있습니다.</p>
                        <Link className={s.pageButton} to={"./list?type=adopt"}>입양글 보러 가기</Link>
                    </div>
                    <img className={s.listLogo} alt="buleumbuleung" src={listLogo} />
                </div>
            </div>
        </div>
    );
}
