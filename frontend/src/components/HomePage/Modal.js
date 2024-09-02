import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HModalComponent from './HModalComponent';

function Modal({ className, onClose, maskClosable, closable, visible }) {
    const onMaskClick = (e) => {
        if (maskClosable && e.target === e.currentTarget) {
            onClose(e);
        }
    };

    // 이전 방문 날짜
    const VISITED_BEFORE_DATE = localStorage.getItem('VisitCookie');
    // 현재 날짜 (YYYY-MM-DD 형식)
    const VISITED_NOW_DATE = new Date().toISOString().split('T')[0];

    useEffect(() => {
        // 팝업 오늘 하루 닫기 체크
        if (VISITED_BEFORE_DATE !== null) {
            // 날짜가 같을 경우 비노출
            if (VISITED_BEFORE_DATE === VISITED_NOW_DATE) {
                onClose(false);
            }
        }
    }, [VISITED_BEFORE_DATE, VISITED_NOW_DATE, onClose]);

    // 하루 동안 팝업 닫기
    const Dayclose = (e) => {
        if (onClose) {
            onClose(false);
            // 로컬 스토리지에 오늘 날짜 저장
            localStorage.setItem('VisitCookie', VISITED_NOW_DATE);
        }
    };

    const close = (e) => {
        if (onClose) {
            onClose(false);
        }
    };

    return (
        <>
            <ModalOverlay visible={visible} onClick={onMaskClick} />
            <ModalWrapper className={className} tabIndex="-1" visible={visible}>
                <ModalInner tabIndex="0" className="modal-inner">
                    <ModalInner2>
                        <HModalComponent />
                        {closable && (
                            <CloseStyle>
                                <Close className="modal-close" onClick={Dayclose}>
                                    오늘 하루 닫기
                                </Close>
                                <Close className="modal-close" onClick={close}>
                                    닫기
                                </Close>
                            </CloseStyle>
                        )}
                    </ModalInner2>
                </ModalInner>
            </ModalWrapper>
        </>
    );
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    maskClosable: PropTypes.bool,
    closable: PropTypes.bool,
    className: PropTypes.string,
};

const ModalInner2 = styled.div`
    display: flex;
    flex-direction: column;
`;

const CloseStyle = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.3);
    width: 570px;
    padding: 10px;
    border-radius: 0 0 5px 5px;
    color: #ffffff;
`;

const Close = styled.span`
    cursor: pointer;
`;

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
`;

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 5px; 
    width: 590px;
    top: 53%;
    transform: translateY(-50%);
    margin: 0 auto;
`;

export default React.memo(Modal);
