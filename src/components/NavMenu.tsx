import { Link } from "react-router-dom";

export default function NavMenu(){
    return(
        <nav className="w-full h-full">
            <ul className="flex flex-col text-xl text-center text-white">
                <li className=" py-3 px-1 hover:text-blue-950 hover:bg-blue-100 transition-colors duration-300 ease-in-out"><Link to="/home">Home</Link></li>
                <li className=" py-3 px-1 hover:text-blue-950 hover:bg-blue-100 transition-colors duration-300 ease-in-out"><Link to="/about">About</Link></li>
                <li className=" py-3 px-1 hover:text-blue-950 hover:bg-blue-100 transition-colors duration-300 ease-in-out"><Link to="/contact">Contact</Link></li>
                <li className=" py-3 px-1 hover:text-blue-950 hover:bg-blue-100 transition-colors duration-300 ease-in-out"><Link to="/course-assignment">Asignaciones</Link></li>
            </ul>
        </nav>
    )
};