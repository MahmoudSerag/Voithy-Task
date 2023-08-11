export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://voithy-task.onrender.com';

export const AUTH_URL = '/api/v1/auth';
export const USERS_URL = '/api/v1/users';
