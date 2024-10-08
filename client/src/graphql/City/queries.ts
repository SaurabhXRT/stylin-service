import { gql } from "@apollo/client";

export const GET_CITY_DETAIL = gql`
  query getCitydetail($cityname: String!) {
    getCitydetail(cityname: $cityname) {
      id
      cityname
      latitude
      longitude
    }
  }
`;
