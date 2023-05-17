import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

function ProjectTitle({ boardName, boardDate }) {
    return (
        <KanbanBoardTitleWrapper>
            <KanbanBoardTitleContents>
                <h1>{boardName}</h1>
            </KanbanBoardTitleContents>
            <p>{moment(boardDate).format("M월 DD일")}</p>
        </KanbanBoardTitleWrapper>
    );
}

export default ProjectTitle;

const KanbanBoardTitleWrapper = styled.div`
    margin-bottom: 20px;

    p {
        margin-top: 12px;
        font-size: 14px;
    }
`;

const KanbanBoardTitleContents = styled.div`
    h1 {
        font-size: 3.4rem;
        -webkit-text-stroke: 1.5px ${({ theme }) => theme.color.black};
        letter-spacing: 2px;
        color: ${({ theme }) => theme.color.black};
        position: relative;
        text-transform: capitalize;

        &::after {
            content: ".";
            color: ${({ theme }) => theme.color.main};
            -webkit-text-stroke: 2px ${({ theme }) => theme.color.main};
        }
    }
`;
