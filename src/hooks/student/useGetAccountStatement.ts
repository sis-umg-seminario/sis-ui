import { useState, useEffect } from "react";
import { paymentService } from "@/services/payments/paymentService";
import { type AccountStatementResponse } from "@/types/students/accountStatement";

export function useGetAccountStatement() {
  const [statement, setStatement] = useState<AccountStatementResponse | null>(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        const studentId = 1;
        const year = 2025;
        const startMonth = 7;
        const termType = "SEMESTER";
        
        const data = await paymentService.getAccountStatement(
          studentId,
          year,
          startMonth,
          termType
        );
        setStatement(data);
      } catch (err) {
        setError("Error: No se pudo cargar el estado de cuenta.");
      } finally {
        setLoading(false); 
      }
    };

    fetchStatement(); 
  }, []); 

  return { statement, loading, error };
}