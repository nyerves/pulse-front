export interface Role {
  id: number;
  name: string;
  permissions: RolePermission[];
}

export interface RolePermission {
  permissionId: number;
  parentId: number;
  actionIds: number[];
}

export interface Permission {
  id: number;
  parentPermissionId: number | null;
  name: string;
}

export interface PermissionAction {
  id: number;
  name: string;
}
