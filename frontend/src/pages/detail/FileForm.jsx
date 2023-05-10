import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Prism from "prismjs";
// Redux
import {useSelector} from "react-redux";
// code effect & Css
import "prismjs/components/prism-javascript";
import "../../style/vsCode.css";
import "../../style/lineNumber.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import * as A from "../../style/test";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";
// import "prismjs/plugins/download-button/prism-download-file";

// function FileForm({ fileName, fileType, modalOpen }) {
function FileForm(fileName) {
  const serverIp = useSelector((state)=>state.SERVER_IP);
  const userID = useSelector((state)=>state.u_id);
  
  const title = fileName.props;
  const fileId = "";
  

  // const title = fileName + "." + fileType;

  const [codeTxt, setCodeTxt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [comment, setComment] = useState({
    id: "",
    contents: "",
    date: "",
  });

  function openModal() {
    setIsOpen(true);
    getCode();
    getComment();
  }
  function closeModal() {
    setIsOpen(false);
    setCodeTxt(null);
  }

  //파일 요청
  async function getCode() {
    try {
      // const response = await axios.get(serverIp+"/fileList/"+file_id);
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

  // comment 서버에 요청하기
  async function getComment() {
    try {
      // const response = await axios.get(serverIp+"/fileList/"+file_id);
      const response = await axios.get(serverIp);
      // const response = await axios.get("/fileList/filename1.txt");
      const responseData = response.data;
      setComment({...comment,
        id: responseData.u_id,
        contents: responseData.comment_contents,
        date: responseData.comment_date,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // 코드 effect
  useEffect(() => {
    Prism.highlightAll();
  }, [codeTxt, isOpen]);

  // Enter 입력시 저장 및 comment 생성
  async function handleKeyPress(event) {
    if (event.key === "Enter") {
      const newComment = inputValue;
      try {
        await axios.post(serverIp+"/", {
            comment_contents: newComment,
            file_id: fileId,
            u_id: userID,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div>
      <button onClick={openModal}>{title}</button>
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
              {/* <code className="language-javascript lineontentEditable> */}
              <code className="language-javascript line-numbers">
                {codeTxt}
              </code>
            </pre>
          </A.Div>
          <A.Input  className="input_comment"  type="text"  onInput={handleInput}  placeholder=" Add Comment.."  onKeyPress={handleKeyPress}/>
        </A.Div>
      </Modal>
    </div>
  );
}

export default FileForm;
