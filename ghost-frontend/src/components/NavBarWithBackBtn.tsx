import { Link } from "react-router-dom";
import { TfiControlBackward } from "react-icons/tfi";
import { useState, useEffect, useRef } from "react";

export function NavBarWithBackBtn() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = async () => {
        window.location.href = '/signin';
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <nav className="bg-[#0E1115] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Link to="/dashboard" className="p-2 rounded hover:bg-gray-700">
                    <button className="p-2 rounded hover:cursor-pointer hover:bg-gray-700">
                        <TfiControlBackward className="text-white" size={24} />
                    </button>
                </Link>
            </div>

            <h1 className="text-xl font-bold">GHOST</h1>

            <div className="relative">
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="focus:outline-none"
                >
                    <img
                        src={
                            "https://www.svgrepo.com/show/355037/google.svg"
                        }
                        alt="Profile"
                        className="w-8 h-8 cursor-pointer rounded-full bg-white p-1"
                    />
                </button>
                {/* Dropdown */}
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#18202D] rounded-md shadow-lg z-20">
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm hover:bg-gray-800"
                        >
                            Profile
                        </Link>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm hover:bg-gray-800"
                        >
                            Settings
                        </a>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}