import Calendar from "react-calendar";
import styled from "styled-components";

const CalendarWrapper = styled.section`
    font-family: "Poppins", "Pretendard";
    padding: 2.2rem 5rem;

    abbr[title] {
        text-decoration: none;
    }

    .react-calendar {
        width: 76vw;
        height: 100vh;

        button {
            background-color: transparent;
            border: none;
        }

        .react-calendar__month-view__weekNumbers .react-calendar__tile {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75em;
            font-weight: bold;
        }

        .react-calendar__month-view__days__day--weekend {
            color: #d10000;
        }

        .react-calendar__tile {
            width: 100px;
            height: 100px;
        }

        .react-calendar__tile--now {
            background: #ffff76;
        }

        .highlight {
            background: #f3a95f;
        }
    }
`;

function CalendarRouter() {
    const marks = [
        "15-01-2023",
        "03-01-2023",
        "07-01-2023",
        "12-01-2023",
        "13-01-2023",
        "15-01-2024",
    ];

    return (
        <CalendarWrapper>
            <Calendar />
        </CalendarWrapper>
    );
}

export default CalendarRouter;
