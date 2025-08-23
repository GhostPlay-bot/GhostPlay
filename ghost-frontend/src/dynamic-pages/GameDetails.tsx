import { useParams, Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const dummyGames = [
    {
        id: 1,
        name: "FC Mobile",
        uploader: "MadMax",
        uploaderImg: "https://i.pravatar.cc/40?img=2",
        date: "Jun 23, 2025",
        image:
            "https://media.contentapi.ea.com/content/dam/ea/fifa-mobile/season-2022/common/2022-wc-homepage-refresh/fmobile-vandijktraining-16x9.jpg.adapt.crop16x9.652w.jpg",
        achievements: [
            "Accounts Linked: (Link would be provided after purchase).",
            "Web-Shooters: Increases max Web-Shooter ammo capacity by 2.",
            "Holo-Drone: Increases the damage done by a Holo-Drone.",
            "Remote Mine: Increases the Remote Mine’s knockout capacity when attached to a fuse box.",
        ],
        screenshots: [
            "https://via.placeholder.com/300x200?text=Screenshot+1",
            "https://via.placeholder.com/300x200?text=Screenshot+2",
            "https://via.placeholder.com/300x200?text=Screenshot+3",
        ],
    },
]

export default function GameDetails() {
    const { id } = useParams();
    const game = dummyGames.find((g) => g.id === id);
    const [scrollPos, setScrollPos] = useState(0);

    if (!game) {
        return (
            <div className="text-white bg-[#161B22] min-h-screen flex items-center justify-center">
                <p>Game not found.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#161B22] text-white">
            {/* Navbar */}
            <nav className="bg-[#0E1115] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded hover:cursor-pointer hover:bg-gray-700">
                        <IoMenu className="text-white" size={24} />
                    </button>
                </div>

                <h1 className="text-xl font-bold">GHOST</h1>

                <div className="relative">
                    <button
                        // onClick={() => setMenuOpen((prev) => !prev)}
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
                    {/* {menuOpen && ( */}
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
                            // onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
                        >
                            Logout
                        </button>
                    </div>
                    {/* )} */}
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
                                className="w-60 h-40 object-cover rounded-lg flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}