import React, { useEffect, useState } from "react";
import axios from "axios";

import * as A from "../../style/test";

// Redux
import { useSelector } from "react-redux";

// Modal Component
import Tag from "./Tag";
import Member from "./Member";
import Modal from "react-modal";
import FileForm from "./FileForm";
import FileAdd from "./FileAdd";
import { filledInputClasses } from "@mui/material";

// STYLE
import icons from "../../style/icons/icons";
import styled from "styled-components";
function CardDetail(propss) {
    const cardId = propss.cardId;

    const { openDetailCard, setOpenDetailCard } = propss;
    const serverIp = useSelector((state) => state.SERVER_IP);
    const admin = useSelector((state) => state.b_admin);
    const userId = useSelector((state) => state.u_id);
    const fileUploadPath = useSelector((state) => state.FILE_UPLOAD_PATH);

    const [selectedFiles, setSelectedFiles] = useState([]);

    // CardDetail 기본값 설정
    const [cardInfo, setCardInfo] = useState({
        memberList: "",
        startDate: "",
        endDate: "",
        totalDate: "",
        dDay: "",
        tagList: "",
        cardDescription: "",
    });
    const [fileList, setFileList] = useState({
        fileId: "",
        fileNameList: "",
    });
    function closeModal() {
        setOpenDetailCard(false);
    }

    useEffect(() => {
        getData();
    }, [setCardInfo]);

    // 날짜, 카드파트너, 태그, 파일 리스트 조회
    // 더미 파일
    async function getData() {
        try {
            const response = await axios.get(serverIp + "detail/" + cardId);
            const responseData = response.data;
            console.log(responseData);
            setCardInfo((prevState) => {
                return {
                    ...prevState,
                    memberList: responseData.cardPartners
                        ? Object.values(responseData.cardPartners).map(
                              (cardPartners) => cardPartners.userTable.u_id
                          )
                        : "",

                    startDate: responseData.c_start_date
                        ? responseData.c_start_date
                        : "",
                    endDate: responseData.c_end_date
                        ? responseData.c_end_date
                        : "",
                    dDay: "D-" + responseData.d_day,
                    totalDate:
                        responseData.c_start_date || responseData.c_end_date
                            ? responseData.c_start_date +
                              " ~ " +
                              responseData.c_end_date
                            : null,
                    tagList: responseData.tags
                        ? Object.values(responseData.tags).map(
                              (tags) => tags.tag_name
                          )
                        : "",
                    cardDescription: responseData.c_description
                        ? responseData.c_description
                        : "",
                };
            });
            setFileList({
                fileId: Object.values(responseData.files).map(
                    (files) => files.file_id
                ),
                fileNameList: Object.values(responseData.files).map(
                    (files) => files.file_original_name
                ),
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    // startDate 값 받아오기
    function handleStartValueChange(event) {
        setCardInfo({ ...cardInfo, startDate: event.target.value });
    }
    // endDate 값 받아오기
    function handleEndValueChange(event) {
        setCardInfo({ ...cardInfo, endDate: event.target.value });
    }
    // textArea 값 받아오기
    function handleChange(e) {
        const content = e.target.value;
        setCardInfo({ ...cardInfo, cardDescription: content });
    }
    // 저장 버튼 동작
    async function saveCard() {
        try {
            await axios.put(serverIp + "card", {
                c_start_date: cardInfo.startDate,
                c_end_date: cardInfo.endDate,
                c_description: cardInfo.cardDescription,
                c_upd_p: userId,
                c_id: cardId,
            });
        } catch (error) {
            console.log(error.message);
        }
        saveFile();
        closeModal();
    }
    // 삭제 버튼 동작
    async function deleteCard() {
        try {
            await axios.delete(serverIp + "card/" + cardId);
        } catch (error) {
            console.log(error.message);
        }
        closeModal();
    }
    // 요청 버튼 동작
    async function changeTask() {
        try {
            await axios.post(serverIp + "/" + cardId);
        } catch (error) {
            console.log(error.message);
        }
    }

    // 여기서부터
    function handleFiles(e) {
        setSelectedFiles([...selectedFiles, ...e.target.files]);
    }
    //  파일 추가한 거 삭제
    function handleRemove(index) {
        const files = [...selectedFiles];
        files.splice(index, 1);
        setSelectedFiles(files);
    }
    //   파일 추가 화면 보여주는 거
    function renderFileList() {
        return selectedFiles.map((file, index) => (
            <div key={index} className="file-item">
                <A.Span className="labelList">{file.name}</A.Span>
                <A.Button type="button" onClick={() => handleRemove(index)}>
                    X
                </A.Button>
            </div>
        ));
    }

    function generateBoundary() {
        let boundary = "--------------------------";
        for (let i = 0; i < 24; i++) {
            boundary += Math.floor(Math.random() * 10).toString(16);
        }
        return boundary;
    }
    // 파일 저장 funi carddetail 창에서 저장 버튼 클릭시 cardInfo 저장 후 saveFile() 호출
    function saveFile() {
        const formData = new FormData();

        formData.boundary = generateBoundary();
        selectedFiles.forEach((file) => {
            formData.append("files", file);
            formData.append("c_id", cardId);
        });

        const headers = {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
        };

        axios
            .post(fileUploadPath, formData, headers)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        closeModal();
    }
    //   여기까지
    return (
        <div>
            <Modal
                isOpen={openDetailCard}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                    content: {
                        width: "46%",
                        minWidth: "46%",
                        height: "50%",
                        margin: "auto",
                    },
                }}
            >
                <A.Div className="modal_box">
                    <A.Button onClick={closeModal} className="btn_close">
                        X
                    </A.Button>
                    <A.Div className="modal_top">
                        <h1>CardDetail2 </h1>
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
                    <A.Div className="modal_middle">
                        <Member memList={cardInfo.memberList} cardId={cardId} />
                        <Tag tagList={cardInfo.tagList} cardId={cardId} />

                        {/* <FileAdd fileLists/> */}
                        <label
                            htmlFor="file-upload"
                            className="custom-file-upload"
                        >
                            <i className="fa fa-cloud-upload"></i> FileAdd
                        </label>
                        <input
                            id="file-upload"
                            className="fileButton"
                            type="file"
                            name="profile_files"
                            multiple
                            onChange={handleFiles}
                        />
                        <A.Div className="fileListTable">
                            <A.Div className="cardWrap">
                                <A.Div className="filebuttons"> File </A.Div>
                            </A.Div>
                            <A.Div className="fileTable">
                                {/* {fileList.fileId &&
                  Object.values(fileList.fileNameList).map((file, index) => (
                    <ul>
                      <li key={index}>
                        <FileForm
                          props1={file}
                          props2={fileList.fileId[index]}
                        />
                      </li>
                    </ul>
                  ))} */}
                                <div>{renderFileList()}</div>
                                {fileList.fileId &&
                                    Object.values(fileList.fileNameList).map(
                                        (file, index) => (
                                            <ul>
                                                <li
                                                    key={fileList.fileId[index]}
                                                >
                                                    <FileForm
                                                        props1={file}
                                                        props2={
                                                            fileList.fileId[
                                                                index
                                                            ]
                                                        }
                                                    />
                                                </li>
                                            </ul>
                                        )
                                    )}
                            </A.Div>
                        </A.Div>
                        <A.Div className="des">
                            <A.Div className="cardWrap2">
                                <A.Div className="classDes">
                                    {" "}
                                    Description{" "}
                                </A.Div>
                            </A.Div>
                            <A.Textarea
                                defaultValue={cardInfo.cardDescription}
                                onInput={handleChange}
                            ></A.Textarea>
                        </A.Div>
                    </A.Div>
                    {/* </A.Div> */}
                    {/* <A.Div className="modal_bottom"> */}
                    <A.Input
                        type="button"
                        onClick={saveCard}
                        value="저장"
                    ></A.Input>
                    {/* {!admin && (
            <A.Input type="button" onClick={changeTask} value="요청"></A.Input>
          )} */}
                    {!admin && (
                        <A.Input
                            type="button"
                            onClick={deleteCard}
                            value="삭제"
                        ></A.Input>
                    )}
                </A.Div>
            </Modal>
        </div>
    );
}

export default CardDetail;
