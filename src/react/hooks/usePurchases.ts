import { useState, useEffect } from "react";
import { useAppx } from "../useAppx";
import type { UserPurchasesResponse } from "../../types/coursesTypes";

type UsePurchasesProps = {
  userId: string;
  itemType: string;
};

export function usePurchases({ userId, itemType }: UsePurchasesProps) {
  const { sdk } = useAppx();
  const [purchases, setPurchases] = useState<UserPurchasesResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPurchases = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await sdk.courses.getPurchasedCourses(userId, itemType);
        if (isMounted) setPurchases(data ?? []);
      } catch (error) {
        console.log("Failed to fetch purchased courses:", error);
        if (isMounted) setError((error as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPurchases();

    return () => {
      isMounted = false;
    };
  }, [sdk, userId, itemType]);

  return { purchases, loading, error };
}
