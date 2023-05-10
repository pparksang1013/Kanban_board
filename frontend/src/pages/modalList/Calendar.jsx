// import React from "react"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import moment from 'moment';
import styled from 'styled-components';
import Modal from "react-modal";

const IFrame = styled.iframe`
  width: 100px;                                    
  height: 50%;
`;

function CalendarJs() {
    const [date, setDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const onChange = (value) => {
        setDate(value);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    // 모달창 Close
    const closeModal = () => {
        setIsOpen(false);
    };



    return (
        <div className='calendar_js'>
            <button onClick={openModal}>캘린더</button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={IFrame} ariaHideApp={false}>
                <button onClick={closeModal}> 닫기 </button>
                <Calendar onChange={onChange} value={date} />
                <div className='setDate'>
                    <div className='start_date'>
                        <input type="checkbox"></input>
                        <label> Start Date</label>
                        <input type='date'></input>
                    </div>
                    <div className='due_date'>
                        <input type="checkbox"></input>
                        <label> Due Date</label>
                        <input type='date'></input>
                    </div>
                </div>
                <input type="button" value="저장"></input>
                <input type='button' value="삭제"></input>

            </Modal>
        </div>
    );


}

export default CalendarJs;