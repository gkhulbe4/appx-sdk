import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppx } from "../useAppx";
import { TestSeriesResponse } from "../../types/testTypes";

interface UseAllTestsParams {
  search: string;
  clientApiUrl: string;
  examId: string;
}

const PAGE_SIZE = 10;

export const useAllTests = ({
  search,
  clientApiUrl,
  examId,
}: UseAllTestsParams) => {
  const { sdk } = useAppx();

  return useInfiniteQuery<TestSeriesResponse, Error>({
    queryKey: ["allTests", search, clientApiUrl, examId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!sdk) throw new Error("SDK not initialized");

      const res = await sdk.test.getAllTests(
        pageParam!.toString(),
        search,
        clientApiUrl,
        examId
      );

      return res;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < PAGE_SIZE) return undefined;
      const nextStart = allPages.length * PAGE_SIZE;
      return nextStart;
    },
    initialPageParam: 0,
    enabled: !!sdk,
  });
};
