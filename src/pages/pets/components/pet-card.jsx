import React from "react";
import { Button, Card, Image, message } from "antd";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../utils/axios";
const { Meta } = Card;

const PetCard = ({ image, title, description, id, isAdopted }) => {
  const mutation = useMutation("adoption", () => axiosInstance.post("/adoption", { pet_id: id }), {
    onSuccess: () => {
      message.success("Adoption request has been sent");
    },
    onError: (error) => {
      if (error.response.status === 401) {
        return message.error("Please login to continue");
      }
      message.error(error.response.data.msg);
    },
  });

  const adoptPet = () => {
    mutation.mutate();
  };

  return (
    <Card
      style={{
        width: 300,
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
      }}
      cover={<Image src={image} height={200} style={{ objectFit: "contain" }} />}
      actions={[
        isAdopted ? (
          <Button type="primary" disabled>
            Pet is already adopted
          </Button>
        ) : (
          <Button type="primary" onClick={adoptPet}>
            Adopt
          </Button>
        ),
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default PetCard;
