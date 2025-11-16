import { api } from "./axios";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),  
  
  logout: () =>
    api.post("/auth/logout"),

  signup: (data: { email: string; name: string ; password: string }) =>
    api.post("/auth/signup", data),
  
  resetPasswordLink: (data: { email: string}) =>
    api.post("/auth/generate-reset-link", data),  
  
  resetPassword: (token:string,data: { newPassword: string}) =>
    api.post(`/auth/reset-password/${token}`, data),

  me: () => api.get("/auth/me"),
};