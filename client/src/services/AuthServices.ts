import { ENV } from "../helpers/EnvUtils"


const API_AUTH_URL = `${ENV.API_URL}/api/auth`;
const API_USERS_URL = `${ENV.API_URL}/api/users`;

export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return await response.json();
};

export const loginUser = async (userData: any) => {
  const response = await fetch(`${API_AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return await response.json(); // Usually returns a Token or User object
};

export const loginGuestUser = async () => {
  const guest_token = localStorage.getItem('guest_token');

  const response = await fetch(`${API_USERS_URL}/guest-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token : guest_token}),
  });

  if (!response.ok) {
    const error = await response.json();

    localStorage.removeItem('guest_token');
    throw new Error(error.message || 'Login failed');
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem('guest_token', data.token);
  }

  return data; // Usually returns a Token or User object
};

export const requestResetPassword = async (userData: any) => {
  const response = await fetch(`${API_USERS_URL}/request-resetpassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Reset Password failed');
  }

  return await response.json(); // Usually returns a Token or User object
};

export const changePassword = async(formData: any, token : string) => {
  const response = await fetch(`${API_USERS_URL}/finalize-resetpassword`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      "password" : formData.password
    })
  });

  return await response.json();
}

export const verifyUserEmail = async (token: string) => {
  const response = await fetch(`${API_USERS_URL}/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "token" : token
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Email Verification failed');
  }

  return await response.json(); // Usually returns a Token or User object
};