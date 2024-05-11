import React from "react";
import ReactEcharts from "echarts-for-react";

interface LineChartData {
  month: string;
  count: number;
}

interface LineChartProps {
  data: LineChartData[];
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const getOption = () => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.month),
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
          name: "Data",
          type: "line",
          data: data.map((item) => item.count),
          smooth: true, // Smooth out the line
        },
      ],
    };
  };

  return (
    <div className="border border-b-white rounded-sm">
      <h1 className="text-xl  p-2 text-center mt-2 mb-[-10px]">
        {title} LineChart
      </h1>
      <ReactEcharts
        option={getOption()}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};

export default LineChart;
