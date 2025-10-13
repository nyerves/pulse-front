import { ApiService } from "@common/services";
import type { User } from "@common/models";

const module = "User";

export const UserService = {
  Get() {
    return ApiService.makeRequest<User[]>({
      method: "GET",
      module,
    });
  },
  Post(data: Partial<User>) {
    delete data.id;

    return ApiService.makeRequest<User>({
      method: "POST",
      module,
      data,
    });
  },
  Put(data: Partial<User>) {
    return ApiService.makeRequest<User>({
      method: "PUT",
      url: `/${data.id}`,
      module,
      data,
    });
  },
  Delete(id: number) {
    return ApiService.makeRequest<void>({
      method: "DELETE",
      url: `/${id}`,
      module,
    });
  },
};
