import { useState, useEffect } from "react";
import { useAppx } from "../useAppx.js";
export function useCourses() {
    const { sdk, loading } = useAppx();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await sdk.client.get("/courses");
                setCourses(response.data.courses);
            }
            catch (error) {
                setError(error?.message ?? "Failed to fetch courses");
            }
        };
        fetchCourses();
    }, [sdk]);
    return { courses, loading, error };
}
//# sourceMappingURL=useCourses.js.map