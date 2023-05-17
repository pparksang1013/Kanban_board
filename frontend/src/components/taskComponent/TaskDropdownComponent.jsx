import { useState } from "react";

// STYLE
import styled from "styled-components";
import icons from "../../style/icons/icons";

// API
import { TASK_DEL } from "../../api/deleteAxios";

function TaskDropdownComponent({ taskID, taskData, boardData, setBoardData }) {
    const [dropdown, setDropdown] = useState(false);

    const handleTaskDropdownClick = () => {
        setDropdown(true);
    };

    const handleTaskDropdownMouseLeave = () => {
        setDropdown(false);
    };

    const handleTaskDelete = () => {
        TASK_DEL(
            `https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/task/${taskID}`
        ).then(() => {
            const copyData = { ...boardData };
            copyData.tasks = copyData.tasks.filter(
                (item) => item.t_id !== taskID
            );
            setBoardData(copyData);
        });
    };

    return (
        <>
            <TaskDropdownIcon onClick={handleTaskDropdownClick}>
                {icons.menuKebabIcon}
            </TaskDropdownIcon>

            {dropdown && (
                <DropdownUl onMouseLeave={handleTaskDropdownMouseLeave}>
                    <DropdownLi onClick={handleTaskDelete}>task삭제</DropdownLi>
                </DropdownUl>
            )}
        </>
    );
}

export default TaskDropdownComponent;

const TaskDropdownIcon = styled.span`
    position: absolute;
    right: 8.8px;
    padding: 8px 0px;
    cursor: pointer;

    svg {
        font-size: 24px;
    }
`;

const DropdownUl = styled.ul`
    position: absolute;
    top: 40px;
    right: 0px;
    padding: 8px;
    background-color: #ffffff;
    border: 1px solid #9696964d;
    border-radius: ${({ theme }) => theme.borderRadius.basic};
    z-index: 10;
`;

const DropdownLi = styled.li`
    background-color: #fff;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: 12px 16px;
    margin-bottom: 4px;
    font-size: 14px;
    text-transform: lowercase;
    -webkit-text-stroke: 0px;
    color: ${({ theme }) => theme.color.black};
    font-weight: 400;
    display: flex;
    align-items: center;
    letter-spacing: 0px;

    &:hover {
        background-color: #c9c9c92f;
    }

    &:last-child {
        margin-bottom: 0;
    }

    svg {
        font-size: 16px;
        margin-right: 8px;
    }
`;
