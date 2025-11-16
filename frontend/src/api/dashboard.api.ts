import { api } from "./axios";

export const dashboardApis = {
  list: () => api.get("/files"),
  upload: (formData: FormData) =>
    api.post("/files/upload", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  delete: (id: string) => api.delete(`/files/${id}`),
  download: (id: string) => api.get(`/files/${id}/download`, { responseType: "blob" }),
};