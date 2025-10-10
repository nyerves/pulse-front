import { Role, RolesResponseApi } from "@common/models";
import { ApiService } from "./ApiService";

const module = "Role";

export const RoleService = {
  async Get(params: any): Promise<Role[]> {
    const res = await ApiService.makeRequest<RolesResponseApi>({
      method: "GET",
      module,
      params,
    });

    return res?.data;
  },
};
