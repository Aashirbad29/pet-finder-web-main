import React from "react";
import Title from "antd/es/typography/Title";
import MyRequestTable from "../home/my-request-table";
import RescueRequestTable from "../home/rescue-request-table";

const Dashboard = () => {
  return (
    <>
      <Title level={4}>My Requests</Title>
      <MyRequestTable />
    </>
  );
};

export default Dashboard;
