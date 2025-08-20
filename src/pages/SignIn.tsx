import { supabase } from "../lib/supabase";

export default function SignIn() {
    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) console.error("Error signing in:", error.message);
    };

    return (
        <div className="relative min-h-screen w-full grid place-items-center bg-[#12233E]">
            {/* card */}
            <div className="w-[90%] max-w-[420px] rounded-2xl bg-[#010409] px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                {/* brand */}
                <div className="flex items-center justify-center gap-2 select-none">
                    <span className="text-white text-2xl tracking-[0.25em] font-semibold">
                        GHOST
                    </span>
                </div>

                {/* title */}
                <h1 className="text-white text-3xl font-bold text-center mt-6">Sign In</h1>

                {/* google button */}
                <button
                    onClick={handleGoogleSignIn}
                    className="mt-8 w-full h-12 rounded-full bg-white text-black inline-flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-transform duration-150 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/60"
                    aria-label="Continue with Google"
                >
                    {/* Google logo */}
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt=""
                        className="h-5 w-5"
                    />
                    <span className="text-sm font-medium">Continue with Google</span>
                </button>

                {/* footer */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    Terms of Service ·{" "}
                    <a href="#" className="text-[#4426B9] hover:underline">
                        Privacy Policy
                    </a>
                </p>

                <p className="text-center text-[10px] text-gray-500 mt-2">
                    Copyright © 2025 All rights reserved
                </p>
            </div>
        </div>
    );
}