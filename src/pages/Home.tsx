import { useFetchUsers } from "../hooks/useFetchUsers";

export default function Home() {
  const { users, loading, error } = useFetchUsers();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="list-disc pl-6">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
