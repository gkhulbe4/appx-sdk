import { useState, useEffect } from "react";
import { useAppx } from "../useAppx.js";
import type { Course } from "../../types/coursesTypes.js";

export function useNewCourses() {
  const { sdk } = useAppx();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await sdk.courses.getNewCourses();
        if (isMounted) setCourses(data);
      } catch (error) {
        console.log("Failed to fetch new courses:", error);
        if (isMounted) setError((error as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [sdk]);

  return { courses, loading, error };
}
