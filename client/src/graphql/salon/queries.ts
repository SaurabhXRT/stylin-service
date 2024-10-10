import { gql } from '@apollo/client';

export const GET_OWNER_SALONS = gql`
  query getOwnerSalons{
    getOwnerSalons{
      id
      name
      placename
      longitude
      latitude
      ownerId
    }
  }
`;

export const GET_ALL_SALONS = gql`
query getAllSalons { 
  getAllSalons {
    id
    name
    placename
    longitude
    latitude
  }
}

`


export const GET_SALON_STAFFS = gql`
  query getSalonStaffs($salonId: ID!) {
    getSalonStaffs(salonId: $salonId) {
      id
      name
      email
      contactNumber
      address
      role
      department
      jobTitle
      expertise
      dateOfJoining
      workHours
      shift
      status
      salonId
    }
  }
`;
