import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { dummyGames } from "../assets/dummyGames";
import { useNavigate } from "react-router-dom";

export default function Marketplace() {
    const navigate = useNavigate();
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
        <div className="min-h-screen bg-[#161B22] text-white">
            <nav className="bg-[#0E1115] px-6 py-4 flex items-center justify-between relative">
                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded hover:cursor-pointer hover:bg-gray-700">
                        <IoMenu className="text-white" size={24} />
                    </button>
                    {menuOpen && (
                        <div className="absolute mt-2 w-40 bg-[#0E1115] rounded-md shadow-lg z-20">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-800">Store</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-800">Doc</a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-800">News</a>
                        </div>
                    )}
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
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm hover:bg-gray-800"
                            >
                                Profile
                            </a>
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

            {/* Search Bar */}
            <div className="px-6 py-6">
                <input
                    type="text"
                    placeholder="Search games..."
                    className="w-full p-3 rounded-lg bg-[#0E1115] text-white focus:outline-none"
                />
            </div>

            {/* Section Title */}
            <div className="px-6">
                <h2 className="text-lg font-semibold mb-4">
                    Available Accounts
                </h2>


                {/* Game Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 pb-10">
                    {dummyGames.map((game) => (
                        <div
                            key={game.id}
                            className="bg-[#0E1115] p-2 rounded-xl shadow-md overflow-hidden"
                        >
                            <img
                                src={game.image} alt={game.name} className="w-full rounded-md h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{game.name}</h3>
                                <p className="text-sm text-gray-400">Uploaded: {game.date}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <img src={game.uploaderImg} alt={game.uploader} className="w-5 h-5 rounded-full" />
                                    <span>By: {game.uploader}</span>
                                </div>
                                {/* <p className="text-sm text-gray-400">By: {game.uploader}</p> */}
                                <button
                                    onClick={() => navigate(`/game/${game.id}`)}
                                    className="mt-3 w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 hover:cursor-pointer">
                                    View Account
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}