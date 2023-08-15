import { ICredentialsToken } from "@models/ICredentialsToken";

const TOKEN_KEY = "17847468-188a-4978-a423-c1b2f2b49cd9cred";

export const getCredentialsToken = (): ICredentialsToken | null => {
  if (typeof localStorage === "undefined") return null;

  const storedCredentials = localStorage.getItem(TOKEN_KEY);

  if (!storedCredentials) return null;

  return JSON.parse(storedCredentials);
};

export const setCredentialsToken = (credentials: ICredentialsToken) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(credentials));
};

export const clearCredentials = () => {
  localStorage.removeItem(TOKEN_KEY);
};
