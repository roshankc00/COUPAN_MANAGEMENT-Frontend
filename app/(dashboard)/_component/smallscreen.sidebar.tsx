import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
type Props = {};

const MobileSideBar = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 hover:opacity-75 transition">
        <Menu size={50} color="white" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
