import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";

export default function Marketplace() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const dummyGames = [
        {
            id: 1,
            name: "FC Mobile",
            uploader: "MadMax",
            date: "Jun 23, 2025",
            image:
                "https://media.contentapi.ea.com/content/dam/ea/fifa-mobile/season-2022/common/2022-wc-homepage-refresh/fmobile-vandijktraining-16x9.jpg.adapt.crop16x9.652w.jpg",
        },
        {
            id: 2,
            name: "Call of Duty Mobile",
            uploader: "FurryBall",
            date: "Aug 10, 2025",
            image:
                "https://cdn-www.bluestacks.com/bs-images/BlueStacks-5.8_CODM-4K_EN_1.png",
        },
        {
            id: 3,
            name: "Delta Force Mobile",
            uploader: "ManjaLee",
            date: "Aug 18, 2025",
            image:
                "https://media.pocketgamer.biz/images/133362/86342/delta-force-mobile-overview-trailer_l1200.jpg",
        }
    ]

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
        <nav className="bg-[#0E1115] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <button className="p-2 rounded hover:cursor-pointer hover:bg-gray-700">
                    <IoMenu className="text-white" size={24} />
                </button>
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
        </div>

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
                    <h3 className="text-lg font-bold">{game.name}</h3>
                    <p className="text-sm text-gray-400">Uploaded: {game.date}</p>
                    <p className="text-sm text-gray-400">By: {game.uploader}</p>
                    <button className="mt-3 w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
                        View Account
                    </button>
                </div>
            ))}
        </div>
    </div>
)
}