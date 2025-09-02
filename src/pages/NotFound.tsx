import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold text-red-600">404</h1>
      <p className="mb-4">Oops! Page not found.</p>
      <Link to="/home" className="text-blue-500 underline">
        Go back Home
      </Link>
    </div>
  );
}
