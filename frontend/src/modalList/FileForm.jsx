import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Prism from "prismjs";
import "prism-themes/themes/prism-vs.css"
// import "prism-themes/themes/prism-hopscotch.css"
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";

Prism.highlightAll();
function FileForm() {
  const [codeTxt, setCodeTxt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    axios
      .get("/fileList/test.txt")
      .then(function (response) {
        // const lines = response.data.split("\n");
        setCodeTxt(response.data);
        console.log(response.data);
        
      })
      .catch(function (error) {
        console.log(error.message);
      })
  }, []);
  useEffect(() => {
    Prism.highlightAll();
  }, [codeTxt]);
  return (
    <div>
      <button onClick={openModal}> 상세</button>
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
        <pre className="language-javascript">
          <code className="language-javascript">{codeTxt}</code>
        </pre>
      </Modal>
    </div>
  );
}


export default FileForm;
