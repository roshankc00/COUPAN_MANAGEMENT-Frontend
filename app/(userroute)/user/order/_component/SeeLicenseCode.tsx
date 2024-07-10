"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  license: any;
};

const SeeLicenseCode: React.FC<Props> = ({ license }) => {
  const [isCoppied, setisCoppied] = useState(false);
  const [open, setopen] = useState(false);
  async function copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setisCoppied(true);
    } catch (err) {
      setisCoppied(false);
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger className=" ">
          <Button variant={"outline"} className="flex  items-center  w-[100px]">
            View License
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div>
            <Card className="border-none">
              <CardContent>
                <h1 className="text-center">Copy Your License Code</h1>
                <div className="flex justify-center gap-2 my-1">
                  <h1 className="border-dashed border-2 border-blue-600 py-2 px-3 rounded-md text-xl">
                    {license?.code}
                  </h1>
                  <button
                    className="bg-[#2563EB]  w-[100px]  rounded-md text-white text-[16px] font-medium"
                    onClick={() => copyToClipboard(license?.code)}
                  >
                    {isCoppied ? "Copied" : "Copy"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SeeLicenseCode;
