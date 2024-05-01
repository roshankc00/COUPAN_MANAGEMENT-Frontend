import { Button } from "@/components/ui/button";
import useUserStore from "@/store";
import Image from "next/image";

export default function Home() {
  const { user, isLoggedInStatus } = useUserStore((state) => state);
  return <div className="h-[100vh] flex justify-center items-center"></div>;
}
