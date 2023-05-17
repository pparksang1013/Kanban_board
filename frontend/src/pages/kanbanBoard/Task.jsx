import { useState } from "react";

// COMPONENT
import TaskDropdownComponent from "../../components/taskComponent/TaskDropdownComponent";
import AddTaskComponent from "../../components/taskComponent/AddTaskComponent";
import Card from "./Card";

// STYLE
import styled from "styled-components";

function Task({ boardData, taskData, setBoardData }) {
    const [drag, setDrag] = useState(null);
    const [_list, setLists] = useState({ ...taskData.tasks });

    const colorArr = [
        "#3cb371",
        "#FBAD54",
        "#FB7754",
        "#3a7e9f",
        "#3cb371",
        "#FBAD54",
        "#FB7754",
        "#3a7e9f",
    ];

    return (
        <TaskWrapper>
            {boardData.tasks.map((task, index) => {
                return (
                    <>
                        <TaskContents key={index} data-taskid={index}>
                            <TaskTitle index={index} colorArr={colorArr}>
                                {task.t_name}
                                <TaskDropdownComponent
                                    taskID={task.t_id}
                                    taskData={taskData}
                                    boardData={boardData}
                                    setBoardData={setBoardData}
                                />
                            </TaskTitle>
                            <Card taskData={taskData[index]} />
                        </TaskContents>
                    </>
                );
            })}
            <AddTaskComponent
                taskData={taskData}
                setBoardData={setBoardData}
                boardData={boardData}
            />
        </TaskWrapper>
    );
}

export default Task;

const TaskWrapper = styled.section`
    display: flex;
    width: 100%;
`;

const TaskContents = styled.div`
    margin-right: 34px;
    position: relative;
`;

const TaskTitle = styled.h1`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 18vw;
    min-width: 300px;
    max-width: 300px;
    height: 60px;
    font-size: 1.9rem;
    text-transform: uppercase;
    letter-spacing: -1px;
    word-spacing: 4px;
    color: #fff;
    padding: 8px 20px;
    border-radius: ${({ theme }) => theme.borderRadius.basic};
    background-color: ${({ index, colorArr }) => colorArr[index]};
    -webkit-text-stroke: 0.5px ${({ index, colorArr }) => colorArr[index]};
`;
