import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Tag from "./Tag";
import Member from "./Member";
import Modal from "react-modal";
import * as A from "../style/test";
import { CiUser } from "react-icons/ci";
import axios from "axios";

function CardDetail(props) {
  const c_id = props;

  const [inputValue, setInputValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isComment, setIsComment] = useState("");
  const [text, setText] = useState("");

  // CardDetail 기본값 설정
  const [cardInfo, setCardInfo] = useState({
    memberList: "",
    startDate: "",
    endDate: "",
    dDay: "",
    tagList: "",
    commentId: "",
    commentList: ""
  });

  // 모달창 Open
  function openModal() {
    setIsOpen(true);

    getData();
  }
  // 모달창 Close
  function closeModal() {
    setIsOpen(false);
  }
  // 날짜, 카드파트너, 태그 조회
  async function getData() {
    try {
      const response = await axios.get("/fileList/response.json");
      const responseData = response.data;

      setCardInfo((prevState) => {
        return {
          memberList: Object.values(responseData.cardPartners).map(
            (cardPartners) => cardPartners.userTable.u_id
          ),
          startDate: responseData.c_start_date,
          endDate: responseData.c_end_date,
          dDay: responseData.d_day,
          tagList: Object.values(responseData.tags).map(
            (tags) => tags.tag_name
          ),
          commentId: Object.values(responseData.comments).map(
            (comments) => comments.userTable.u_id
          ),
          commentList:Object.values(responseData.comments).map(
            (comments) => comments.comment_contents
          )
        };
      });
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  }

  // comment 입력시 감지
  function handleInput(event) {
    setInputValue(event.target.value);
  }

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
  function tableClick(linenumber) {
    setIsComment(linenumber + "번 줄\n");
  }

  // 저장 버튼 동작
  function saveMotion() {
    // axios put 요청
    axios
      .put("", {
        /* 
    insert into 
    */
        params: {},
      })
      .then(function (response) {})
      .catch(function (error) {});
  }
  // 삭제 버튼 동작
  function deleteMotion() {
    // axios delete 요청
    axios
      .delete("", {
        /* 
  insert into 
  */
        params: {},
      })
      .then(function (response) {})
      .catch(function (error) {});
  }

  return (
    <div>
      <A.Button onClick={openModal}>Etc</A.Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "500px",
            height: "70%",
            margin: "auto",
          },
        }}
      >
        <A.Div className="modal_box">
          {/* 모달 TOP 시작 */}
          <A.Div className="modal_top">
            <A.Button onClick={closeModal} className="btn_close">
              {" "}
              X{" "}
            </A.Button>
            <A.Modal_Title>CardDetail</A.Modal_Title>
            <A.Div className="top2">
              <A.Div className="top2-middle">
                {/* <CiUser/> */}
                <Member props={cardInfo.memberList} />
                <A.Div className="memberList">{cardInfo.memberList}</A.Div>
              </A.Div>
              {/* <Label /> */}
              <A.Div className="top2-middle">
                {/* 아이콘 쓸지말지 고민을 해볼까? */}
                {/* <VscCalendar/> */}
                <Calendar />
                <A.Div>
                  {cardInfo.startDate} {cardInfo.endDate} {cardInfo.dDay}
                </A.Div>
              </A.Div>
              <A.Div className="top2-middle">
                <Tag />
                <A.Div>{cardInfo.tagList}</A.Div>
              </A.Div>
            </A.Div>
          </A.Div>
          {/* 모달 TOP 끝 */}
          {/* 모달 Middle 시작*/}
          <A.Div className="modal_middle">
            <A.Div className="middle_top">
             
            </A.Div>
            <A.Div className="middle_middle">
            <A.Input type="textArea" />
            </A.Div>
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
