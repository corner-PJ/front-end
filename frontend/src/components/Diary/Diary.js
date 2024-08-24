import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parseISO } from 'date-fns';
import styled from 'styled-components';
import DiaryDogImg from "../../assets/diaryDogIcon.png"
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { MoveModal } from './Modal/MoveModal';
import axios from 'axios';


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

const RenderCells = ({ currentMonth, selectedDate, onDateClick, diaryEntries }) => {
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
            const entries = diaryEntries[formattedCloneDay] || [];
            const entryCount = entries.length;

            // console.log(`Date: ${formattedCloneDay}, Entry Count: ${entryCount}`);
            
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
                    onClick={() => {
                        onDateClick(formattedCloneDay, entries);
                    }}
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
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diaryEntries, setDiaryEntries] = useState({});
    const navigate = useNavigate();

    // 일기 조회
    const fetchDiaryEntries = async (year, month) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('/diary/month', {
                params: {
                    year: year,
                    month: month
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log('API Response Data:', response.data);

            if (response.data.success) {
                // 각 날짜에 작성된 일기 개수 계산
                const entries = response.data.data.reduce((acc, entry) => {
                    const date = format(parseISO(entry.diaryDate), 'yyyy-MM-dd');
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(entry); 
                    return acc;
                }, {});

                setDiaryEntries(entries);  // API로부터 받은 데이터를 상태에 저장
            } else {
                console.error('일기 목록을 불러오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('서버 오류:', error);
        }
    };

    useEffect(() => {
        // 현재 월과 년도를 기준으로 다이어리 항목 불러오기
        fetchDiaryEntries(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    }, [currentMonth]);  // currentMonth가 변경될 때마다 호출

    useEffect(() => {
        console.log('Diary Entries:', diaryEntries);
    }, [diaryEntries]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateClick = (day, entries) => {
        setSelectedDate(day);
    
        if (!entries || entries.length === 0) {  // 일기가 없는 경우 모달
            openModal();
        } else if (entries.length === 1) { // 일기 하나인 경우 상세페이지
            navigate(`/diary/${entries[0].id}`);
        } else if (entries.length > 1) { // 일기 2개 이상인 경우 목록
            navigate(`/diary/list/${day}`);
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
                    diaryEntries={diaryEntries}
                />
            </CalendarWrapper>
            {selectedDate && (
                <MoveModal
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