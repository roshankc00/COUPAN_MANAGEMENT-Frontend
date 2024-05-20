import CustomTooltip from "@/components/custom-tooltip";
import React from "react";
import {
  Tooltip,
  XAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ChartData {
  month: string;
  count: number;
}
type Props = {
  data: ChartData[];
  tag: string;
};

const AreaVariant = ({ data, tag }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350} className="z-0">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="2,2" />
        <defs>
          <linearGradient id="count" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#3d82f6" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#3d82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="month"
          tickFormatter={(value) => value}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip tag={tag} />} />
        <Area
          type="monotone"
          dataKey="count"
          stackId="count"
          strokeWidth={2}
          stroke="#3d82f6"
          fill="url(#count)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaVariant;
