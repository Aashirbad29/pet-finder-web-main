import React, { useState } from "react";
import PetCard from "./components/pet-card";
import { useQuery } from "react-query";
import { axiosInstance } from "../../utils/axios";
import { Flex, Spin, Tag, Button, Select, Slider } from "antd";

const { Option } = Select;

const Pets = () => {
  const { data, isLoading } = useQuery("pets", () => axiosInstance.get("/pet"), { initialData: [] });

  const [speciesFilter, setSpeciesFilter] = useState("all"); // State to manage species filter
  const [vaccinationFilter, setVaccinationFilter] = useState("all"); // State to manage vaccination filter
  const [adoptionFilter, setAdoptionFilter] = useState("all"); // State to manage adoption filter
  const [ageFilter, setAgeFilter] = useState([0, 20]); // State to manage age filter

  const handleSpeciesFilterChange = (value) => {
    setSpeciesFilter(value); // Update species filter state when filter changes
  };

  const handleVaccinationFilterChange = (value) => {
    setVaccinationFilter(value); // Update vaccination filter state when filter changes
  };

  const handleAdoptionFilterChange = (value) => {
    setAdoptionFilter(value); // Update adoption filter state when filter changes
  };

  const handleAgeFilterChange = (value) => {
    setAgeFilter(value); // Update age filter state when filter changes
  };

  if (isLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  // Filter the pets based on the selected filters
  const filteredPets = data?.data?.result
    .filter((pet) => speciesFilter === "all" || pet.species === speciesFilter)
    .filter(
      (pet) =>
        vaccinationFilter === "all" ||
        (vaccinationFilter === "vaccinated" ? pet.vaccination_status : !pet.vaccination_status)
    )
    .filter((pet) => adoptionFilter === "all" || (adoptionFilter === "adopted" ? pet.is_adopted : !pet.is_adopted))
    .filter((pet) => pet.age >= ageFilter[0] && pet.age <= ageFilter[1]);

  return (
    <div>
      {/* Filter options */}
      <div style={{ marginBottom: 20 }}>
        <Select defaultValue="all" style={{ width: 120, marginRight: 10 }} onChange={handleSpeciesFilterChange}>
          <Option value="all">All Pets</Option>
          <Option value="cat">Cats</Option>
          <Option value="dog">Dogs</Option>
          <Option value="other animals">Other Animals</Option>
        </Select>
        <Select defaultValue="all" style={{ width: 180, marginRight: 10 }} onChange={handleVaccinationFilterChange}>
          <Option value="all">All Vaccination Status</Option>
          <Option value="vaccinated">Vaccinated</Option>
          <Option value="not_vaccinated">Not Vaccinated</Option>
        </Select>
        <Select defaultValue="all" style={{ width: 180, marginRight: 10 }} onChange={handleAdoptionFilterChange}>
          <Option value="all">All Adoption Status</Option>
          <Option value="adopted">Adopted</Option>
          <Option value="not_adopted">Available for Adoption</Option>
        </Select>
        <div style={{ width: 300, display: "inline-block" }}>
          <span>Age: </span>
          <Slider range defaultValue={[0, 20]} max={20} onChange={handleAgeFilterChange} />
        </div>
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
                <p>Name: {data.name}</p>
                <p>Gender: {data.gender}</p>
                <p>Age: {data.age}</p>
                <p>Is Adopted: {data.is_adopted ? <Tag color="red">Adopted</Tag> : <Tag color="green">Available</Tag>}</p>
                <p>
                  Vaccination:{" "}
                  {data.vaccination_status ? <Tag color="green">Vaccinated</Tag> : <Tag color="red">Not Vaccinated</Tag>}
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
