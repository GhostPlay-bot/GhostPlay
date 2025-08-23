import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TfiControlBackward } from "react-icons/tfi";
import { dummyGames } from "../assets/dummyGames";

export default function GameDetails() {
    const { id } = useParams<{ id: string }>();
    const game = dummyGames.find((g) => g.id === id);
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

    if (!game) {
        return (
            <div className="text-white bg-[#161B22] min-h-screen flex flex-col items-center justify-center gap-4">
                <p>Game not found.</p>
                <Link to="/dashboard" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Back to Marketplace</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#161B22] text-white">
            {/* Navbar */}
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

            {/* Content */}
            <div className="p-6">
                {/* Game Cover */}
                <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-60 object-cover rounded-lg mb-4"
                />

                {/* Details */}
                <div className="bg-[#0E1115] p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-bold mb-2">{game.name}</h2>
                    <p className="text-sm text-gray-400 mb-2">Uploaded: {game.date}</p>
                    <div className="flex items-center gap-2 mb-4">
                        <img
                            src={game.uploaderImg}
                            alt={game.uploader}
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm">{game.uploader}</span>
                    </div>

                    <h3 className="font-semibold mb-2">Details</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                        {game.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                        ))}
                    </ul>
                </div>

                {/* Screenshots */}
                <div className="bg-[#0E1115] p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Screenshots</h3>
                    <div className="flex overflow-x-auto gap-3 scrollbar-hide">
                        {game.screenshots.map((shot, i) => (
                            <img
                                key={i}
                                src={shot}
                                alt={`Screenshot ${i + 1}`}
                                className="w-72 h-44 object-cover rounded-lg flex-shrink-0 select-none pointer-events-none"
                                draggable={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}