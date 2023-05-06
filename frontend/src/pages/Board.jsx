import { useState, useEffect } from "react";
import Modal from "react-modal";
import CardDetail from "../modalList/CardDetail";
import axios from "axios";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function Board() {
    const [boardList, setBoardList] = useState(null);
    const [userId, setUserId] = useState("userId1");

    // // 데이터 받기
    // useEffect(() => {
    //   let completed = false;
    //   const getBoard = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:9080/board/${userId}`);
    //       if (!completed) {
    //         setBoardList(response.data);
    //         console.log(boardList);
    //       }
    //       if (boardList !== null) {
    //         console.log(boardList);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //       alert("Error데이터를 불러올 수 없습니다");
    //     }
    //   };
    //   getBoard();
    //   return () => {
    //     completed = true;
    //   };
    // }, []);

    // creator는 로그인이 되야 보낼수 있을듯
    const [task, setTask] = useState({
        t_name: "",
        t_type: "type1",
        t_upd_date: "",
        t_creator: "admin",
        t_del_yn: "no",
        t_position: 1,
        board: {
            b_id: 1,
        },
    });

    const handleValueChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const [card, setCard] = useState({
        c_title: "",
        c_position: 0,
        c_creator: "",
        c_description: "",
        c_del_yn: "No",
        c_start_date: "2020-01-01",
        c_end_date: "2020-01-02",
        board: {
            b_id: 1,
        },
        task: {
            t_id: 1,
        },
    });

    const handleCardValueChange = (e) => {
        setCard({
            ...card,
            [e.target.name]: e.target.value,
            task: {
                t_id: e.target.id,
            },
        });
    };

    // 데이터 보내기

    async function handleSubmit() {
        try {
            await axios.post("http://localhost:9080/task", task);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleSubmitCard() {
        try {
            await axios.post("http://localhost:9080/card", card);
        } catch (e) {
            console.error(e);
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();
    // 데이터 삭제

    async function deleteSubmit(cardId) {
        try {
            await axios.delete(`http://localhost:9080/card/${cardId}`);
        } catch (e) {
            console.error(e);
        }
        window.location.reload();
    }

    return (
        <div className="Board">
            {boardList &&
                boardList.tasks.map((boards) => {
                    return (
                        <TaskWrap>
                            <Header>{boards.t_name}</Header>
                            <CardDetail />
                            <MyCardList>
                                {boards &&
                                    boards.cards.map((card) => {
                                        return (
                                            // 이걸 눌렀을때 카드 상세페이지가 나오게 수정필요
                                            <MyCard key={card.c_id}>
                                                {card.c_title}

                                                <input
                                                    type="button"
                                                    onClick={(e) =>
                                                        deleteSubmit(card.c_id)
                                                    }
                                                    name="c_id"
                                                    value="x"
                                                />
                                            </MyCard>
                                        );
                                    })}
                            </MyCardList>
                            <form onSubmit={(e) => handleSubmitCard(e)}>
                                <InputCard
                                    placeholder="엔터로 카드 추가"
                                    type="text"
                                    size="15"
                                    name="c_title"
                                    id={boards.t_id}
                                    onChange={(e) => handleCardValueChange(e)}
                                />
                            </form>
                        </TaskWrap>
                    );
                })}

            <ButtonWrap>
                <StyledButton onClick={() => setModalIsOpen(true)}>
                    <AddIcon></AddIcon>
                </StyledButton>

                <Modal
                    style={{
                        overlay: {
                            position: "fixed",
                            zIndex: 1020,
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            background: "rgba(0,0,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        },
                        content: {
                            top: -50,
                            background: "white",
                            width: "20rem",
                            maxWidth: "calc(100vw - 2rem)",
                            maxHeight: "calc(100vh - 2rem)",
                            overflowY: "auto",
                            position: "relative",
                            border: "none",
                            borderRadius: "0.3rem",
                        },
                    }}
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                >
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                            placeholder="엔터로 테스크 추가"
                            type="text"
                            name="t_name"
                            onChange={(e) => handleValueChange(e)}
                        ></input>
                    </form>
                    <button onClick={() => setModalIsOpen(false)}>닫기</button>
                </Modal>
            </ButtonWrap>
        </div>
    );
}

const StyledButton = styled.button`
    padding: 6px 6px;
    border-radius: 8px;
    font-size: 1rem;
    margin: 100px 0px;
    height: 50px;
    border: 1px solid lightgray;
    color: gray;
    background: white;
    &:hover {
        background-color: skyblue;
    }
`;

const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
`;

const TaskWrap = styled.div`
    border: 2px solid gray;
    border-radius: 8px;
    width: 150px;
    margin: 10px 10px;
    padding: 6px 6px;
    background: lightgray;
`;

const Header = styled.h1`
    background: white;
    border-radius: 10px;
`;

const MyCardList = styled.ul`
    list-style: none;
`;

const MyCard = styled.li`
    background: white;
    border-radius: 6px;
    margin: 10px;
`;

const InputCard = styled.input`
    border: none;
    background: white;
    border-radius: 6px;
    height: 23px;
`;

export default Board;
