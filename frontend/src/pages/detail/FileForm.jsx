import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "../../style/vsCode.css";
import "../../style/lineNumber.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import * as A from "../../style/test";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";
// import "prismjs/plugins/download-button/prism-download-file";


// function FileForm({ fileName, fileType, modalOpen }) {
function FileForm(fileName) {
  const title = fileName.props;
  console.log(title );
  // const title = fileName + "." + fileType;

  const [codeTxt, setCodeTxt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [showButton, setShowButton] = useState(false);
  const [isComment, setIsComment] = useState("");
  const [inputValue, setInputValue] = useState("");

  function openModal() {
    setIsOpen(true);
    getCode();
  }
  function closeModal() {
    setIsOpen(false);
    setCodeTxt(null);
  }

  async function getCode() {
    try {
      // const response = await axios.get("/fileList/"+title);
      const response = await axios.get("/fileList/filename1.txt");
      const responseData = response.data;
      setCodeTxt(responseData);
    } catch (error) {
      console.log(error.message);
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

  useEffect(() => {
    Prism.highlightAll();
  }, [codeTxt, isOpen]);

  return (
    <div>
      <button onClick={openModal}  >{title}</button>
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
          <A.Div className="modal_top">
            <A.Button onClick={closeModal} className="btn_close">
              {" "}
              X{" "}
            </A.Button>
            <A.Modal_Title>{title}</A.Modal_Title>
          </A.Div>

          <A.Div className="modal_middle">
            <pre className="language-javascript line-numbers">
              {/* <code className="language-javascript line-numbers" contentEditable> */}
              <code className="language-javascript line-numbers" >
                {codeTxt}
              </code>
            </pre>
          </A.Div>
          <A.Input
                className="input_comment"
                type="text"
                onInput={handleInput}
                placeholder=" Add Comment.."
                defaultValue={isComment}
              />
              {showButton && <A.Input type="button" value="등록"></A.Input>}
        </A.Div>
      </Modal>
    </div>
  );
}

export default FileForm;
