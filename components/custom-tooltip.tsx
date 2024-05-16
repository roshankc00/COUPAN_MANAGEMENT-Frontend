import React from "react";
import { Separator } from "./ui/separator";
const CustomTooltip = ({ active, payload, tag }: any) => {
  if (!active) return null;
  const month = payload[0].payload.month;
  const count = payload[0].value;
  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="texxt-sm p-2 bg-muted text-muted-foreground">{month}</div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="size-1.5 bg-blue-500 rounded-full" />
          <p className="textx-sm text-muted-foreground">{tag}</p>
          <p className="text-sm text-right font-medium">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;
