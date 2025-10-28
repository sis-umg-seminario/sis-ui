import { NavLink } from "react-router-dom";
import { BookOpen, Calendar, FileText, Pencil, ClipboardList, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  vertical?: boolean;
  onNavigate?: () => void;
};

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon; 
};

export default function NavMenu({ vertical = false, onNavigate }: Props) {
  const base = "block rounded-md px-3 py-2 transition-colors duration-200";

  const items: NavItem[] = [
    { to: "/enrollment", label: "Inscripciones", icon: Calendar },
    { to: "/program-courses", label: "Pensum", icon: BookOpen },
    { to: "/grades", label: "Notas", icon: FileText },
    { to: "/course-schedule", label: "Consulta de Horario", icon: Calendar },
    { to: "/course-assignment", label: "Asignación", icon: Pencil },
    { to: "/balance", label: "Estado de Cuenta", icon: Wallet }, 
    { to: "/library", label: "Biblioteca", icon: ClipboardList },
  ];

  return (
    <nav className={vertical ? "w-full" : "w-full"}>
      <ul className={`${vertical ? "flex flex-col gap-2" : "flex gap-3"}`}>
        {items.map((it) => {
          const Icon = it.icon as unknown as React.ComponentType<React.SVGProps<SVGSVGElement>>;
          return (
            <li key={it.to}>
              <NavLink
                to={it.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `${base} ${isActive ? "bg-white text-blue-950 font-semibold" : "text-white/90 hover:bg-white/10"} flex items-center gap-3`
                }
              >
                <Icon scale={18} />
                <span className="text-sm">{it.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
