import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppx } from "../../useAppx";
import { QuizTitle } from "../../../types/quizTypes";

const PAGE_SIZE = 10;
export function useQuizTitles() {
  const { sdk } = useAppx();

  return useInfiniteQuery<QuizTitle[], Error>({
    queryKey: ["quizTitles"],
    queryFn: async ({ pageParam = 0 }) => {
      if (!sdk) throw new Error("SDK not initialized");

      const res = await sdk.quiz.getQuizTitles(pageParam!.toString());

      return res.data ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      const nextStart = allPages.length * PAGE_SIZE;
      return nextStart;
    },
    initialPageParam: 0,
    enabled: !!sdk,
  });
}
