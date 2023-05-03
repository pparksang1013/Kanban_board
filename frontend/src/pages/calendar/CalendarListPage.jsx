// 캘린더 일정 리스트 컴포넌트

import styled from "styled-components";

const CalendarList = styled.section``;

const CalendarListHeader = styled.div`
    display: flex;
    align-items: center;

    span {
        font-size: 1.8rem;
        font-weight: 900;
    }
`;

function CalendarListPage() {
    return (
        <CalendarList>
            <CalendarListHeader>
                <span>일정</span>
            </CalendarListHeader>
        </CalendarList>
    );
}

export default CalendarListPage;
