import { useAuth } from "../contexts/AuthContext";
import { isTokenValid } from "./TokenValidatorUtils";

export const authFetch = async (url : string, options : RequestInit) => {
  const {token, handleLogout} = useAuth();

  // 1. Kick out user if token expired on the frontend
  if (token && !isTokenValid(token)) {
    handleLogout();
    throw new Error('Token expired');
  }

  // 2. Inject Headers
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  // 3. Make Request
  const response = await fetch(url, options);

  // 4. Kick out user if backend rejects token (401 Unauthorized)
  if (response.status === 401) {
    handleLogout();
    throw new Error('Unauthorized session expired');
  }

  return response;
};