import { useQuery } from "@tanstack/react-query";
import { useAppx } from "../../useAppx";
import { PurchasedCourse } from "../../../types/coursesTypes";

type UsePurchasesProps = {
  userId: string;
  itemType: string;
};

export function usePurchases({ userId, itemType }: UsePurchasesProps) {
  const { sdk } = useAppx();
  return useQuery<PurchasedCourse[], Error>({
    queryKey: ["purchases", userId, itemType],
    queryFn: async () => {
      if (!sdk) throw new Error("SDK not initialized");
      const res = await sdk.courses.getPurchasedCourses(userId, itemType);
      return res.data ?? [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!sdk && !!userId && !!itemType,
  });
}
