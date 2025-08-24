import { useState } from "react";
import { VisitorsNavBar } from "../components/VisitorsNavBar";

export default function Guide() {
    const guides = [
        {
            id: 1,
            title: "Spider-Man: Miles Morales",
            description:
                "To transfer ownership of a Spider-Man account, ensure the original linked email and platform account credentials are provided. Change recovery options before handing over."
        },
        {
            id: 2,
            title: "FIFA 25",
            description:
                "For FIFA accounts, transfer requires linking the EA Account credentials and verifying FUT access. Always reset linked security answers and recovery email before transfer.",
        },
        {
            id: 3,
            title: "Elden Ring",
            description:
                "Ownership transfer for Elden Ring requires full Steam/console account access. Ensure saved progress is backed up and recovery email is updated before handover.",
        },
    ];

    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleExpand = (id: string | number) => {
        setExpanded(expanded === String(id) ? null : String(id));
    }

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        guide: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted guide:", formData);
        alert("Thanks for contributing! We will review your guide shortly.");
        setFormData({ username: "", email: "", guide: "" });
    }

    return (
        <div className="min-h-screen bg-[#161B22] text-white">
            <VisitorsNavBar />
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">
                    Transfer Ownership Guide
                </h1>
                <p className="text-gray-400 mb-8">
                    Learn how to securely transfer game accounts. Below are guides for some of our supported games.
                </p>

                {/* Guide Cards */}
                <div className="grid gap-6 mb-12">
                    {guides.map((g) => {
                        const isOpen = expanded === String(g.id);
                        const preview = g.description.slice(0, 100) + "...";

                        return (
                            <div key={g.id} className="bg-[#0E1115] p-6 rounded-lg shadow-md">
                                <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-40" : "max-h-14"
                                    }`}>
                                    <h2 className="text-xl font-semibold mb-2">{g.title}</h2>
                                    <p className="text-gray-300 text-sm">
                                        {isOpen ? g.description : preview}
                                    </p>
                                </div>
                                <button
                                    onClick={() => toggleExpand(g.id)}
                                    className="mt-3 text-blue-400 hover:cursor-pointer text-sm"
                                >
                                    {isOpen ? "Show Less ▲" : "Read More ▼"}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Contribution Form */}
                <div className="bg-[#0E1115] p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Contribute Your Own Guide</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Submit your ownership transfer guide. If approved, we'll add it here and give you a shoutout on X or TikTok!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Your Username"
                            className="w-full px-4 py-2 rounded-lg bg-[#161B22] border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full px-4 py-2 rounded-lg bg-[#161B22] border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                        <textarea
                            name="guide"
                            value={formData.guide}
                            onChange={handleChange}
                            placeholder="Write your transfer guide..."
                            className="w-full h-32 px-4 py-2 rounded-lg bg-[#161B22] border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-lg font-medium"
                        >
                            Submit Guide
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}