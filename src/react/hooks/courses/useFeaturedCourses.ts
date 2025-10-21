import { useQuery } from "@tanstack/react-query";
import { CourseDetails } from "../../../types/coursesTypes";
import { useAppx } from "../../useAppx";

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
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!sdk,
  });
}
