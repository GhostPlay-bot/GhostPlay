import { Link } from "react-router-dom";
import { TfiControlBackward } from "react-icons/tfi";

export function VisitorsNavBar() {
    return (
        <nav className="bg-[#0E1115] px-6 py-4 flex items-center justify-between">
            <Link to="/signin" className="p-2 rounded hover:bg-gray-700">
                <button className="p-2 rounded hover:cursor-pointer hover:bg-gray-700">
                    <TfiControlBackward className="text-white" size={24} />
                </button>
            </Link>
        </nav>
    )
}