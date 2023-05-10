import React, { useState } from "react";
import styled from 'styled-components';
import Modal from "react-modal";

const IFrame = styled.iframe`
  width: 100%;                                    
  height: 100%;
`;


function Member() {
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
        <div className="member">
            <button onClick={openModal}>멤버추가</button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={IFrame} ariaHideApp={false}>
                <button onClick={closeModal}>Close Modal</button>

                <div className="left">
                    <label> 멤버추가</label>
                    <input type="text"></input>
                </div><button onClick={closeModal}>Close Modal</button>
            </Modal>

        </div>

    );
}

export default Member;