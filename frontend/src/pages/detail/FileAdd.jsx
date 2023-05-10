import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

import * as A from "../../style/test";
import "../../style/buttonCss.css";

function FileAdd() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  function saveFile() {
    console.log(selectedFiles);
    axios
      .post("/upload")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <A.Button onClick={openModal} className="plus">+File</A.Button>
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
            minHeight : "50px",
            maxHeight: "200px"
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
            <label htmlFor="file-upload" className="custom-file-upload">
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
            <A.Modal_Title></A.Modal_Title>
          </A.Div>

          <A.Div className="modal_middle">
            <div>{renderFileList()}</div>
          </A.Div>
          <A.Div className="modal_bottom">
          <A.Input type="button" onClick={saveFile} value="저장"></A.Input>
        </A.Div>
        </A.Div>
        
      </Modal>
    </div>
  );
}

export default FileAdd;
