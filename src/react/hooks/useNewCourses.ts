import { useState, useEffect } from "react";
import { useAppx } from "../useAppx";
import { CourseDetails } from "../../types/coursesTypes";

export function useNewCourses() {
  const { sdk } = useAppx();
  const [newCourses, setNewCourses] = useState<CourseDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchNewCourses() {
      setLoading(true);
      setError(null);
      try {
        const res = await sdk.courses.getNewCourses("0", "-1");
        if (isMounted) setNewCourses(res.data ?? []);
      } catch (error) {
        console.log("Failed to fetch new courses:", error);
        if (isMounted) setError((error as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchNewCourses();

    return () => {
      isMounted = false;
    };
  }, [sdk]);

  return { newCourses, loading, error };
}
