import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppx } from "../useAppx";
import { TestSeriesResponse } from "../../types/testTypes";

interface UseAllTestsParams {
  search: string;
  clientApiUrl: string;
  examId: string;
}

export const useAllTests = ({
  search,
  clientApiUrl,
  examId,
}: UseAllTestsParams) => {
  const { sdk } = useAppx();

  return useInfiniteQuery<TestSeriesResponse, Error>({
    queryKey: ["allTests", search, clientApiUrl, examId],
    queryFn: async ({ pageParam = "0" }) => {
      if (!sdk) throw new Error("SDK not initialized");

      const res = await sdk.test.getAllTests(
        pageParam as string,
        search,
        clientApiUrl,
        examId
      );

      return res;
    },
    getNextPageParam: (_lastPage, allPages) => {
      const nextStart = allPages.length * 10;
      return nextStart;
    },
    initialPageParam: "0",
    enabled: !!sdk,
  });
};
