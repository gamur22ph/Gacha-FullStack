// EnvUtils.ts
const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing Environment Variable: ${key}`);
  }
  return value;
};

export const ENV = {
  API_URL: getEnvVar('VITE_API_URL'),
};