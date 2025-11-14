import { useEffect, useState } from "react";
import { studentService } from "../../services/students/studentService";
import type { StudentHistory } from "@/types/students/studentHistory";

export function useFetchStudentHistory() {
  const [studentHistory, setStudentHistory] = useState<StudentHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await studentService.getHistory();
        setStudentHistory(data);
      } catch (err) {
        setError("Failed to fetch student history");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { studentHistory, loading, error };
}
