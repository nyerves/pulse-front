export interface User {
  id: number;
  name: string;
  username: string;
  password?: string;
  email: string;
  roleId: string;
  createdAt?: string;
  isActive?: boolean;
}
