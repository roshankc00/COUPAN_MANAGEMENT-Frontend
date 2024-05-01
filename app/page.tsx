import { Button } from "@/components/ui/button";
import useUserStore from "@/store";
import { Sidebar } from "lucide-react";
import Image from "next/image";
import MobileSideBar from "./(dashboard)/_component/smallscreen.sidebar";

export default function Home() {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <h1>
        <MobileSideBar />
      </h1>
    </div>
  );
}
