import React, { useState } from "react";
import Modal from "react-modal";
import * as A from "../style/test";
import axios from "axios";


function CalendarJs() {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [startCheck, setStartCheck] = useState(false);
  const [endCheck, setEndCheck] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);

  // 달력 날짜 설정
  function onChange (value){
    setDate(value);
  };
  // 모달창 Open
  function openModal(){
  setIsOpen(true);
  }
  // 모달창 Close
  function closeModal(){
  setIsOpen(false);
  }
    

  // startDay 체크박스
  function handleStartChange(event) {
    setStartCheck(event.target.checked);
  }
  // endDay 체크박스
  function handleEndChange(event) {
    setEndCheck(event.target.checked);
  }
  // startDay 값 받아오기
  function handleStartValueChange(event) {
    setStartValue(event.target.value);
  }
  // endDay 값 받아오기
  function handleEndValueChange(event) {
    setEndValue(event.target.value);
  }
  // 날짜 조회
  axios.get("",{
    // c_id 필수
  }).then(function (response){
    setStartDate(Object.values(response.date).map(obj=>obj.start_date));
    setEndDate(Object.values(response.date).map(obj=>obj.end_date));
  }).catch(function(error){
    // console.log(error.message);
  })

  // 저장 버튼 동작
  function saveDay() {
    axios.post("", {
      start_date: startValue,
      end_date: endValue
    }).then(function(response) {
    }).catch(function(error){
      console.log(error.message);
    });
  }

  // 삭제 버튼 동작작
  function deleteDay() {
    axios.delete("", {
      // : ,
      // end_date: endValue
    }).then(function(response) {
    }).catch(function(error){
      console.log(error.message);
    });
  }


  return (
    <div className="calendar_js">
      <A.Button onClick={openModal} className="plus">
        Calendar
      </A.Button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false} style={{   overlay: {     backgroundColor: "rgba(0, 0, 0, 0.5)",   },   content: {     width: "350px",     height: "540px",     margin: "auto",   }, }}>
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
              <A.Input type="checkbox" onChange={handleStartChange}></A.Input>
              <label> Start Date</label>
              {startCheck && <A.Input type="date"  value ={startDate} onChange={handleStartValueChange}></A.Input>}
            </A.Div>
            <A.Div className="due date">
              <A.Input type="checkbox" onChange={handleEndChange}></A.Input>
              <label> Due Date</label>
              {endCheck && <A.Input type="date"  value ={endDate} onChange={handleEndValueChange}></A.Input>}
            </A.Div>
          </div>
          <A.Div className="modal_bottom">
            <A.Input type="button" value="저장" onClick={saveDay}></A.Input>
            <A.Input type="button" value="삭제" onClick={deleteDay}></A.Input>
          </A.Div>
        </A.Div>
      </Modal>
    </div>
  );
}

export default CalendarJs;
