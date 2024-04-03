import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCT = gql`
    query {
        product {
            id title image price
        }
    }
`;

const Data = () => {
  const { loading, error, data } = useQuery(GET_PRODUCT);

  if (loading) {
    return <h2>Loading.....</h2>;
  }

  return (
    <div>
      {data.product.map(({ id, title, image, price }) => {
        return (
          <div key={id}>
            <img width={70} src={image} alt="" />
            <p>{title}</p>
            <small>{price}</small>
          </div>
        );
      })}
    </div>
  );
};

export default Data;
