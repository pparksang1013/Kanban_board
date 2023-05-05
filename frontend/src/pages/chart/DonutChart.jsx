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
            width: "420px",
            fontFamily: "Pretendard",
            foreColor: "#000",
            toolbar: {
                show: false,
            },
        },

        title: {
            text: "TO DO",
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
                size: 200,
                donut: {
                    size: "40%",
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
