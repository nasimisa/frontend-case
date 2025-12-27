import axios from 'axios';

export const refreshAccessToken = async (refresh: string): Promise<string> => {
  const { data } = await axios.post<{ access: string }>(
    'https://backendcase.infodecs.dev/api/auth/token/refresh/',
    { refresh },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return data.access;
};
