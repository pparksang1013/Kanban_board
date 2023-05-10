import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as A from "../../style/test";
import axios from "axios";

function Member(member) {
  const cardMember = member.props;
  const [isOpen, setIsOpen] = useState(false);
  const [memberList, setMeberList] = useState("");
  const [memberSearch, setMemberSearch] = useState(null);
  const [selectedList, setSelectedList] = useState([]);

  // console.log(cardMember);

  // 모달창 Open
  function openModal() {
    setIsOpen(true);
    getData();
  }
  // 모달창 Close
  function closeModal() {
    setIsOpen(false);
  }

  // 보드 멤버 리스트 검색
  async function getData() {
    try {
      const response = await axios.get("/fileList/selet_member.json");
      setMeberList(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  // input 값 받기
  function handleMemberPlusChange(event) {
    setMemberSearch(event.target.value);
  }
  // input 검색
  function handleKeyPress(event) {
    if (memberSearch !== null && memberList !== "") {
      if (
        Object.values(memberList)
          .map((obj) => obj.u_id)
          .includes(memberSearch)
      ) {
        console.log("되고있어요");
        plusMember(memberSearch);
      } else {
        console.log("좆되고 있어요!");
      }
    }
  }

  // 저장 버튼 클릭 시 데이터 전송
  function saveMember() {
    axios
      .post("", {
        data: {
          u_id: selectedList,
        },
      })
      .then(function (response) {
        alert("저장이 완료되었습니다.");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  function plusMember(selectedId) {
    if (selectedList.includes(selectedId)) {
      setSelectedList(selectedList.filter((value) => value !== selectedId));
    } else {
      setSelectedList([...selectedList, selectedId]);
    }
  }

  return (
    <div className="member">
      <A.Button onClick={openModal} className="plus">
        +Member
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
            width: "350px",
            height: "500px",
            margin: "auto",
          },
        }}
      >
        <A.Div className="modal_box">
          <A.Div className="modal_top">
            <A.Button onClick={closeModal} className="btn_close">
              X
            </A.Button>
            <A.Modal_Title>Member</A.Modal_Title>
            <A.Div className="memberList"></A.Div>
          </A.Div>
          <A.Input
            type="text"
            onChange={handleMemberPlusChange}
            placeholder="add member.."
            onKeyPress={handleKeyPress}
          ></A.Input>
          <label>{selectedList.join("   ")}</label>
          <A.Div className="modal_middle">
            <table>
              <tbody>
                {Object.values(memberList).map((member, index) => (
                  <A.Tr
                    key={index}
                    onClick={() => plusMember(memberList[index].u_id)}
                  >
                    {/* <A.Tr key={index} onChange={alert("tset")}> */}
                    <A.Td className="memberTd">{member.u_id}</A.Td>
                    <A.Td className="email">{member.u_email}</A.Td>
                  </A.Tr>
                ))}
              </tbody>
            </table>
          </A.Div>
          <A.Div className="modal_bottom">
            <A.Input type="button" value="저장" onClick={saveMember}></A.Input>
          </A.Div>
        </A.Div>
      </Modal>
    </div>
  );
}

export default Member;
