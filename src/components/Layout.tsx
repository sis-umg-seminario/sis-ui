// src/components/Layout.tsx
import { useState } from "react";
import NavMenu from "./NavMenu";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top bar for mobile */}
      <header className="sm:hidden flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setOpen((s) => !s)}
            aria-label="menu"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            <span className="font-semibold text-lg">MyUniversity</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            bg-blue-950 text-white w-64 p-6 hidden sm:flex flex-col items-center gap-8
          `}
        >
          <Link to="/" className="flex flex-col items-center">
            <img src={logo} alt="logo" className="w-28 h-28 object-contain" />
            <span className="mt-1 text-sm font-medium">Mi Campus</span>
          </Link>

          <NavMenu vertical />

          <div className="mt-auto text-xs opacity-75">© {new Date().getFullYear()}</div>
        </aside>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-950 p-6 text-white transform transition-transform sm:hidden
            ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
              <span className="font-semibold">MiCampus</span>
            </Link>
            <button onClick={() => setOpen(false)} aria-label="cerrar" className="text-white">✕</button>
          </div>
          <NavMenu vertical onNavigate={() => setOpen(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 sm:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}
