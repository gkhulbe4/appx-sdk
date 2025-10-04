import { useAppx } from "../useAppx";
import { CourseDetails } from "../../types/coursesTypes";
import { useQuery } from "@tanstack/react-query";

export function useFeaturedCourses() {
  const { sdk } = useAppx();

  return useQuery<CourseDetails[], Error>({
    queryKey: ["featuredCourses"],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not initialized");

      const res = await sdk.courses.getFeaturedCourses("0");

      if (res.status !== 200)
        throw new Error("Failed to fetch featured courses");

      return res.data.map((d) => ({
        ...d,
        name: d.course_name,
        thumbnail: d.course_thumbnail,
        mrp: d.mrp,
        price: d.price,
        isPaid: d.is_paid === 1,
      }));
    },
    staleTime: 30 * 60 * 1000,
    retry: 1,
    enabled: !!sdk,
  });
}
