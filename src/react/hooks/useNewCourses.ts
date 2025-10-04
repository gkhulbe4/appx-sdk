import { useAppx } from "../useAppx";
import { CourseDetails } from "../../types/coursesTypes";
import { useQuery } from "@tanstack/react-query";

export function useNewCourses() {
  const { sdk } = useAppx();

  return useQuery<CourseDetails[], Error>({
    queryKey: ["newCourses"],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not initialized");
      const res = await sdk.courses.getNewCourses("0", "-1");
      return res.data ?? [];
    },
    staleTime: 30 * 60 * 1000,
    retry: 1,
    enabled: !!sdk,
  });
}
