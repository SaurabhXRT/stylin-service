import { gql } from '@apollo/client';

export const CREATE_SALON = gql`
  mutation createSalon(
    $name: String!
    $placename: String!
    $longitude: Float!
    $latitude: Float!
  ) {
    createSalon(
      name: $name
      placename: $placename
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      name
      placename
      longitude
      latitude
      ownerId
    }
  }
`;

export const CREATE_STAFF = gql`
  mutation createStaff(
    $name: String!
    $email: String!
    $contactNumber: String!
    $address: String
    $role: String!
    $department: String
    $jobTitle: String!
    $expertise: String
    $workHours: String
    $shift: String
    $profileImage: String
    $status: String
  ) {
    createStaff(
      name: $name
      email: $email
      contactNumber: $contactNumber
      address: $address
      role: $role
      department: $department
      jobTitle: $jobTitle
      expertise: $expertise
      workHours: $workHours
      shift: $shift
      profileImage: $profileImage
      status: $status
    ) {
      id
      name
      email
      contactNumber
      address
      role
      department
      jobTitle
      expertise
      workHours
      shift
      profileImage
      status
      salonId
    }
  }
`;
