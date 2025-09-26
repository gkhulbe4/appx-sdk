import { useState, useEffect } from "react";
import { useAppx } from "../useAppx.js";
import type { Course } from "../../types/types.js";

export function useCourses() {
  const { sdk, loading } = useAppx();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await sdk.client.get<{ courses: Course[] }>(
          "/courses"
        );
        setCourses(response.data.courses);
      } catch (error: any) {
        setError(error?.message ?? "Failed to fetch courses");
      }
    }

    fetchCourses();
  }, [sdk]);

  return { courses, loading, error };
}
