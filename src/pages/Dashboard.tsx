import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error.message);
        } else {
            navigate("/"); // redirect to SignIn
        }
    };

    if (!user) {
        // in case user manually hits /dashboard without being signed in
        navigate("/");
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <div className="bg-[#010409] p-10 rounded-2xl shadow-lg text-center w-[90%] max-w-md">
                <h1 className="text-2xl font-bold mb-4">Welcome 🎮</h1>
                <p className="mb-6 text-gray-300">
                    Signed in as: <br />
                    <span className="font-mono text-sm">{user.email}</span>
                </p>
                <button
                    onClick={handleSignOut}
                    className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 transition font-medium"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
