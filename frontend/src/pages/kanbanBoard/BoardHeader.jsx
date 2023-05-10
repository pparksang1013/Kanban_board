import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function BoardHeader() {
    const [boardList, setBoardList] = useState([]);
    const [userId, setUserId] = useState("userId1");

    // // 데이터 받기
    // useEffect(() => {
    //     let completed = false;
    //     const getBoard = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:9080/board/${userId}`
    //             );
    //             if (!completed) {
    //                 setBoardList(response.data);
    //                 console.log(boardList);
    //             }
    //         } catch (e) {
    //             console.log(e);
    //             alert("Error데이터를 불러올 수 없습니다");
    //         }
    //     };
    //     getBoard();
    //     return () => {
    //         completed = true;
    //     };
    // }, []);
    return (
        <KanbanBoardHeaderWrapper>
            <h1>PROJECT</h1>
        </KanbanBoardHeaderWrapper>
    );
}

// 데이터 받아서 표시할 노드
// (
//     <div>
//         <div className="BoardHeader">
//             <h1></h1>
//             <p> b_admin: {boardList.b_admin}</p>
//             <p> b_create_date: {boardList.b_create_date}</p>
//             <p> b_creator: {boardList.b_creator}</p>
//             <p> b_goal: {boardList.b_goal}</p>
//             <p> b_upd_date: {boardList.b_upd_date}</p>
//         </div>
//     </div>
// );

export default BoardHeader;

const KanbanBoardHeaderWrapper = styled.div`
    margin-bottom: 20px;

    h1 {
        font-size: 3rem;
        color: ${({ theme }) => theme.color.black};
    }
`;
