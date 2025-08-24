import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { NavBarWithBackBtn } from "../components/NavBarWithBackBtn";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("uploads");

    const tabs = ['uploads', 'bio', 'socials', 'achievements'];

    return (
        <div className="min-h-screen bg-[#161B22] text-white">

            {/* Navbar */}
            <NavBarWithBackBtn />

            {/* Profile Header */}
            <div className="flex flex-col items-center py-6">
                <img
                    src="https://i.pravatar.cc/100?img=11"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-blue-700"
                />
            </div>

            {/* Tabs */}
            <div className="flex justify-center border-b border-gray-700 my-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 font-medium capitalize ${activeTab === tab
                            ? "border-b-2 border-blue-500 text-blue-400"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="px-6 pb-10">
                {/* Uploads Tab */}
                {activeTab === "uploads" && (
                    <div className="mt-20 flex flex-col items-center text-center">
                        <div className="w-40 h-40 border-2 border-dashed border-blue-500 flex items-center justify-center rounded-lg mb-4 cursor-pointer hover:bg-[#0E1115]">
                            <IoCloudUploadOutline size={48} className="text-blue-500" />
                        </div>
                        <p className="text-gray-400 text-sm">
                            You Currently Have No Uploads
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                            Upoad a real clear screenshot of the account items for sale.
                            <br />
                            Each image should not be above 10MB.
                        </p>
                    </div>
                )}

                {/* Bio Tab */}
                {activeTab === "bio" && (
                    <div className="bg-[#0E1115] p-4 rounded-lg">
                        <textarea
                            placeholder="Write a little something about yourself..."
                            className="w-full h-32 p-3 bg-transparent text-white border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                            Edit
                        </button>
                    </div>
                )}

                {/* Socials Tab */}
                {activeTab === "socials" && (
                    <div className="bg-[0E1115] p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Social accounts</h3>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((i) => (
                                <input
                                    key={i}
                                    type="text"
                                    placeholder="Link your social account"
                                    className="w-full px-3 py-2 bg-[#161B22] text-white border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ))}
                        </div>
                        <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                            Save
                        </button>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            "Hawk Eye",
                            "Hustler",
                            "Ready to Go",
                            "Big Spender",
                            "Entrepreneur",
                            "Peacock",
                            "Good Taste",
                            "Flex",
                        ].map((ach, i) => (
                            <div
                                key={i}
                                className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center text-center text-gray-400"
                            >
                                <div className="w-16 h-16 bg-gray-600 rounded-full mb-3"></div>
                                <h4 className="font-medium text-sm">{ach}</h4>
                                <p className="text-xs">Locked</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}