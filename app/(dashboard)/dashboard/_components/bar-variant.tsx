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
} from "recharts";
interface ChartData {
  month: string;
  count: number;
}
type Props = {
  data: ChartData[];
  tag: string;
};
const BarVariant = ({ data, tag }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350} className="z-0">
      <BarChart data={data}>
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
        <Bar dataKey="count" fill="#3d82f6" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarVariant;
