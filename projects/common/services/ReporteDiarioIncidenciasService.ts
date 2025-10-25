import { ApiService } from "./ApiService";

const module = "ReporteDiarioIncidencias";

export const ReporteDiarioIncidenciasService = {
  DownloadTemplate() {
    return ApiService.makeRequest({
      method: "GET",
      module,
      isExcel: true,
      url: "/template",
    });
  },
};
