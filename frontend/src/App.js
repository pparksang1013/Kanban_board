import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

// COMPONENT
import DashboardRouter from "./router/DashboardRouter";
import CalendarRouter from "./router/CalendarRouter";
import Board from "./pages/kanbanBoard/Board";
import HeaderComponents from "./components/HeaderComponents";

const Wrapper = styled.div`
    display: flex;
`;

function App() {
    return (
        <div className="App">
            <Wrapper>
                <HeaderComponents />
                <Routes>
                    <Route path="/" element={<Board />} />
                    <Route path="/calendar" element={<CalendarRouter />} />
                    <Route path="/dashboard" element={<DashboardRouter />} />
                </Routes>
            </Wrapper>
        </div>
    );
}

export default App;
