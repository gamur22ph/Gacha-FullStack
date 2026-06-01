import { jwtDecode } from 'jwt-decode';

export const isTokenValid = (token: string) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    if (!decoded.exp) return false;

    console.log(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    console.log(decoded.exp > currentTime);
    // If current time is greater than exp time, it's expired
    return decoded.exp > currentTime;
  } catch (error) {
    // If decoding fails, the token is invalid/tampered with
    return false;
  }
};