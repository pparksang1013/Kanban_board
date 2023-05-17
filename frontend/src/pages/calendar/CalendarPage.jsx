import styled from "styled-components";
import moment from "moment";
import { useState, useEffect } from "react";

// 컴포넌트
import icons from "../../style/icons/icons";
import Calendar from "react-calendar";
import { CALENDAR_GET_DATA } from "../../api/getAxios";

function CalendarPage() {
    const [dotArr, SetDotArr] = useState([]);
    useEffect(() => {
        CALENDAR_GET_DATA(
            "https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/calendar/5"
        ).then((res) => {
            res.data.map((item) => {
                SetDotArr([...item.cal_date]);
            });
        });
    }, []);
    let marks = ["2023 04 01", "2023 04 10"];

    const calendarDayClick = (value, event) => {};

    return (
        <>
            <CalendarBox
                calendarType="US"
                className="big_calendar"
                nextLabel={icons.rightArrow}
                prevLabel={icons.leftArrow}
                minDetail="month"
                maxDetail="month"
                tileContent={({ date }) => {
                    let HTML = [];
                    marks.find((ele, index) => {
                        if (ele === moment(date).format("YYYY MM DD")) {
                            HTML.push(<Dot key={index} />);
                        }
                    });

                    return <>{HTML}</>;
                }}
                navigationLabel={({ date }) => `${moment(date).format("M월")}`}
                formatDay={(locale, date) => moment(date).format("DD")}
                selectRange={false}
                onClickDay={calendarDayClick}
            />
        </>
    );
}

export default CalendarPage;

const Dot = styled.div`
    height: 10px;
    width: 10px;
    background-color: ${({ theme }) => theme.color.main};
    border-radius: 50%;
    position: absolute;
    top: 82%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const CalendarBox = styled(Calendar)`
    width: 38rem;
    height: 68vh;
    border: none;
    padding: 0 2rem;

    button {
        font-size: ${({ theme }) => theme.buttonTheme.lgButton.font};
        height: ${({ theme }) => theme.buttonTheme.lgButton.height};
        color: ${({ theme }) => theme.color.black};
    }

    /* 달력 헤더*/
    .react-calendar__navigation {
        position: relative;
        align-items: center;

        /* 달력 헤더 텍스트 */
        .react-calendar__navigation__label__labelText {
            font-size: 2.6rem;
            font-weight: 900;
            color: ${({ theme }) => theme.color.main};
            font-family: "Pretendard";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            -webkit-text-stroke: 0.01em ${({ theme }) => theme.color.main};
        }

        button:disabled {
            background-color: transparent;
        }

        .react-calendar__navigation__prev-button {
            position: absolute;
            left: 20%;
            top: 20%;

            font-size: 2.4em;
            color: ${({ theme }) => theme.color.grey};
            background-color: transparent;

            &:hover {
                color: ${({ theme }) => theme.color.darkerMain};
                background-color: transparent;
            }

            &:focus {
                background-color: transparent;
            }
        }

        .react-calendar__navigation__prev2-button {
            display: none;
        }

        .react-calendar__navigation__next-button {
            position: absolute;
            left: 32%;
            top: 20%;
            color: ${({ theme }) => theme.color.grey};
            background-color: transparent;
            font-size: 2.4em;

            &:hover {
                color: ${({ theme }) => theme.color.darkerMain};
                background-color: transparent;
            }

            &:focus {
                background-color: transparent;
            }
        }

        .react-calendar__navigation__next2-button {
            display: none;
        }
    }

    /* 달력 body */
    .react-calendar__viewContainer {
        margin-top: 2rem;
        /* Week days */
        .react-calendar__month-view__weekdays {
            font-size: 1.42rem;
            font-weight: 400;
            color: ${({ theme }) => theme.color.darkerGrey};
            text-align: center;

            abbr[title] {
                text-decoration: none;
            }
        }

        .react-calendar__tile {
            position: relative;
            min-height: 3.8em;
            font-weight: 300;

            &:hover {
                color: ${({ theme }) => theme.color.main};
                background-color: transparent;
            }
        }

        /* 지난 달, 다음 달 일 가리기 */
        .react-calendar__month-view__days__day--neighboringMonth {
            visibility: hidden;
        }
        /* 날짜 클릭시 파란 배경이 뜬다. */
        .react-calendar__tile--active {
            background-color: transparent;
        }

        .react-calendar__tile--now {
            color: ${({ theme }) => theme.color.main};
            font-weight: 800;
            background-color: transparent;
        }
    }
`;
