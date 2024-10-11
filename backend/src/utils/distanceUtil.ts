/**
 * Utility function to calculate the distance between two geo-coordinates.
 * Uses the Haversine formula to calculate the distance between two points
 * on the Earth specified by latitude/longitude.
 *
 * @param lat1 - Latitude of the first point
 * @param lon1 - Longitude of the first point
 * @param lat2 - Latitude of the second point
 * @param lon2 - Longitude of the second point
 * @returns distance in kilometers
 */

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRadians = (degree: number) => (degree * Math.PI) / 180;
    
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  
  /**
   * Utility function to check if a given distance is within a specified radius.
   *
   * @param distance - The calculated distance between two points
   * @param maxRadius - The allowed radius (in kilometers)
   * @returns boolean indicating whether the distance is within the allowed radius
   */
  export const isWithinRadius = (distance: number, maxRadius: number = 50): boolean => {
    return distance <= maxRadius;
  };
  