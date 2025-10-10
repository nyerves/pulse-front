export interface RolesResponseApi {
  data: Role[];
  message: string;
  status: boolean;
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  permissionId: string;
  parentId: string;
  actionIds: number[];
}
