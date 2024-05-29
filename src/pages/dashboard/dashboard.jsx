import React from "react";
import Title from "antd/es/typography/Title";
import MyRequestTable from "../home/my-request-table";
import RescueRequestTable from "../home/rescue-request-table";

const Dashboard = () => {
  return (
    <>
      <Title level={4}>My Requests</Title>
      <MyRequestTable />
      <Title level={4} style={{ marginTop: 24 }}>
        Rescue Requests
      </Title>
      <RescueRequestTable />
    </>
  );
};

export default Dashboard;
