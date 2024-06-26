"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor: React.FC<EditorProps> = ({ onChange, value }) => {
  const ReqctQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
