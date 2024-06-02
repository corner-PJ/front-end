import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "@emotion/styled";

const data = [
    { name: '별이', number: 123 },
    { name: '설이', number: 97 },
    { name: '몽이', number: 94 },
    { name: '보리', number: 80 },
    { name: '콩이', number: 61 },
    { name: '까미', number: 41 },
    { name: '토리', number: 26 },
    { name: '사랑이', number: 17 },
];

const series = [{
	// 차트의 데이터를 담당할 객체. 이름과 시각화할 데이터를 할당.
    name: 'number',
    data: data.map(item => item.number)
}]

const categories = data.map(item => item.name);
console.log("Categories:", categories);

const options = {
    chart: {
        type: 'bar',
        toolbar: { show: false },
        stacked: true,
        height: 350,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            distributed: true,
            columnWidth: '50%',
            endingShape: 'rounded',
            barHeight: "20", 
            colors: {
                backgroundBarColors: ["#E4EAF0"],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 9,
            },
        },
    },
    dataLabels: { // 바 내부 수치 표시
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: categories,
        position: 'bottom',
        labels: {
            rotate: 0, 
            formatter: function (val) {
                return val;
            },
            style: {
                fontFamily: "Pretendard",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "20px",
                textAlign: "center",
                color: "#888888",
            },
        },
        axisTicks: { show: false },
        axisBorder: { show: false },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                }
            }
        }
    },
    yaxis: {
        title: {
            text: undefined,
        },
        max: 170,
    },
    grid: {
        show: false
    },
    fill: {
        opacity: 1,
        colors: ["#FF715B", "#34D1BF", "#0496FF", "#DE0D92", "#6665DD", "#04E762", "#ED0423", "#FF715B"]
    },
    tooltip: {
        y: {
            formatter: function (val) {
            return val 
        }
        }
    },

}




export function NameChart() {
    console.log("Options:", options);
    console.log("Series:", series);

    return(
        <ChartWrapper>
            <ReactApexChart 
                options={options} 
                series={series}  
                height="400" 
                width="1000"
            />
        </ChartWrapper>
        
    );
}

const ChartWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;