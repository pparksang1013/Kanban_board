import React, { useState } from "react";
import Modal from "react-modal";
import * as A from "../style/test";

function CalendarJs() {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [startCheck, setStartCheck] = useState(false);
  const [endCheck, setEndCheck] = useState(false);

  // 달력 날짜 설정
  const onChange = (value) => {
    setDate(value);
  };
  // 모달창 Open
  const openModal = () => {
    setIsOpen(true);
  };
  // 모달창 Close
  const closeModal = () => {
    setIsOpen(false);
  };
  //  시작날짜 체크시 날짜 설정
  const startChecked = (e) => {
    setStartCheck(e.target.checked);
  };
  //  끝나는 날짜 체크시 날짜 설정
  const endChecked = (e) => {
    setEndCheck(e.target.checked);
  };
  return (
    <div className="calendar_js">
      <A.Button onClick={openModal} className="plus">
        Calendar
      </A.Button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false} style={{   overlay: {     backgroundColor: "rgba(0, 0, 0, 0.5)",   },   content: {     width: "350px",     height: "510px",     margin: "auto",   }, }}>
        <A.Div className="modal_box">
          <A.Div className="modal_top">
            <A.Button onClick={closeModal} className="btn_close">
              {" "}
              X{" "}
            </A.Button>
            <A.Modal_Title>Calendar</A.Modal_Title>
          </A.Div>
          <A.StyledCalendar
            onChange={onChange}
            value={date}
            calendarType="US"
          />
          <div className="setDate">
            <A.Div className="start date">
              <A.Input type="checkbox" onChange={startChecked}></A.Input>
              <label> Start Date</label>
              {startCheck && <A.Input type="date"></A.Input>}
            </A.Div>
            <A.Div className="due date">
              <A.Input type="checkbox" onChange={endChecked}></A.Input>
              <label> Due Date</label>
              {endCheck && <A.Input type="date"></A.Input>}
            </A.Div>
          </div>
          <A.Div className="modal_bottom">
            <A.Input type="button" value="저장"></A.Input>
            <A.Input type="button" value="삭제"></A.Input>
          </A.Div>
        </A.Div>
      </Modal>
    </div>
  );
}

export default CalendarJs;
