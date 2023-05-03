import React, { useState } from "react";
import Modal from "react-modal";
import * as A from "../style/test";
import axios from "axios";

function Tag() {
  const [isOpen, setIsOpen] = useState(false);
  const [newTag, setNewTag] = useState([]);
  const [tag, setTag] = useState(null);

  // 모달창 Open
  function openModal() {
    setIsOpen(true);
  }
  // 모달창 Close
  function closeModal() {
    setIsOpen(false);
  }

  // axios.get("",{
  //   // c_id: c_id
  // }).then(function (response){
  //   if(response.data ===undefined){
  //     console.log("response is null");
  //   }
  //   setLabel(Object.values(response.date).map(obj=>obj.label))
  // } ).catch(function (error){
  //   console.log(error.message);
  // })

  // Enter 입력시 저장 및 라벨 생성
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      setNewTag([...newTag,event.target.value]);
      event.target.value = "";
      
      // axios
      //   .post("", {
      //     newLabel: newTag,
      //   })
      //   .then(function (response) {
      //     alert("Label 저장이 완료되었습니다.");
      //   })
      //   .catch(function (error) {
      //     console.log(error.message);
      //   })
      //   .finally(function () {
      //     setNewTag(null);
      //   });
    }
  }
  return (
    <div>
      <A.Button onClick={openModal} className="plus">
        Tag
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
            <A.Modal_Title> Tag</A.Modal_Title>
          </A.Div>
          <A.Div className="modal_middle">
            <A.Input
              type="text"
              className="tagForm"
              placeholder="Tag..."
              onKeyPress={handleKeyPress}
            /><div>
            {newTag.map((tag) => (
              <span key={tag} className="labelList">{tag}</span>
            ))}
          </div>
            
          </A.Div>
          <A.Div className="modal_bottom">
            {/* <A.Input type="button" value="라벨추가"></A.Input> */}
          </A.Div>
        </A.Div>
      </Modal>
    </div>
  );
}

export default Tag;
