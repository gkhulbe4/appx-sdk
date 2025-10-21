import { useQuery } from "@tanstack/react-query";
import { useAppx } from "../../useAppx";
import { CourseDetails } from "../../../types/coursesTypes";

export function useNewCourses() {
  const { sdk } = useAppx();

  return useQuery<CourseDetails[], Error>({
    queryKey: ["newCourses"],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not initialized");
      const res = await sdk.courses.getNewCourses("0", "-1");
      return res.data ?? [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!sdk,
  });
}

// import { useAppx } from "../useAppx";
// import { CourseDetails } from "../../types/coursesTypes";
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// export function useNewCourses() {
//   const { sdk } = useAppx();
//   const PAGE_SIZE = 20;

//   return useInfiniteQuery<CourseDetails[], Error>({
//     queryKey: ["newCourses"],
//     queryFn: async ({ pageParam = 0 }) => {
//       if (!sdk) throw new Error("SDK not initialized");

//       const res = await sdk.courses.getNewCourses(String(pageParam), "-1");
//       return res.data ?? [];
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
//       return allPages.length * PAGE_SIZE;
//     },
//     initialPageParam: 0,
//     staleTime: 5 * 60 * 1000,
//     retry: 1,
//     enabled: !!sdk,
//   });
// }
