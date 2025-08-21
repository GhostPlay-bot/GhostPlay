import '../index.css';
import { supabase } from "../lib/supabase";

export default function SignIn() {
    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/dashboard` // Redirect after sign-in
            }
        });
        if (error) console.error("Error signing in:", error.message);
    };

    return (
        <div
            style={{ // Replace with your background image URL
                position: "relative",
                minHeight: "100vh",
                width: "100%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "#000"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    borderRadius: "20px",
                    backgroundColor: "#010409",
                    padding: "40px",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div className="w-full space-y-6">

                    <h1 style={{
                        margin: "20px 0px",
                        color: "#FFFFFF",
                        fontSize: "30px",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>Sign In</h1>

                    <button
                        onClick={handleGoogleSignIn}
                        style={{
                            width: "100%",
                            height: "48px",
                            margin: "10px 0px",
                            borderRadius: "9999px",
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                            transition: "transform 150ms ease-in-out, box-shadow 150ms ease-in-out"
                        }}
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt=""
                            className="h-5 w-5"
                        />
                        <span className="text-sm font-medium">Continue with Google</span>
                    </button>

                    <div
                        style={{
                            marginTop: "24px",
                        }}
                    >
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
            </div>
        </div>
    );
}