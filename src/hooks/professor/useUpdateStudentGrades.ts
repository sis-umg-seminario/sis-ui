import { useState } from "react";
import { professorService } from "@/services/professor/professorService";
import type { GradesToUpdate, Grade } from "@/types/professor/studentGrades";

export const useUpdateStudentGrades = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateGrades = async (
    studentId: number,
    courseOfferingId: number,
    originalScores: Grade[],
    updatedScores: Grade[]
  ) => {
    setLoading(true);
    setError(null);

    const changedScores = updatedScores.filter((updated) => {
      const original = originalScores.find((o) => o.type === updated.type);
      return original?.value !== updated.value;
    });

    if (changedScores.length === 0) {
      setLoading(false);
      return; 
    }

    try {
      const payload: GradesToUpdate = { scores: changedScores };
      await professorService.updateGrades(studentId, courseOfferingId, payload);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar las notas"
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateGrades, loading, error };
};
