import React from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

function DonutChart() {
    const chartData = {
        series: [73, 15, 86, 97, 62],

        labels: ["강민희", "박현희", "이다해", "박상민", "이동규"],

        chart: {
            type: "donut",
            width: "500px",
            fontFamily: "Pretendard",
            foreColor: "#3a7e9f",

            toolbar: {
                show: false,
            },
        },

        // 바 컬러 변경
        // fill: {
        //     colors: [],
        // },

        title: {
            text: "업무량",
            style: {
                fontFamily: "Pretendard",
                fontSize: "20px",
            },
        },

        datalabels: {
            enabled: true,
        },

        plotOptions: {
            pie: {
                customScale: 1,
                size: 100,
                donut: {
                    size: "60%",
                    labels: {
                        show: true,
                    },
                },
            },
        },
    };

    return (
        <ReactApexChart
            series={chartData.series}
            options={chartData}
            type="donut"
            width={chartData.chart.width}
        />
    );
}

export default DonutChart;
