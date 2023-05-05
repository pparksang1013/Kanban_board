import React from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

function RangeBarChart() {
    const chartData = {
        series: [
            {
                data: [
                    {
                        x: "Analysis",
                        y: [
                            new Date("2023-02-27").getTime(),
                            new Date("2023-03-04").getTime(),
                        ],
                        fillColor: "#008FFB",
                    },
                    {
                        x: "Coding",
                        y: [
                            new Date("2023-03-07").getTime(),
                            new Date("2023-03-10").getTime(),
                        ],
                        fillColor: "#775DD0",
                    },
                    {
                        x: "Testing",
                        y: [
                            new Date("2023-03-08").getTime(),
                            new Date("2023-03-12").getTime(),
                        ],
                        fillColor: "#FEB019",
                    },
                ],
            },
        ],

        chart: {
            type: "rangeBar",
            width: "1000px",
            height: "350px",
            fontFamily: "Pretendard",
            foreColor: "#000",
            toolbar: {
                show: false,
            },
        },

        title: {
            text: "간트차트",
            style: {
                fontFamily: "Pretendard",
                fontSize: "20px",
            },
        },

        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                dataLabels: {
                    hideOverflowingLabels: false,
                },
            },
        },

        xaxis: {
            type: "datetime",
        },

        yaxis: {
            show: false,
        },

        datalabels: {
            enabled: true,
        },

        grid: {
            row: {
                colors: ["#f3f4f5", "#fff"],
                opacity: 0.2,
            },
        },
    };

    return (
        <ReactApexChart
            series={chartData.series}
            options={chartData}
            type="rangeBar"
            width={chartData.chart.width}
        />
    );
}

export default RangeBarChart;
