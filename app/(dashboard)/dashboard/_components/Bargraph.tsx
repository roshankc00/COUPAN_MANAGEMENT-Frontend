"use client";
import React from "react";
import ReactEcharts from "echarts-for-react";

interface BarChartData {
  month: string;
  count: number;
}

interface BarChartProps {
  data: BarChartData[];
  title: string;
}

const BarGraph = ({ data, title }: BarChartProps) => {
  const getOption = () => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: data.map((item: BarChartData) => item.month),
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data.map((item: BarChartData) => item.count),
          type: "bar",
        },
      ],
    };
  };

  return (
    <div className="border border-b-white rounded-sm">
      <h1 className="text-xl  p-2 text-center mt-2 mb-[-10px]">
        {title} Bargraph
      </h1>
      <ReactEcharts
        option={getOption()}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};

export default BarGraph;
