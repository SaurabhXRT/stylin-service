import { client } from "../apollo/client";
import { GET_CITY_DETAIL } from "../graphql/City/queries";

export const getCityDetail = async (cityname: string) => {
  const response = await client.query({
    query: GET_CITY_DETAIL,
    variables: { cityname },
  });
  return response.data.getCitydetail;
};
