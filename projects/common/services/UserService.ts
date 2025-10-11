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
};
