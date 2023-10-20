import { useState, useRef, useEffect } from "react";

// COMPONENT
import CardDetail from "../detail/CardDetail";
import CardDropdownComponent from "../../components/cardComponent/CardDropdownComponent";

// STYLE
import styled from "styled-components";
import icons from "../../style/icons/icons";

// API
import { CARD_POST_API } from "../../api/postAxios";

// TODO: add card 누르면 input 포커스 주기
function Card({ taskData }) {
    const [cards, setCards] = useState(taskData.cards);
    const [openDetailCard, setOpenDetailCard] = useState(false);
    const [addCard, setAddCard] = useState(false);
    const [cardTitle, setCardTitle] = useState("");
    const [cardInfo, setCardInfo] = useState({
        c_title: cardTitle,
        c_position: 0,
        c_creator: "",
        c_description: "",
        b_id: 1,
        t_id: null,
        c_start_date: "2023-05-17",
        c_end_date: "2023-05-17",
    });
    const [drag, setDrag] = useState(null);
    const [_list, setLists] = useState({ ...taskData.tasks });
    const inputRef = useRef();

    const handleCardClick = (e) => {
        const classListArr = [...e.target.classList];

        if (classListArr.includes("card")) {
            setOpenDetailCard(true);
            return;
        }
    };

    const handleAddMouseEnter = () => {
        setAddCard(true);
    };

    const handleAddInputMouseLeave = () => {
        if (inputRef.current.value) {
            return;
        }

        setAddCard(false);
    };

    const handleCardChange = (e) => {
        setCardTitle(inputRef.current.value);
        setCardInfo({
            ...cardInfo,
            c_title: inputRef.current.value,
            t_id: e.target.name,
        });
    };

    const cardSubmit = () => {
        CARD_POST_API(
            "https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/cards",
            cardInfo
        ).then((res) => {
            setCards([...res.data]);
        });

        setAddCard(false);
    };

    const handleKeydown = (e) => {
        if (!inputRef.current.value && e.keyCode === 13) {
            setAddCard(false);
            return;
        }

        if (inputRef.current.value && e.keyCode === 13) {
            cardSubmit();
        }
    };

    // const handleDragOver = (e) => {
    //     e.preventDefault();
    // };

    // const handleDragStart = (e) => {
    //     setDrag(e.target);
    //     e.target.classList.add("grabbing");
    //     e.dataTransfer.effectAllowed = "move";
    //     e.dataTransfer.setData("text/html", e.target);
    //     console.log(drag);
    // };

    // const handleDragEnd = (e) => {
    //     e.target.classList.remove("grabbing");
    //     e.dataTransfer.dropEffect = "move";
    // };

    // const handleDrop = (e) => {
    //     let grabPosition = Number(drag.dataset.position);
    //     let targetPosition = Number(e.target.dataset.position);

    //     console.log(e.target.parentElement.dataset.taskid);

    //     let _list = [taskData.cards];
    //     console.log(_list);
    //     _list[grabPosition] = _list.splice(
    //         targetPosition,
    //         1,
    //         _list[grabPosition]
    //     )[0];
    //     console.log(_list);
    //     setLists(_list);
    // };

    return (
        <>
            {cards.map((card, index) => {
                return (
                    <CardWrapper
                        key={index}
                        data-position={index}
                        onClick={handleCardClick}
                        className="card"
                        draggable
                    >
                        <CardTitle className="card">{card.c_title}</CardTitle>

                        <CardDropdownComponent
                            cardID={card.c_id}
                            cards={cards}
                            setCards={setCards}
                        />

                        {openDetailCard && (
                            <CardDetail
                                openDetailCard={openDetailCard}
                                setOpenDetailCard={setOpenDetailCard}
                                cardID={card.c_id}
                            />
                        )}
                    </CardWrapper>
                );
            })}

            <AddCardBox
                className="add_card"
                onClick={handleCardClick}
                addCardState={addCard}
                onMouseEnter={handleAddMouseEnter}
            >
                {addCard ? (
                    <AddCardInput
                        placeholder="내용을 입력하세요."
                        className="add_card"
                        onChange={handleCardChange}
                        onKeyDown={handleKeydown}
                        onMouseLeave={handleAddInputMouseLeave}
                        ref={inputRef}
                        name={taskData.t_id}
                    />
                ) : (
                    <AddCard className="add_card">
                        {icons.plusIcon}
                        <span className="add_card">카드를 추가하세요</span>
                    </AddCard>
                )}
            </AddCardBox>
        </>
    );
}

export default Card;

const CardWrapper = styled.div`
    width: 300px;
    min-width: 300px;
    min-height: 120px;
    -webkit-text-stroke: 0;
    margin: 12px 0 24px 0;
    padding: 12px;
    color: black;
    border-radius: ${({ theme }) => theme.borderRadius.basic};
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1),
        -0.5px -0.5px 1px rgba(0, 0, 0, 0.1);
    position: relative;
    background-color: #fff;

    &:hover {
        background-color: rgba(0, 0, 0, 0.03);
    }
`;

const CardTitle = styled.h2`
    width: 90%;
    font-size: 1.3rem;
    word-break: break-word;
    text-transform: capitalize;
    color: ${({ theme }) => theme.color.black};
`;

const AddCardBox = styled.div`
    width: 100%;
    min-width: 300px;
    max-width: 300px;
    min-height: 45px;
    max-height: 45px;
    padding: ${({ addCardState }) => (addCardState ? "0px" : "10px")};
    font-size: 15px;
    color: ${({ theme }) => theme.color.darkerGrey};
    border-radius: ${({ theme }) => theme.borderRadius.basic};
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1),
        -0.5px -0.5px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    transition: color 0.15s ease-in-out;
    margin-top: 12px;
    background-color: #fff;
`;

const AddCard = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    span {
        font-size: 14px;
        padding-left: 8px;
    }
`;

const AddCardInput = styled.input`
    display: inline-block;
    width: 100%;
    height: 100%;
    min-height: 45px;
    padding-inline-start: 12px;
    padding-inline-end: 12px;
    font-size: 15px;
    border-radius: ${({ theme }) => theme.borderRadius.basic};
    width: 100%;
    box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.06);
    outline: 1px solid ${({ theme }) => theme.color.grey};

    &::placeholder {
        font-size: 14px;
        color: ${({ theme }) => theme.color.main};
    }
`;
