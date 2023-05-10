import React, { useEffect, useState } from "react";
// import ModalForm from "./ModalForm";
// import ModalFormPlus from "./ModalFormPlus";
import Calendar from "./Calendar";
import Category from "./Category";
import Member from "./Member";
import Modal from "react-modal";
import styled from "styled-components";

const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;

function MyComponent({ onInputChange }) {
  function handleInput(event) {
    onInputChange(event.target.value);
  }
  return (
    <input
      className="input_comment"
      type="textarea"
      onInput={handleInput}
      defaultValue="Add Comment.."
    />
  );
}

function CardDetail() {
  const [inputValue, setInputValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // 모달창 Open
  const openModal = () => {
    setIsOpen(true);
  };
  // 모달창 Close
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (inputValue !== "") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [inputValue]);
  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleInputChange(value) {
    setInputValue(value);
  }

  return (
    <div className="modal_box">
      <button onClick={openModal}>카드 상세</button>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={IFrame} ariaHideApp={false}>
        <button onClick={closeModal}>Close Modal</button>
        <div className="modal_top">
          <label>
            <h1>CardDetail</h1>{" "}
          </label>
        </div>
        <div className="modal_left">
          <div>
            <a href="..\page\Test.js"> 소스보기 </a>
          </div>
          <div className="comment">
            <form onSubmit={handleSubmit}>
              <MyComponent onInputChange={handleInputChange} />
              {showButton && <button>등록</button>}
            </form>
          </div>
        </div>
        <div className="modal_right">
          {/* <ModalForm/> */}
          {/* <ModalFormPlus></ModalFormPlus> */}
          <Calendar />
          <Category />
          <Member />
        </div>
      </Modal>
    </div>
  );
}

export default CardDetail;
