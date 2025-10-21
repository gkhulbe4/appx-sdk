import { useQuery } from "@tanstack/react-query";
import { useAppx } from "../../useAppx";
import { CourseContentByLiveStatusResponse } from "../../../types/coursesTypes";

export function useLiveVideos({
  courseId,
  start,
  liveStatus,
}: {
  courseId: string;
  start: string;
  liveStatus: string;
}) {
  const { sdk } = useAppx();

  return useQuery<CourseContentByLiveStatusResponse["data"], Error>({
    queryKey: ["liveVideos", courseId, start, liveStatus],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not initialized");
      const res = await sdk.courses.getCourseContentByLiveStatus(
        courseId,
        start,
        liveStatus
      );
      return res.data ?? [];
    },

    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!sdk,
  });
}
