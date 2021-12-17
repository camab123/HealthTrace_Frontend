import { Pie } from 'react-chartjs-2';
import React, {Component} from "react";
function PieChart(props) {
    const graphdata = {
        labels: [ ...props.labels
            ],
        datasets: [
            {
            label: props.description,
            data: [ ...props.data
            ],
            backgroundColor: [
                "#408697",
                "#70a0ad",
                "#9bbac3",
                "#c6d5da",
                "#f1f1f1",
                "#d1eaf2",
                "#afe4f2",
                "#88ddf3",
                "#52d6f4"
              ],
              borderColor: [         
                "#408697",
                "#70a0ad",
                "#9bbac3",
                "#c6d5da",
                "#f1f1f1",
                "#d1eaf2",
                "#afe4f2",
                "#88ddf3",
                "#52d6f4"
              ],
            }
        ]
        
    }
    const options = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend:{
            display:true,
            position:'bottom',
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 10
                },
                boxWidth: 20
            },
          },
        title:{
            display:true,
            text: props.title,
            fontSize:30
          },
        },
    };
    return (
        <Pie data={graphdata} options={options} />
    )
}
export default PieChart;