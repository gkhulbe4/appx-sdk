import { useInfiniteQuery } from "@tanstack/react-query";
import { useAppx } from "../../useAppx";
import { QuizTitle } from "../../../types/quizTypes";

const PAGE_SIZE = 10;

export function useQuizTitles(exam?: string) {
  const { sdk } = useAppx();

  return useInfiniteQuery<QuizTitle[], Error>({
    queryKey: ["quizTitles", exam],
    queryFn: async ({ pageParam = 0 }) => {
      if (!sdk) throw new Error("SDK not initialized");

      const res = await sdk.quiz.getQuizTitles(
        pageParam!.toString(),
        exam && exam !== "All" ? exam : undefined
      );

      return res.data ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },
    initialPageParam: 0,
    enabled: !!sdk,
  });
}
