import React, { useState } from "react";
import Modal from "react-modal";
import * as A from "../../style/test";
import axios from "axios";
import { useSelector } from "react-redux";

function Tag(taglist) {
  const tagList = taglist.tagList;
  console.log(tagList);
  const cardId = taglist.cardId;
  const [isOpen, setIsOpen] = useState(false);
  // const [newTag, setNewTag] = useState([test]);
  const [newTag, setNewTag] = useState([]);
  
  const serverIp = useSelector((state) => state.SERVER_IP);

  // 모달창 Open
  function openModal() {
    setIsOpen(true);
  }
  // 모달창 Close
  function closeModal() {
    setIsOpen(false);
    setNewTag([]);
  }
  
  // 태그 저장
  function saveTag() {
      axios
        .post(serverIp + "Tag", newTag.map((tag) => ({
          tag_name: tag,
          c_id: cardId,
          tag_color:1
        })))
        .then(function (response) {
          alert("저장이 완료되었습니다.");
        })
        .catch(function (error) {
          console.log(error.message);
        });
      closeModal();
    }
  // Enter 입력시 저장 및 라벨 생성
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      setNewTag([...newTag, event.target.value]);
      // getRandomColor();
      event.target.value = "";

    }
  }
//   테그 라스트 (디비 저장 전 )
  function handleRemove(index) {
    const tag = [...newTag];
    tag.splice(index, 1);
    setNewTag(tag);
  }

//  삭제버튼(cardDetail창에 보이는 x버튼 동작시)
  function deleteTag(tagName) {
    
    // axios
    //   .delete(serverIp + "cardmember", 
    //   {u_id:memeberName}
    //   )
    //   .then(function (response) {
    //     // alert("저장이 완료되었습니다.");
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  }
  return (
    <div>
        <A.Div  className="plus tplus">
        <A.Div className="cardWrap">
          <A.Div className="tagbuttons" onClick={openModal}> Tag </A.Div>
          {/* <A.Div className="cardValue">{test}</A.Div> */}
          <A.Div className="cardValue"> <div>
            {Object.values(tagList).map((tags, index) => (
              <A.Div key={index} className="labelList right">
                <A.Span className="labelList">{tagList[index]}
                {/* <A.Button type="button" onClick={() => deleteTag(index)}className="delBtn">
                    X
                  </A.Button> */}
                </A.Span>
              </A.Div>
            ))}
          </div></A.Div>
          </A.Div> 
      </A.Div>
      
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
            />
            <div>
              {newTag.map((tag, index) => (
                <A.Div key={index} className="labelList">
                  <A.Span className="labelList">{tag}
                  <A.Button type="button" onClick={() => handleRemove(index)}className="delBtn">
                    X
                  </A.Button>
                  </A.Span>
                </A.Div>
              ))}
            </div>
          </A.Div>
          <A.Div className="modal_bottom">
          <A.Input type="button" value="저장" onClick={saveTag}></A.Input>
          </A.Div>
        </A.Div>
      </Modal>
    </div>
  );
}

export default Tag;
