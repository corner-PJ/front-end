import React from "react";
import Chart from "react-apexcharts";

const data = [
    { age: '청소년-남', number: 35 },
    { age: '청소년-여', number: 29 },
    { age: '청년-남', number: 62 },
    { age: '청년-여', number: 130 },
    { age: '중/장년-남', number: 93.3 },
    { age: '중/장년-여', number: 41 },
    { age: '노인-남', number: 25 },
    { age: '노인-여', number: 17 },
];

const options = {
    chart: {
        type: "bar",
        toolbar: { show: false },
        stacked: true,
    },
    plotOptions: {
        bar: {
            horizontal: true,
            columnWidth: '55%',
            endingShape: 'rounded',
            barHeight: "20", 
            colors: {
                backgroundBarColors: ["#E4EAF0"],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 9,
            },
        },
    },
    dataLabels: { // 바 내부 색상 표시
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: data.map(item => item.age),
        labels: {
            formatter: function (val) {
                return val;
            },
            style: {
                fontFamily: "Pretendard",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "20px",
                textAlign: "right",
                color: "#888888",
            },
        },
        axisTicks: { show: false },
        axisBorder: { show: false },
    },
    yaxis: {
        show: false
    },
    grid: {
        show: false
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
            return val 
        }
        }
    },

}

const series = [{
	// 차트의 데이터를 담당할 객체. 이름과 시각화할 데이터를 할당.
    name: 'number',
    data: data.map(item => item.number)
}]



export function VoiceChart() {

    return(
        <>
            <Chart options={options} series={series} />
        </>
        
    );
}