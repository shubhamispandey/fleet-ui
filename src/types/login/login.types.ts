export type LoginData = {
  accessToken?: string;
  email?: string;
  [key: string]: unknown;
};

export interface AuthState {
  register: {
    loading: boolean;
  };
  login: {
    loading: boolean;
    data: LoginData;
  };
}
