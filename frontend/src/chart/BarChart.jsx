import React from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const BarChartWrapper = styled.div`
    margin-right: 40px;
`;

function BarChart() {
    const chartData = {
        series: [
            {
                data: [73, 15, 86, 97, 62],
            },
        ],

        xaxis: {
            categories: ["강민희", "박현희", "이다해", "박상민", "이동규"],
        },

        yaxis: {
            max: 100,
            style: {
                fontSize: "30rem",
                fontWeight: 400,
            },
        },

        chart: {
            type: "bar",
            width: "500px",
            height: "350px",
            fontFamily: "Pretendard",
            foreColor: "#000",
            toolbar: {
                show: false,
            },
        },

        title: {
            text: "업무량",
            style: {
                fontFamily: "Pretendard",
                fontSize: "20px",
            },
        },

        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            },
        },

        dataLabels: {
            style: {
                fontsize: "2rem",
            },
        },
    };

    return (
        <BarChartWrapper>
            <ReactApexChart
                series={chartData.series}
                options={chartData}
                type="bar"
                width={chartData.chart.width}
            />
        </BarChartWrapper>
    );
}

export default BarChart;
