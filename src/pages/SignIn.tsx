import { supabase } from "../lib/supabase";

export default function SignIn() {
    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) console.error("Error signing in:", error.message);
    };

    const handleEmailSignUp = () => {
        // Placeholder for email sign up functionality
        console.log("Email sign up clicked");
    };

    const handleLogIn = () => {
        // Placeholder for log in functionality
        console.log("Log in clicked");
    };

    return (
        <div 
            className="relative min-h-screen w-full flex items-center justify-center"
            style={{
                backgroundImage: `url('/image.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Left side - Logo */}
            <div className="relative z-10 flex-1 flex items-center justify-center max-w-md">
                <div className="text-center">
                    {/* Custom logo */}
                    <div className="w-75 h-75 mx-auto mb-6">
                        <img 
                            src="/logo.png" 
                            alt="GHOST Logo" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h1 className="text-white text-5xl font-bold tracking-wider">
                        GHOST<span className="text-white-400">Ω</span>
                    </h1>
                </div>
            </div>

            {/* Right side - Sign in card */}
            <div className="relative z-10 flex-1 flex items-center justify-center max-w-md">
                <div className="w-full max-w-[400px] rounded-2xl bg-black/80 backdrop-blur-sm px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-gray-800">
                    {/* Title */}
                    <h2 className="text-white text-3xl font-bold text-center mb-8">Get Started</h2>

                    {/* Google button */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full h-12 rounded-lg bg-white text-black inline-flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/60 mb-4"
                        aria-label="Continue with Google"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt=""
                            className="h-5 w-5"
                        />
                        <span className="text-sm font-medium">Continue with Google</span>
                    </button>

                    {/* Email sign up button */}
                    <button
                        onClick={handleEmailSignUp}
                        className="w-full h-12 rounded-lg bg-blue-600 text-white inline-flex items-center justify-center gap-3 shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400/60 mb-6"
                        aria-label="Sign Up with Email"
                    >
                        <span className="text-sm font-medium">Sign Up with Email</span>
                    </button>

                    {/* Already have account section */}
                    <div className="text-center mb-4">
                        <p className="text-gray-400 text-sm mb-3">Already have an account?</p>
                        <button
                            onClick={handleLogIn}
                            className="w-full h-12 rounded-lg bg-transparent border border-gray-600 text-white hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-400/60"
                            aria-label="Log In"
                        >
                            <span className="text-sm font-medium">Log In</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-400 mt-6">
                        By signing up, you agree to our{" "}
                        <a href="#" className="text-blue-400 hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <p className="text-center text-xs text-gray-400">
                    Copyright © 2025. All rights reserved.
                </p>
            </div>
        </div>
    );
}