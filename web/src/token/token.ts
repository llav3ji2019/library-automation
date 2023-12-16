import { AuthorizationStatus } from "../const";

const AUTH_TOKEN_KEY_NAME = 'library-auth-token';

export const getToken = (): AuthorizationStatus => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  if (token === AuthorizationStatus.Admin) {
    return (AuthorizationStatus.Admin);
  }
  if (token === AuthorizationStatus.Worker) {
    return (AuthorizationStatus.Worker);
  }
  return (AuthorizationStatus.Unknown);
};

export const saveToken = (token: AuthorizationStatus): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
