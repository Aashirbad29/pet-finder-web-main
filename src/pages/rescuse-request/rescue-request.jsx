import React from "react";
import RescueRequestTable from "../home/rescue-request-table";
import Title from "antd/es/typography/Title";

const RescueRequest = () => {
  return (
    <>
      <Title level={4} style={{ marginTop: 24 }}>
        Rescue Requests
      </Title>
      <RescueRequestTable />
    </>
  );
};

export default RescueRequest;
