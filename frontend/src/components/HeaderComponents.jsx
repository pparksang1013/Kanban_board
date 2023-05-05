import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderBox = styled.header`
    padding: 2.2rem 5rem;
    height: 100vh;
    border-right: 1px solid rgba(0, 0, 0, 0.2);

    .logo {
        font-size: 28px;
        font-weight: 800;
        font-style: italic;
        color: #447ef2;
        font-family: "Poppins";
        margin-bottom: 2rem;
    }

    a {
        display: block;
        margin-bottom: 10px;
        font-family: "Pretendard-SemiBold";
    }
`;

function HeaderComponents() {
    return (
        <HeaderBox font={"Poppins"}>
            <Link to="/">
                <p className="logo">KanBan</p>
            </Link>
            <Link to="/kanbanboard">보드</Link>
            <Link to="/dashboard">대쉬보드</Link>
            <Link to="/calendar">캘린더</Link>
            
        </HeaderBox>
    );
}

export default HeaderComponents;
