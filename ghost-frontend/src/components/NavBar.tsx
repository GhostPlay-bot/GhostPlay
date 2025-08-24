import { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const profileRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = async () => {
        window.location.href = '/signin';
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <nav className="bg-[#0E1115] px-6 py-4 flex items-center justify-between relative">
            <div ref={menuRef} className="relative">
                <button 
                onClick={() => setMenuOpen((prev) => !prev)} 
                className="p-2 rounded hover:cursor-pointer hover:bg-gray-700">
                    <IoMenu className="text-white" size={24} />
                </button>
                {menuOpen && (
                    <div className="absolute mt-2 w-40 bg-[#18202D] rounded-md shadow-lg z-20">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Store</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Doc</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">News</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Notification</a>
                    </div>
                )}
            </div>

            <h1 className="text-xl font-bold">GHOST</h1>

            <div ref={profileRef} className="relative">
                <button
                    onClick={() => setProfileOpen((prev) => !prev)}
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
                {profileOpen && (
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
    )
}