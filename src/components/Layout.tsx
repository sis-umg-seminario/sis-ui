import { useState } from "react";
import NavMenu from "./NavMenu";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar for mobile */}
      <header className="sm:hidden flex items-center justify-between px-4 py-3 bg-card shadow-sm border-b">
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-accent"
            onClick={() => setOpen((s) => !s)}
            aria-label="menu"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            <span className="font-semibold text-lg text-foreground">MyUniversity</span>
          </Link>
        </div>
        <ModeToggle />
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            bg-primary text-primary-foreground w-64 p-6 hidden sm:flex flex-col items-center gap-8
          `}
        >
          <Link to="/" className="flex flex-col items-center">
            <img src={logo} alt="logo" className="w-28 h-28 object-contain" />
            <span className="mt-1 text-sm font-medium">Mi Campus</span>
          </Link>

          <NavMenu vertical />

          <div className="mt-auto flex flex-col items-center gap-4">
            <ModeToggle />
            <div className="text-xs opacity-75">© {new Date().getFullYear()}</div>
          </div>
        </aside>

        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary p-6 text-primary-foreground transform transition-transform sm:hidden
            ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
              <span className="font-semibold">MiCampus</span>
            </Link>
            <button onClick={() => setOpen(false)} aria-label="cerrar" className="text-primary-foreground">✕</button>
          </div>
          <NavMenu vertical onNavigate={() => setOpen(false)} />
        </div>

        <main className="flex-1 p-6 sm:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}