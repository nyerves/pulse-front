export interface Role {
  id: number;
  name: string;
  permissions: RolePermission[];
}

export interface RolePermission {
  permissionId: string;
  parentId: string;
  actionIds: number[];
}

export interface Permission {
  id: string;
  parentPermissionId: string | null;
  name: string;
}

export interface PermissionAction {
  id: number;
  name: string;
}
