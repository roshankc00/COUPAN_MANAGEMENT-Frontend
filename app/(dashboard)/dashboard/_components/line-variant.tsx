import React from "react";
import CustomTooltip from "@/components/custom-tooltip";
import {
  Tooltip,
  XAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Line,
  LineChart,
} from "recharts";
interface ChartData {
  month: string;
  count: number;
}
type Props = {
  data: ChartData[];
  tag: string;
};
const LineVariant = ({ data, tag }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350} className="z-0">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="2,2" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="month"
          tickFormatter={(value) => value}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip tag={tag} />} />
        <Line
          dot={false}
          dataKey="count"
          strokeWidth={2}
          stroke="#3d82f6"
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineVariant;
