import { useEffect, useState } from "react";
import { studentService } from "../../services/students/studentService";
import type { StudentProfile } from "@/types/students/studentProfile";

export function useFetchStudentProfile() {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await studentService.getProfile();
        setStudentProfile(data);
      } catch (err) {
        setError("Failed to fetch student profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { studentProfile, loading, error };
}
