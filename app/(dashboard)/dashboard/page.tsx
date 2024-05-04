import { NextPage } from "next";
import React from "react";
import UpperHeader from "./_components/UpperHeader";

type Props = {};

const DashboardPage: NextPage = (props: Props) => {
  return (
    <div>
      <UpperHeader />
    </div>
  );
};

export default DashboardPage;
