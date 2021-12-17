import { Bar } from "react-chartjs-2";
import React, {Component} from "react";
function HorizontalBarChart(props) {
    const graphdata = {
        labels: [ ...props.labels
            ],
        datasets: [
            {
            label: props.description,
            data: [ ...props.data
            ],
            maxBarThickness: 60,
            fill: true,
            backgroundColor: "#408697",
            borderColor: "#408697",
            }
        ]
    }
    const options = {
        indexAxis: 'y',
        scales: {
            xAxes:
                {
                ticks: {
                    callback: function(data) {
                        if (data > 999999)
                        return data/1000000+'M';
                        if (data > 1000)
                        return data/1000+'K'
                    }
                },
                grid:{
                    display:false
                    }
                
                },
            y: {
                grid:{
                display:false
                }
            },
            
            },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: 'bottom',
        },
        title:{
            display:true,
            text: props.title,
            fontSize:30
          },
        },
    };
    const minHeightAmount = 40 * props.labels.length;
    return (
        <Bar data={graphdata} options={options} style={{minHeight: minHeightAmount}}/>
    )
}
export default HorizontalBarChart;