import { Role } from "@common/models";
import { ApiService } from "./ApiService";

const module = "Role";

export const RoleService = {
  Get(params: any) {
    return ApiService.makeRequest<Role[]>({
      method: "GET",
      module,
      params,
    });
  },
  Post(data: Partial<Role>) {
    return ApiService.makeRequest<Role>({
      method: "POST",
      module,
      data,
    });
  },
  Put(data: Partial<Role>) {
    return ApiService.makeRequest<Role>({
      method: "PUT",
      module,
      data,
      url: `/${data.id}`,
    });
  },
  Delete(id: number) {
    return ApiService.makeRequest<void>({
      method: "DELETE",
      module,
      url: `/${id}`,
    });
  },
};
