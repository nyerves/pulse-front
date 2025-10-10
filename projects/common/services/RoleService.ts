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
};
