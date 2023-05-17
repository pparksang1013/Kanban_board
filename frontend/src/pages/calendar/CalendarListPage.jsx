import styled from "styled-components";

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

const CalendarList = styled.section``;

const CalendarListHeader = styled.div`
    display: flex;
    align-items: flex-end;
    height: 36px;

    span {
        font-size: 1.8rem;
        font-weight: 700;
    }
`;
