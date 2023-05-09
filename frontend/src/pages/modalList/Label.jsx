import React, { useState } from "react";
import Modal from "react-modal";
import * as A from "../../style/test";

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
            <A.Button onClick={openModal} className="plus">
                Label
            </A.Button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        width: "300px",
                        height: "300px",
                        margin: "auto",
                    },
                }}
            >
                <A.Div className="modal_box">
                    <A.Div className="modal_top">
                        <A.Button onClick={closeModal} className="btn_close">
                            {" "}
                            X{" "}
                        </A.Button>
                        <A.Modal_Title> Label</A.Modal_Title>
                    </A.Div>
                    <A.Div className="modal_middle">
                        <A.Input type="checkbox"></A.Input>
                    </A.Div>
                    <A.Div className="modal_bottom">
                        <A.Input type="button" value="라벨추가"></A.Input>
                    </A.Div>
                </A.Div>
            </Modal>
        </div>
    );
}

export default Category;
