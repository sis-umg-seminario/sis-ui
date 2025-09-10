import NavMenu from "./NavMenu"
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex h-screen">
            <aside className="flex flex-col items-center gap-12 w-1/4 max-w-72 bg-blue-950">
                <Link to="/"><img className="w-32 h-32" src={logo} alt="University logo"/></Link>
                <NavMenu />
            </aside>
            <main className="p-4">
                {children}
            </main>
        </div>
    )
};