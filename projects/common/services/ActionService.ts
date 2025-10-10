import { PermissionAction } from "@common/models";
import { ApiService } from "./ApiService";

const module = "Action";

export const ActionService = {
  Get() {
    return ApiService.makeRequest<PermissionAction[]>({
      module,
      method: "GET",
    });
  },
  GetById(id: string) {
    return ApiService.makeRequest({
      module,
      method: "GET",
      url: `/${id}`,
    });
  },
  Post(data: any) {
    return ApiService.makeRequest({
      module,
      method: "POST",
      data,
    });
  },
  Put(id: string, data: any) {
    return ApiService.makeRequest({
      module,
      method: "PUT",
      url: `/${id}`,
      data,
    });
  },
  Delete(id: string) {
    return ApiService.makeRequest({
      module,
      method: "DELETE",
      url: `/${id}`,
    });
  },
};
