import React from "react";
import { Image, Table } from "antd";
import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";

const MyRequestTable = () => {
  const columns = [
    {
      title: "Pet Description",
      key: "pet_description",
      render: (data) => (
        <>
          <p>Pet Id: {data.pet_id._id}</p>
          <p>
            Species / Breed: {data.pet_id.species} - {data.pet_id.breed}
          </p>
          <p>
            Age / Gender: {data.pet_id.age} - {data.pet_id.gender}
          </p>
          <p>Description: {data.pet_id.description}</p>
        </>
      ),
    },
    {
      title: "Photo",
      key: "photo",
      render: (data) => (
        <Image
          width={100}
          height={100}
          preview={true} // Set to false to disable preview
          style={{ objectFit: "contain" }}
          src={`http://localhost:4000/${data.pet_id.photo}`} // Adjust the path to match your server setup
        />
      ),
    },
    { title: "Adoption Status", key: "adoption_status", render: (data) => <p>{data.status ? "Adopted" : "Not Adopted"}</p> },
  ];

  const { data, isLoading } = useQuery("adoptions", () => axiosInstance.get("/adoption/my-requests"), { initialData: [] });

  return (
    <>
      <Table loading={isLoading} bordered columns={columns} dataSource={data?.data?.result ?? []} rowKey={"_id"} />
    </>
  );
};

export default MyRequestTable;
