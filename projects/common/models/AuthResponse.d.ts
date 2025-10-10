export interface AuthResponse {
  data: Data;
  type: number;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface Data {
  id: number;
  name: string;
  username: string;
  password: null;
  email: string;
  roleId: number;
  createdAt: string;
  isActive: boolean;
}

export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};
