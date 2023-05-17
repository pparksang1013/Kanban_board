import { useState } from "react";
import styled from "styled-components";

// API
import { CARD_DEL } from "../../api/deleteAxios";

// STYLE
import icons from "../../style/icons/icons";

function CardDropdownComponent({ cardID, cards, setCards }) {
    const [dropDownState, setDropdownState] = useState(false);

    const handleDropdownClick = (e) => {
        setDropdownState(true);
    };

    const handleDropdownMouseLeave = () => {
        setDropdownState(false);
    };

    const handleDropdownDelete = (e) => {
        CARD_DEL(
            `https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/card/${cardID}`
        ).then(setCards(cards.filter((item) => item.c_id !== cardID)));
    };

    return (
        <>
            <DropdownMenuIcon onClick={handleDropdownClick}>
                {icons.menuKebabIcon}
            </DropdownMenuIcon>

            {dropDownState && (
                <DropdownUl onMouseLeave={handleDropdownMouseLeave}>
                    <DropdownLi onClick={handleDropdownDelete}>
                        <span>card삭제</span>
                    </DropdownLi>
                </DropdownUl>
            )}
        </>
    );
}

export default CardDropdownComponent;

const DropdownMenuIcon = styled.span`
    font-size: 20px;
    color: ${({ theme }) => theme.color.grey};
    position: absolute;
    right: 3px;
    top: 3.5px;
    padding: 6px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: ${({ theme }) => theme.color.main};
    }
`;

const DropdownUl = styled.ul`
    position: absolute;
    top: 30px;
    right: 0;
    padding: 8px;
    background-color: #fff;
    border: 1px solid #9696964d;
    border-radius: ${({ theme }) => theme.borderRadius.basic};
    font-size: 14px;
`;

const DropdownLi = styled.li`
    background-color: #fff;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: 12px 16px;
    margin-bottom: 4px;

    &:hover {
        background-color: #c9c9c92f;
    }

    &:last-child {
        margin-bottom: 0;
    }

    span {
        display: flex;
        align-items: center;

        svg {
            font-size: 16px;
            margin-right: 8px;
        }
    }
`;
