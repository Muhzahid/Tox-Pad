
import { useEffect, useState } from "react";
import { getCombinedUsers } from "../services/users.service";
import { User } from "../types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCombinedUsers()
      .then((data: User[]) => setUsers(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
};