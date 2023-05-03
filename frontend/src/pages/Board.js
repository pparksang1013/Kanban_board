import { useState } from "react";
import Modal from "react-modal";
import CardDetail from "../modalList/CardDetail";

// 카드 제목 가져오기
function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    );
}

// 메인인 테스크와 카드들을 보여주는 부분.
function Board() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className="Board">
            <div className="Tesk">
                <Header title="TO DO"></Header>
                <CardDetail />
            </div>
            <div className="Tesk">
                <Header title="DOING"></Header>
                <CardDetail />
            </div>
            <div className="Tesk">
                <Header title="TEST"></Header>
                <CardDetail />
            </div>
            <div className="Tesk">
                <Header title="DONE"></Header>
                <CardDetail />
            </div>
            <div className="Tesk">
                <Header title="ETC"></Header>
                <CardDetail />
            </div>
        </div>
    );
}

export default Board;
