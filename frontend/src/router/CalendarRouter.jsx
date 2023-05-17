import React from "react";
import styled from "styled-components";

// 컴포넌트
import CalendarPage from "../pages/calendar/CalendarPage";
import CalendarListPage from "../pages/calendar/CalendarListPage";

const CalendarWrapper = styled.section`
    display: flex;
    padding: 2.2rem 5rem;
`;

function CalendarRouter() {
    return (
        <CalendarWrapper>
            <CalendarPage />
            <CalendarListPage />
        </CalendarWrapper>
    );
}

export default CalendarRouter;
