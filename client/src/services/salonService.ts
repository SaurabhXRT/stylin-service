import { client } from '../apollo/client'; 
import {GET_OWNER_SALONS, GET_SALON_STAFFS, GET_ALL_SALONS } from '../graphql/salon/queries';
import { CREATE_SALON, CREATE_STAFF } from '../graphql/salon/mutations';

interface CreateSalonInput {
  name: string;
  placename: string;
  longitude: number;
  latitude: number;
}


interface CreateStaffInput {
  name: string;
  email: string;
  contactNumber: string;
  address?: string;
  role: string;
  department?: string;
  jobTitle: string;
  expertise?: string;
  workHours?: string;
  shift?: string;
  profileImage?: string;
  status: string;
}

export const getOwnerSalons = async () => {
  const response = await client.query({
    query: GET_OWNER_SALONS,
  });
  console.log(response);
  return response.data.getOwnerSalons;
};

export const getAllSalons = async () => {
  const response = await client.query({
    query:  GET_ALL_SALONS,
  });
  
  return response.data.getAllSalons;
};

export const getSalonStaffs = async (salonId: string) => {
  const response = await client.query({
    query: GET_SALON_STAFFS,
    variables: { salonId },
  });
  return response.data.getSalonStaffs;
};

export const createSalon = async (input: CreateSalonInput) => {
  const response = await client.mutate({
    mutation: CREATE_SALON,
    variables: input,
  });
  return response.data.createSalon;
};


export const createStaff = async (input: CreateStaffInput) => {
  const response = await client.mutate({
    mutation: CREATE_STAFF,
    variables: input,
  });
  return response.data.createStaff;
};
