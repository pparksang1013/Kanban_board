import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Label from "./Label";
import Member from "./Member";
import Modal from "react-modal";
import * as A from "../style/test";
import { VscCalendar } from "react-icons/vsc";
import axios from "axios";

// 저장 버튼 동작
function saveMotion(){
  // axios put 요청
}
// 삭제 버튼 동작
function deleteMotion(){
  // axios delete 요청
}

function CardDetail() {
  const [inputValue, setInputValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isComment, setIsComment ] = useState("");
  const [showDiv, setShowDiv] = useState(false);

  // 모달창 Open
  const openModal = () => {
    setIsOpen(true);
  };
  // 모달창 Close
  const closeModal = () => {
    setIsOpen(false);
  };
  // comment 입력시 감지
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  // 파일 읽어오기 test (txt)
  const [text, setText] = useState("");

  

  // commemt text 입력시 등록 버튼 표시
  useEffect(() => {
    if (inputValue !== "") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [inputValue]);

  // 파일 줄 단위로 읽어오기
  useEffect(() => {
    axios
      .get("/fileList/test.txt")
      .then(function (response) {
        const lines = response.data.split("\n");
        setText(lines);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  // 테이블 클릭시 comment에 해당 줄 번호 작성
  function tableClick (linenumber) {
    setIsComment(linenumber+"번 줄\n");
  }

 
  return (
    <div>
      <A.Button onClick={openModal}>카드 상세</A.Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "90%",
            height: "90%",
            margin: "auto",
          },
        }}
      >
        <A.Div className="modal_box">
          {/* 모달 TOP 시작 */}
          <A.Div className="modal_top">
            <A.Div className="top1">
              <A.Button onClick={closeModal} className="btn_close">
                {" "}
                X{" "}
              </A.Button>
              <A.Modal_Title>CardDetail</A.Modal_Title>
            </A.Div>
            <A.Div className="top2">
              <A.Div className="top2-middle">
                <Member />
              </A.Div>
              {/* <Label /> */}
              <A.Div className="top2-middle">
                {/* 아이콘 쓸지말지 고민을 해볼까? */}
                {/* <VscCalendar/> */}
                <Calendar />
              </A.Div>
              <A.Div className="top2-middle">
                <Label />                
              </A.Div>
            </A.Div>
          </A.Div>
          {/* 모달 TOP 끝 */}
          {/* 모달 Middle 시작*/}
          <A.Div className="modal_middle">
            <A.Div className="middle_top">
              <table>
                <tbody>
                  {Object.keys(text).map((key, index) => (
                    <A.Tr key={index}>
                      <A.Td className="num">{index + 1}</A.Td>
                      <A.Td onClick={()=>tableClick(index + 1)}> {text[key]}</A.Td>
                    </A.Tr>
                  ))}
                </tbody>
              </table>
            </A.Div>
            <A.Div className="middle_middle"></A.Div>
            <A.Div className="middle_bottom">
              <A.Input
                className="input_comment"
                type="text"
                onInput={handleInput}
                placeholder=" Add Comment.."
                defaultValue={isComment}
              />
              {showButton && <A.Input type="button" value="등록"></A.Input>}
            </A.Div>
          </A.Div>
        </A.Div>
        {/* 모달 Middle 끝 */}
        {/* 모달 Bottom 시작*/}
        <A.Div className="modal_bottom">
          <A.Input type="button" onClick={saveMotion} value="저장"></A.Input>
          <A.Input type="button" onClick={deleteMotion} value="삭제"></A.Input>
        </A.Div>
        {/* 모달 Bottom 끝 */}
      </Modal>
    </div>
  );
}

export default CardDetail;
