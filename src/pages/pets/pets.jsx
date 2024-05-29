import React, { useState } from "react";
import PetCard from "./components/pet-card";
import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";
import { Flex, Spin, Tag, Button } from "antd";

const Pets = () => {
  const { data, isLoading } = useQuery("pets", () => axiosInstance.get("/pet"), { initialData: [] });

  const [filter, setFilter] = useState("all"); // State to manage filtering

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter); // Update filter state when filter changes
  };

  if (isLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  // Filter the pets based on the selected filter
  const filteredPets = filter === "all" ? data?.data?.result : data?.data?.result.filter((pet) => pet.species === filter);

  return (
    <div>
      {/* Filter buttons */}
      <div style={{ marginBottom: 20 }}>
        <Button onClick={() => handleFilterChange("all")}>All Pets</Button>
        <Button onClick={() => handleFilterChange("cat")}>Cats</Button>
        <Button onClick={() => handleFilterChange("dog")}>Dogs</Button>
      </div>

      {/* Display filtered pets */}
      <Flex wrap gap={50} justify="center">
        {filteredPets?.map((data) => (
          <PetCard
            key={data._id}
            id={data._id}
            title={`${data.species} ${data.breed}`}
            description={
              <div>
                <p>Gender: {data.gender}</p>
                <p>Age: {data.age}</p>
                <p>Is Adopted: {data.is_adopted ? <Tag color="red">Adopted</Tag> : <Tag color="green">Available</Tag>}</p>
                <p>
                  Vaccination:{" "}
                  {data.vaccination_status ? <Tag color="red">Not Vaccinated</Tag> : <Tag color="green">Vaccinated</Tag>}
                </p>
              </div>
            }
            image={data.photo}
          />
        ))}
      </Flex>
    </div>
  );
};

export default Pets;
