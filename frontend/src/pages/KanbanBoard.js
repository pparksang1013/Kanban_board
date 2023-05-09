import { useState, useEffect } from "react";
import Modal from "react-modal";
import CardDetail from "../modalList/CardDetail";
import axios from "axios";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import BoardHeader from "./BoardHeader";

function Board() {
  const [boardList, setBoardList] = useState(null);
  // const [userId, setUserId] = useState(1);
  const [userId, setUserId] = useState("userId1");


  // const AxiosURL = 'http://192.168.1.180:9080'
  const AxiosURL = 'http://localhost:9080'


  // 데이터 받기
  useEffect(() => {
    let completed = false;
    const getBoard = async () => {
      try {
        const response = await axios.get(`${AxiosURL}/board/${userId}`);
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
      t_id: 1
    }
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
      await axios.post(`${AxiosURL}/task`, task);
      console.log("task추가")
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSubmitCard() {
    try {
      await axios.post(`${AxiosURL}/card`, card);
      console.log("카드추가")
    } catch (e) {
      console.error(e);
    }
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);


  // 데이터 삭제

  async function deleteSubmit(cardId) {
    try {
      await axios.delete(`${AxiosURL}/card/${cardId}`);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  }

  async function deleteTaskSubmit(taskId) {
    try {
      await axios.delete(`${AxiosURL}/task/${taskId}`);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  }

  // 데이터 수정

  async function updateSubmit() {
    try {
      await axios.put(`${AxiosURL}/task`, task);
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
    <>
    <BoardHeader></BoardHeader>

    <div className="Board">
      {/* 테스크 불러오기 */}
      {boardList &&
        boardList.tasks.map((boards) => {
          return (
            <TaskWrap key={boards.t_id} >
              {/* 테스크 삭제 */}
              <input
                    style={{ marginLeft: "110px", color: "red" }}
                    type="button"
                    value="삭제"
                    onClick={(e) => deleteTaskSubmit(boards.t_id)}
                    name="t_id"
                  ></input>
              {selectedId === boards.t_id ? (
                <form onSubmit={(e) => updateSubmit(e)}>
                  {/* 테스크 수정 */}
                  <input type="text" key={selectedId} id={selectedId} onChange={(e) => handleValueChange(e)} onBlur={handleTitleBlur} name="t_name" autoFocus />

                  
                </form>
              ) : (
                <Header id={boards.t_id} onClick={() => handleSelect(boards.t_id)}>{boards.t_name}</Header>
              )}

              {console.log(selectedId)}

              <CardDetail />
              <MyCardList>
                {/* 카드 불러오기 */}
                {boards &&
                  boards.cards.map((card) => {
                    return (
                      // 이걸 눌렀을때 카드 상세페이지가 나오게 수정필요
                      <MyCard key={card.c_id}>
                        {card.c_title}
                        {/* 멤버가 안불러와짐 */}
                        {/* <p>{card.cardPartners.partner_id}</p> */}
                        <p>{card.tags.tag_name}</p>

                        {/* 카드 삭제 */}
                        <input type="button" onClick={(e) => deleteSubmit(card.c_id)} name="c_id" value="x" />
                      </MyCard>
                    );
                  })}
              </MyCardList>
              <form onSubmit={(e) => handleSubmitCard(e)}>
                <InputCard placeholder="엔터로 카드 추가" type="text" size="15" name="c_title" id={boards.t_id} onChange={(e) => handleCardValueChange(e)} />
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
            <input placeholder="엔터로 테스크 추가" type="text" name="t_name" onChange={(e) => handleValueChange(e)}></input>
          </form>
          <button onClick={() => setModalIsOpen(false)}>닫기</button>
        </Modal>
      </ButtonWrap>
    </div>
    </>
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
  float: left;
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
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const InputCard = styled.input`
  border: none;
  background: white;
  border-radius: 6px;
  height: 23px;
`;

export default Board;
