import { useState } from "react";

// STYLE
import styled from "styled-components";
import icons from "../../style/icons/icons";

// API
import { TASK_POST_DATA } from "../../api/postAxios";

function AddTaskComponent({ boardData, setBoardData }) {
    const handleTaskClick = (e) => {
        TASK_POST_DATA(
            "https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/task",
            {
                b_id: 1,
                t_name: "DONE",
                t_type: "",
                t_creator: "",
                t_position:
                    boardData.tasks.length === 0
                        ? 1
                        : boardData.tasks[boardData.tasks.length - 1]
                              .t_position + 1,
            }
        ).then((res) => {
            const copyData = { ...boardData };
            copyData.tasks.push(res.data);
            setBoardData(copyData);
        });
    };

    return (
        <>
            <AddTask onClick={handleTaskClick}>{icons.plusIcon}</AddTask>
        </>
    );
}

export default AddTaskComponent;

const AddTask = styled.div`
    width: 56px;
    min-width: 56px;
    max-height: 56px;
    min-height: 56px;
    border-radius: ${({ theme }) => theme.borderRadius.basic};
    padding: 15px;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1),
        -0.5px -0.5px 1px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.15s all ease-in;

    svg {
        font-size: 2rem;
        fill: ${({ theme }) => theme.color.darkerGrey};
    }

    &:hover {
        background-color: #3cb372ea;
        box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.2);
    }

    &:hover svg {
        fill: #fff;
    }
`;
