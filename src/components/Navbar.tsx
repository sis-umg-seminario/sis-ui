import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-secondary shadow">
      <Link to="/home" className="text-primary hover:underline">Home</Link>
      <Link to="/about" className="text-primary hover:underline">About</Link>
    </nav>
  );
}