import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import Member from "./Member";
import Modal from "react-modal";
import * as A from "../../style/test";
import axios from "axios";
import FileForm from "./FileForm";
import FileAdd from "./FileAdd";

function CardDetail(props) {
  const cardId = props.props;
  const [isOpen, setIsOpen] = useState(false);

  // CardDetail 기본값 설정
  const [cardInfo, setCardInfo] = useState({
    memberList: "",
    startDate: "",
    endDate: "",
    totalDate: "",
    dDay: "",
    tagList: "",
    file_id: "",
    fileList: "",
    cardDescription: "",
  });

  // 모달창 Open
  function openModal() {
    setIsOpen(true);

    getData();
  }
  // 모달창 Close
  function closeModal() {
    setIsOpen(false);
  }
  // 날짜, 카드파트너, 태그 조회
  // ++파일 리스트 조회
  async function getData() {
    try {
      const response = await axios.get("/fileList/response.json", {
        // const response = await axios.get("http://192.168.1.180:9080/c_id/+cardId
        params: {
          c_id: cardId,
        },
      });
      const responseData = response.data;
      console.log(responseData);
      setCardInfo((prevState) => {
        return {
          ...prevState,
          memberList: responseData.cardPartners
            ? Object.values(responseData.cardPartners)
                .map((cardPartners) => cardPartners.userTable.u_id)
                .join("    ")
            : "",
          startDate: responseData.c_start_date ? responseData.c_start_date : "",
          endDate: responseData.c_end_date ? responseData.c_end_date : "",
          dDay: "D-" + responseData.d_day,
          totalDate:
            responseData.c_start_date || responseData.c_end_date
              ? responseData.c_start_date + " ~ " + responseData.c_end_date
              : null,
          tagList: responseData.tags
            ? Object.values(responseData.tags).map((tags) => tags.tag_name).join("    ")
            : "",
          fileList: Object.values(responseData.files).map(
            (files) => files.file_name + "." + files.file_ext
          ),
          cardDescription: responseData.c_description,
          file_id: Object.values(responseData.files).map((files) => files.file_id)
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  }

console.log("sdasdas",cardInfo.fileList);
  function handleStartValueChange(event) {
    setCardInfo({ ...cardInfo, startDate: event.target.value });
  }
  // endDay 값 받아오기
  function handleEndValueChange(event) {
    setCardInfo({ ...cardInfo, endDate: event.target.value });
  }

  // 저장 버튼 동작
  function saveMotion() {
    // axios put 요청
    axios
      .put("", {
        /* 
    insert into 
    */
        params: {},
      })
      .then(function (response) {})
      .catch(function (error) {});
  }
  // 삭제 버튼 동작
  function deleteMotion() {
    // axios delete 요청
    axios
      .delete("", {
        /* 
  insert into 
  */
        params: {},
      })
      .then(function (response) {})
      .catch(function (error) {});
  }

  return (
    <div>
      <A.Button onClick={openModal}>카드 상세 2버전</A.Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "600px",
            height: "50%",
            margin: "auto",
          },
        }}
      >
        <A.Div className="modal_box">
          {/* 모달 TOP 시작 */}
          <A.Div className="modal_top">
            <A.Button onClick={closeModal} className="btn_close">
              {" "}
              X{" "}
            </A.Button>
            <A.Modal_Title>CardDetail2</A.Modal_Title>
            <A.Div className="top2">
              <A.Div className="top2-middle">
                <Member props={cardInfo.memberList} />
                <A.Div className="search">{cardInfo.memberList}</A.Div>
              </A.Div>
              {/* <Label /> */}
              <A.Div className="top2-middle">
                <A.Input
                  type="date"
                  value={cardInfo.startDate}
                  onChange={handleStartValueChange}
                />
                <A.Input
                  type="date"
                  value={cardInfo.endDate}
                  onChange={handleEndValueChange}
                />
              </A.Div>
              <A.Div className="top2-middle">
                <Tag props={cardInfo.tagList}/>
                <A.Div className="search">{cardInfo.tagList}</A.Div>
              </A.Div>
            </A.Div>
          </A.Div>
          {/* 모달 TOP 끝 */}
          {/* 모달 Middle 시작*/}
          <A.Div className="modal_middle">
            <A.Div className="middle_top">
              {/* 리스트 파일 목록 구현 */}
              <FileAdd />
              <A.Modal_Title>Code</A.Modal_Title>
              <ul>
                {Object.values(cardInfo.fileList).map((file, index) => (
                  <li key={index}>
                    <FileForm props={file} />
                  </li>
                ))}
              </ul>
            </A.Div>
            <A.Div className="middle_middle">
              <A.Modal_Title>Description</A.Modal_Title>
              <A.Textarea defaultValue={cardInfo.cardDescription}></A.Textarea>
            </A.Div>
            <A.Div className="middle_bottom">
            </A.Div>
          </A.Div>
        </A.Div>
        {/* 모달 Middle 끝 */}
        {/* 모달 Bottom 시작*/}
        <A.Div className="modal_bottom">
          <A.Input type="button" onClick={saveMotion} value="저장"></A.Input>
          <A.Input type="button" onClick={deleteMotion} value="삭제"></A.Input>
        </A.Div>
        {/* 모달 Bottom 끝 */}
      </Modal>
    </div>
  );
}

export default CardDetail;
