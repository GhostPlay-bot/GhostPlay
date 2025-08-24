import { useParams, Link } from "react-router-dom";
import { dummyGames } from "../assets/dummyGames";
import { NavBarWithBackBtn } from "../components/NavBarWithBackBtn";

export default function GameDetails() {
    const { id } = useParams<{ id: string }>();
    const game = dummyGames.find((g) => g.id === id);

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
            <NavBarWithBackBtn />

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