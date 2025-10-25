import { ApiService } from "./ApiService";

export const DailyReportService = {
  DownloadAllTemplates() {
    return ApiService.makeRequest<Blob>({
      method: "GET",
      module: "ReporteDiario",
      isExcel: true,
      url: "/template-all",
    });
  },
};
