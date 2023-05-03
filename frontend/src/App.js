import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

// COMPONENT
import Dashboard from "./router/Dashboard";
import HeaderComponents from "./components/HeaderComponents";
import CalendarRouter from "./router/CalendarRouter";
import Board from "./pages/Board";

// FIXME: 다해님 컴포넌트 구조 변경
// 다해 컴포넌트
import Header from "./pages/Header";
import NavUpbar from "./pages/NavUpbar";
import NavSidebar from "./pages/NavSidebar";

const Wrapper = styled.div`
    display: flex;
`;

function App() {
    return (
        <div className="App">
            {/* <Header />
            <NavUpbar />
            <NavSidebar /> */}
            <HeaderComponents />
            <Wrapper>
                <Routes>
                    <Route path="/" element={<Board />} />
                    <Route path="/calendar" element={<CalendarRouter />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/kanbanboard" element={<Board />} />
                </Routes>
            </Wrapper>
        </div>
    );
}

export default App;
