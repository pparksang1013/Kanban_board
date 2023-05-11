import { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import axios from "axios";

import CardDetail from "../detail/CardDetail";
import BoardHeader from "./BoardHeader";

import dummyData from "../../data/dummy_data.json";

function Board() {

  // const [userId, setUserId] = useState(1); 최신서버는 이걸로
  const [userId, setUserId] = useState("userId1");
  const serverIp = useSelector((state) => state.SERVER_IP);

  const [boardList, setBoardList] = useState(null);

  // 데이터 받기
  useEffect(() => {
    let completed = false;
    const getBoard = async () => {
      try {
        const response = await axios.get(`${serverIp}/board/${userId}`);
        if (!completed) {
          setBoardList(response.data);
          console.log(boardList);
        }
        if (boardList !== null) {
          console.log(boardList);
        }
      } catch (e) {
        console.log(e);
        alert("Error데이터를 불러올 수 없습니다");
      }
    };
    getBoard();
    return () => {
      completed = true;
    };
  }, []);

  // 서버로 전송되는 테스크 데이터
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
      t_id: selectedId,
    });
    console.log(task, selectedId);
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
      await axios.post(`${serverIp}/task`, task);
      console.log("task추가");
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSubmitCard() {
    try {
      await axios.post(`${serverIp}/card`, card);
      console.log("카드추가");
    } catch (e) {
      console.error(e);
    }
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 데이터 삭제

  async function deleteSubmit(cardId) {
    try {
      await axios.delete(`${serverIp}/card/${cardId}`);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  }

  async function deleteTaskSubmit(taskId) {
    try {
      await axios.delete(`${serverIp}/task/${taskId}`);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  }

  // 데이터 수정

  async function updateSubmit() {
    try {
      await axios.put(`${serverIp}/task`, task);
    } catch (err) {
      console.log(err);
    }
  }

  const [selectedId, setSelectedId] = useState(null);

  function handleSelect(id) {
    setSelectedId(id);
  }

  const handleTitleBlur = () => {
    setSelectedId(0);
  };

  return (
    <BoardWrapper>
      <BoardHeader />
      <div className="Board">
        {boardList &&
          boardList.tasks.map((boards, index) => {
            return (
              <Task>
                
                {/* 테스크 삭제 */}
                {boards.t_id > 4 ? (
                  <input
                    style={{ marginLeft: "110px", color: "red" }}
                    type="button"
                    value="삭제"
                    onClick={(e) => deleteTaskSubmit(boards.t_id)}
                    name="t_id"
                  ></input>
                ) : null}
                {/* 테스크 수정 */}
                {selectedId === boards.t_id ? (
                  <form onSubmit={(e) => updateSubmit(e)}>
                    <input
                      type="text"
                      key={selectedId}
                      id={selectedId}
                      onChange={(e) => handleValueChange(e)}
                      onBlur={handleTitleBlur}
                      name="t_name"
                      autoFocus
                    />
                  </form>
                ) : (
                  <TaskHeader index={index} id={boards.t_id} onClick={() => handleSelect(boards.t_id)}>
                    {boards.t_name}
                  </TaskHeader>
                )}

                <CardDetail />
                <>
                {/* 카드 불러오기 */}
                {boards &&
                  boards.cards.map((card) => {
                    return (
                      <CardUl>
                      <CardLi key={card.c_id}>
                        <li>{card.c_title}</li>
                      
                      {card &&
                  card.tags.map((tag) => {
                    return (
                      <li sx={{background: "red"}}>{tag.tag_name}</li>
                    )})}
                        {/* 카드 삭제 */}
                        <DeleteInput type="button" onClick={(e) => deleteSubmit(card.c_id)} name="c_id" value="x" sx={{display: "inline-block"}}></DeleteInput>
                        
                      </CardLi>

                    </CardUl>);
                  })}
              </>
              <form onSubmit={(e) => handleSubmitCard(e)}>
                <InputCard placeholder="엔터로 카드 추가" type="text" size="15" name="c_title" id={boards.t_id} onChange={(e) => handleCardValueChange(e)} />
              </form>
              </Task>
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
              <input placeholder="엔터로 테스크 추가" type="text" name="t_name" onChange={(e) => handleValueChange(e)}></input>
            </form>
            <button onClick={() => setModalIsOpen(false)}>닫기</button>
          </Modal>
        </ButtonWrap>
      </div>
    </BoardWrapper>
  );
}

const BoardWrapper = styled.section`
  padding: 20px;
  width: 100vw;
  max-height: 100vh;
  overflow: auto;

  .Board {
    border-radius: 4px;
    display: flex;
    height: 100%;
    padding: 20px;
  }
`;

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

const Task = styled.div`
  width: 300px;
  min-width: 300px;
  margin-right: 20px;
  /* background-color: ${({ theme }) => theme.color.black}; */
`;

const TaskHeader = styled.h2`
  color: ${({ index, theme }) => (index === 0 ? theme.color.main : index === 1 ? theme.color.orange : index === 2 ? theme.color.red : theme.color.blue)};

  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: -1px;
  word-spacing: 4px;
`;

const CardUl = styled.ul`
  list-style: none;
`;

const CardLi = styled.li`
  border-radius: 4px;
  margin: 10px;
  width: 100%;
  height: 150px;
//   background-color: #000;
position: relative;
`;

const InputCard = styled.input`
  border: none;
  background: white;
  border-radius: 6px;
  height: 23px;
`;

const DeleteInput = styled.input`
  position: absolute;
  top: 3px;
  right: 5px;

`

export default Board;
