import { useQuery } from "@tanstack/react-query";
import { useAppx } from "../../useAppx";

export function useWebSliderCourses() {
  const { sdk } = useAppx();

  return useQuery<string[], Error>({
    queryKey: ["webSliderCourses"],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not initialized");
      const res = await sdk.courses.getWebSliderCourses("0");

      if (res.status !== 200) throw new Error("Failed to fetch slider courses");

      return res.data.map((d) => d.image_link);
    },
    staleTime: 30 * 60 * 1000,
    retry: 1,
    enabled: !!sdk,
  });
}
