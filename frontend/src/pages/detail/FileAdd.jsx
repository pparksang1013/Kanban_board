import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";
import * as A from "../../style/test";
import "../../style/buttonCss.css";
import FileForm from "./FileForm";

function FileAdd() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const fileUploadPath = useSelector((state) => state.FILE_UPLOAD_PATH);
    const userID = useSelector((state) => state.u_id);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setSelectedFiles([]);
    }

    function handleFiles(e) {
        setSelectedFiles([...selectedFiles, ...e.target.files]);
    }

    function handleRemove(index) {
        const files = [...selectedFiles];
        files.splice(index, 1);
        setSelectedFiles(files);
    }

    function renderFileList() {
        return selectedFiles.map((file, index) => (
            <div key={index} className="file-item">
                <span>{file.name}</span>
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
    function saveFile() {
        const formData = new FormData();

        formData.boundary = generateBoundary();
        selectedFiles.forEach((file) => {
            formData.append("file", file);
            formData.append("c_id", 17);
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

    return (
        <div>
            <A.Button onClick={openModal} className="plus fplus">
                <A.Div className="cardWrap">
                    <A.Div className="filebuttons"> File </A.Div>
                    <A.Div className="cardValue"></A.Div>
                </A.Div>
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
                        width: "330px",
                        height: "auto",
                        margin: "auto",
                        minHeight: "50px",
                        maxHeight: "200px",
                    },
                }}
            >
                <A.Div className="modal_box">
                    <A.Div className="modal_top">
                        <A.Button onClick={closeModal} className="btn_close">
                            {" "}
                            X{" "}
                        </A.Button>
                        {/* <A.Modal_Title>FileAdd</A.Modal_Title> */}
                        <div></div>
                        <label
                            htmlFor="file-upload"
                            className="custom-file-upload"
                        >
                            <i className="fa fa-cloud-upload">test</i> FileAdd
                        </label>
                        <input
                            id="file-upload"
                            className="fileButton"
                            type="file"
                            name="profile_files"
                            multiple
                            onChange={handleFiles}
                        />
                        <A.Modal_Title></A.Modal_Title>
                    </A.Div>

                    <A.Div className="modal_middle">
                        <div>{renderFileList()}</div>
                    </A.Div>
                    <A.Div className="modal_bottom">
                        <A.Input
                            type="button"
                            onClick={saveFile}
                            value="저장"
                        ></A.Input>
                    </A.Div>
                </A.Div>
            </Modal>
        </div>
    );
}

export default FileAdd;
