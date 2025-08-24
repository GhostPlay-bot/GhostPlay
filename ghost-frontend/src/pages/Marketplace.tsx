import { useState, useMemo } from "react";
import { dummyGames } from "../assets/dummyGames";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function Marketplace() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const filteredGames = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return dummyGames;
        return dummyGames.filter(({ name, uploader }) =>
            [name, uploader].some((s) => s.toLowerCase().includes(q))
        );
    }, [search]);

    

    return (
        <div className="min-h-screen bg-[#161B22] text-white">
            {/* Navbar */}
            <Navbar />

            {/* Search Bar */}
            <div className="px-6 py-6">
                <input
                    type="text"
                    placeholder="Search games..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#0E1115] text-white focus:outline-none"
                />
            </div>

            {/* Section Title */}
            <div className="px-6">
                <h2 className="text-lg font-semibold mb-4">
                    Available Accounts
                </h2>


                {filteredGames.length === 0 ? (
                    <p className="text-gray-400">No account found.</p>
                ) : (
                    < div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 pb-10">
                        {filteredGames.map((game) => (
                            <div
                                key={game.id}
                                className="bg-[#0E1115] p-2 rounded-xl shadow-md overflow-hidden"
                            >
                                <img
                                    src={game.image} alt={game.name} className="w-full rounded-md h-40 object-cover"
                                />
                                <div className="p-2">
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
                )}
            </div>
        </div >
    )
}