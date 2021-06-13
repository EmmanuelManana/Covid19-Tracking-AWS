import React, { useEffect, useState } from "react";
import "../styles/LineGraph.css";
import { Line } from "react-chartjs-2";
import { buildChartData } from "../utils/utils";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const LineGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
    const getGraphData = async () =>
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(buildChartData(data));
        });

    getGraphData();
  }, []);

  console.log("data to plot:", data);

  return (
    <div className="lineGraph">
      <Line
        style={{ height: "100%" }}
        data={{
          datasets: [{ data: data }],
        }}
        //   options
      />
    </div>
  );
};

export default LineGraph;
