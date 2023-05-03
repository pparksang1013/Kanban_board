import styled from "styled-components";

// CHART
import BarChart from "../pages/chart/BarChart";
import DonutChart from "../pages/chart/DonutChart";
import RangeBarChart from "../pages/chart/RangeBarChart";

const Dashboard_Wrapper = styled.section`
    padding: 2.2rem 5rem;
    display: gird;
    grid-area: main;
    flex-wrap: wrap;
`;

function DashboardRouter() {
    return (
        <Dashboard_Wrapper>
            <BarChart />
            <DonutChart />
            <RangeBarChart />
        </Dashboard_Wrapper>
    );
}

export default DashboardRouter;
