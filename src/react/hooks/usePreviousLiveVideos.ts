import { useQuery } from "@tanstack/react-query";
import { useAppx } from "../useAppx";
import { VideoDetails } from "../../types/videoTypes";

export function usePreviousLiveVideos({
  courseId,
  start,
  folderWiseCourse,
  userId,
}: {
  courseId: string;
  start: string;
  folderWiseCourse: string;
  userId: string;
}) {
  const { sdk } = useAppx();

  return useQuery<VideoDetails[], Error>({
    queryKey: ["previousLiveVideos", courseId, start, folderWiseCourse, userId],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not initialized");
      const res = await sdk.video.getPreviousLiveVideos(
        courseId,
        start,
        folderWiseCourse,
        userId
      );
      return res.data ?? [];
    },
    staleTime: 30 * 60 * 1000,
    retry: 1,
    enabled: !!sdk,
  });
}
