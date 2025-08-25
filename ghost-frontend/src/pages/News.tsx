import { VisitorsNavBar } from "../components/VisitorsNavBar";

export default function News() {
    const posts = [
        {
            id: 1,
            title: "Ghost Beta Launch 🚀",
            date: "August 18, 2025",
            description:
                "We’re thrilled to announce the Ghost beta release! Early users can now sign in and test the account transfer marketplace.",
            link: "https://x.com/GhostPlayBot", // placeholder link
        },
        {
            id: 2,
            title: "New Games Supported 🎮",
            date: "August 20, 2025",
            description:
                "Ghost now supports account transfers for Spider-Man, FIFA 25, and Elden Ring. More titles will be added soon!",
            link: "https://x.com/GhostPlayBot",
        },
        {
            id: 3,
            title: "Community Guides Initiative 📚",
            date: "August 22, 2025",
            description:
                "Users can now submit their own transfer guides on Ghost. If approved, we’ll feature them and give shoutouts on X and TikTok.",
            link: "https://x.com/GhostPlayBot",
        },
    ];

    return (
        <div className="min-h-screen bg-[#161B22] text-white">
            <VisitorsNavBar />

            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">Ghost News & Announcements</h1>
                <p className="text-gray-400 mb-10">
                    Stay up-to-date with the latest features, updates, and community
                    announcements from Ghost.
                </p>

                {/* News Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-[#0E1115] p-6 rounded-lg shadow-md flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <p className="text-gray-400 text-xs mb-3">{post.date}</p>
                                <p className="text-gray-300 text-sm mb-4">
                                    {post.description}
                                </p>
                            </div>
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 text-sm hover:underline mt-auto"
                            >
                                Read More →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}