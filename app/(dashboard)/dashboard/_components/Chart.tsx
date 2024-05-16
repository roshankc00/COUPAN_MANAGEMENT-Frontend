import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { AreaChart, BarChart, FileSearch, LineChart } from "lucide-react";
import React, { useState } from "react";
import AreaVariant from "./AreaVariant";
import BarVariant from "./bar-variant";
import LineVariant from "./line-variant";

interface ChartData {
  month: string;
  count: number;
}
type Props = {
  data: ChartData[];
  title: string;
  tag: string;
};

const Chart = ({ data = [], title, tag }: Props) => {
  const [chartType, setchartType] = useState("area");
  const handleTypeChange = (type: string) => {
    setchartType(type);
  };
  return (
    <Card className="border-none shadow-sm drop-shadow-sm z-0">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
        <Select defaultValue={chartType} onValueChange={handleTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center gap-2">
                <AreaChart className="size-4 shrink-0" />
                <p className="line-clamp-1">Area Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center gap-2">
                <LineChart className="size-4 shrink-0" />
                <p className="line-clamp-1">Line Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center gap-2">
                <BarChart className="size-4 shrink-0" />
                <p className="line-clamp-1"> Bar Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === "area" && (
              <AreaVariant data={data} tag={tag}></AreaVariant>
            )}
            {chartType === "bar" && <BarVariant data={data} tag={tag} />}
            {chartType === "line" && <LineVariant data={data} tag={tag} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
