import { Routes, Route } from "react-router-dom";
import styled from "styled-components";



// COMPONENT
import Dashboard from "./router/Dashboard";
import CalendarRouter from "./router/CalendarRouter";
import Board from "./pages/Board";




const Wrapper = styled.div`
display:flex
`;

function App() {

  // useEffect(() => {
  //   async function fetchdata() {
  //     const { data } = await axios.get('/users');
  //     console.log(data);
  //   }
  //   fetchdata();
  // }, []);


  return (
    <div className="App">
      <Wrapper>
        <Routes >
          <Route path="/" element={<Board />}/>
          <Route path="/calendar" element={<CalendarRouter />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kanbanboard" element={<Board />} />
        </Routes>
      </Wrapper>
</div>
  );
}

export default App;
