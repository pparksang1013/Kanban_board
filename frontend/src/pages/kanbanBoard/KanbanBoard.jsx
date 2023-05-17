import { useState, useEffect } from "react";
import styled from "styled-components";

// API
import { BOARD_GET_DATA } from "../../api/getAxios";

// COMPONENT
import ProjectTitle from "./ProjectTitle";
import Task from "./Task";

function KanbanBoard() {
    const [boardData, setBoardData] = useState(null);

    useEffect(() => {
        BOARD_GET_DATA(
            "https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/board/userid1"
        )
            .then((res) => {
                setBoardData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [setBoardData]);

    console.log(boardData);

    return (
        <KanbanBoardWrapper>
            {boardData && (
                <>
                    <ProjectTitle
                        boardName={boardData.b_name}
                        boardDate={boardData.b_create_date}
                    />
                    <Task
                        boardData={boardData}
                        taskData={boardData.tasks}
                        setBoardData={setBoardData}
                    />
                </>
            )}
        </KanbanBoardWrapper>
    );
}

const KanbanBoardWrapper = styled.section`
    padding: 24px 0 12rem 24px;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    background-color: #f9f9f9;
`;

export default KanbanBoard;
