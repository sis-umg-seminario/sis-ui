import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import type { User } from "../types";

export function useFetchUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { users, loading, error };
}
