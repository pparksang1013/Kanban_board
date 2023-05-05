import React, { useState } from "react";
// import "../style/Modalcss.css"
// import "../style/Category.css"
import styled from 'styled-components';
import Modal from "react-modal";

const IFrame = styled.iframe`
  width: 100%;                                    
  height: 100%;
`;

function Category() {
    const [isOpen, setIsOpen] = useState(false);

    // 모달창 Open
    const openModal = () => {
        setIsOpen(true);
    };
    // 모달창 Close
    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <button onClick={openModal}>카테고리 추가</button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={IFrame} ariaHideApp={false}>
                <div className="modaltop">
                <label> Label</label> <button onClick={closeModal}> 닫기 </button>
                </div>
                {/* <input type="text"> </input> */}
                <div> </div>
                <label> Label </label>
                <input type="checkbox"></input>
                <div className="label_list">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <input type="button" value="라벨추가"></input>

            </Modal>
        </div>
    );
}

export default Category;