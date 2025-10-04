import { useState, useEffect } from "react";
import { useAppx } from "../useAppx";
import type {
  PurchasedCourse,
  UserPurchasesResponse,
} from "../../types/coursesTypes";
import { useQuery } from "@tanstack/react-query";

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
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!sdk && !!userId && !!itemType,
  });
}
