import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import styled from 'styled-components';
import DiaryDogImg from "../../assets/diaryDogIcon.png"
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { WriteModal } from './Modal/WriteModal';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <HeaderWrapper>
            <HeaderTextwrapper>
                <MonthText>{format(currentMonth, 'M')}월</MonthText>
                <YearText>{format(currentMonth, 'yyyy')}</YearText>
            </HeaderTextwrapper>
            <IconWrapper>
                <NavigationIcon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <NavigationIcon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </IconWrapper>
        </HeaderWrapper>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'wed', 'Thurs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <DayColumn key={i}>
                {date[i]}
            </DayColumn>,
        );
    }

    return (
        <DaysRow>{days}</DaysRow>
    );
};

// 아이콘 추가를 위한 목데이터
const diaryEntries = {
    '2024-06-02': 2,
    '2024-06-08': 1,
};


const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            const formattedCloneDay = format(cloneDay, 'yyyy-MM-dd');
            const entryCount = diaryEntries[formattedCloneDay] || 0;
            
            days.push(
                <Cell
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(format(cloneDay, 'yyyy-MM-dd'), entryCount)}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : 'text valid'
                        }
                    >
                        {formattedDate}
                    </span>
                    <IconContainer>
                        {entryCount > 0 && (
                            <>
                                <DiaryDogIconImg src={DiaryDogImg} alt="Diary Dog" />
                                {entryCount > 1 && (
                                    <PlusIcon />
                                )}
                            </>
                        )}
                    </IconContainer>
                </Cell>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <Row key={day}>
                {days}
            </Row>
        );
        days = [];
    }
    return (
        <div className="body">{rows}</div>
    );
};

export const DiaryPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (day) => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day, entryCount) => {
        setSelectedDate(day);
        if (entryCount === 0) {  // 글이 없는 경우에만 모달 표시
            openModal(day);
        }
    };

    return(
        <PageWrapper>
            <CalendarWrapper>
                <RenderHeader 
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays />
                <RenderCells 
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />
            </CalendarWrapper>
            {selectedDate && (
                <WriteModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            )}
        </PageWrapper>
        
    )
}

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    min-height: 100vh;
    z-index: 1;
`;

const CalendarWrapper = styled.div`
    width: 70%;
`;


// Header Style
const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;

`;

const HeaderTextwrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    width: 100%;
    margin-bottom: 23px;
    margin-left: 10px;
`;

const MonthText = styled.span`
    font-size: 35px;
    font-weight: 600;
    margin-right: 10px;
`;

const YearText = styled.span`
    font-size: 18px;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    width: 100%;
`;

const NavigationIcon = styled(Icon)`
    font-size: 23px;
    width: 8%;
    color: ${({ theme }) => theme.darkGrayColor};
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.15);
        color: ${({ theme }) => theme.darkGrayColor};
    }
`;


// Days Style
const DaysRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.darkGrayColor};
`;

const DayColumn = styled.div`
    width: 13.5%;
    height: 23px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.stepColor};
    border-radius: 10px;
`;


// Cells Style
const Row = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

const Cell = styled.div`
    width: 12.5%;
    height: 110px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    border: 0.4px solid ${({ theme }) => theme.grayColor};
    border-radius: 3px;
    font-size: 20px;
    padding: 8px;
    margin-right: 4px;

    &.valid:hover {
        cursor: pointer;
        transform: scale(1.01);
        box-shadow: 1.5px 1.5px 0px 0px ${({ theme }) => theme.darkGrayColor}0.1;
        border: none;
        background: ${({ theme }) => theme.grayColor}5;
    }

    &.selected {
        box-shadow: 1.5px 1.5px 0px 0px ${({ theme }) => theme.mainColor}0.1;
        transform: scale(1.02);
        border: none;
        background: ${({ theme }) => theme.subColor};
        color: ${({ theme }) => theme.mainColor};
        font-weight: 600;
    }

    .text.not-valid {
        color: ${({ theme }) => theme.grayColor};
    }

    .text.valid {
        color: black;
    }
`;

const IconContainer = styled.div`
    position: relative;
    display: inline-flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
`;

const DiaryDogIconImg = styled.img`
	width: 93px;
    margin: auto;
    margin-top: 8px;
    align-self: center;
`

const PlusIcon = styled(FaCirclePlus)`
    font-size: 20px;
    color: #FC819E; 
    margin-bottom: 10px;
    margin-right: 10px;
`;