import { useQuery } from "@tanstack/react-query";
import { dashboardApis } from "../../../api/dashboard.api";

export const useFiles = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: () => dashboardApis.list().then((res) => res.data),
  });
};