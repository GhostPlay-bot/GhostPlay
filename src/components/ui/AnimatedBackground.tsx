import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced Dark Gradient Mesh */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-green-500/10 via-green-400/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-600/10 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-gradient-to-tr from-purple-600/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-pink-600/10 via-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '6s' }} />
        <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-gradient-to-r from-cyan-600/8 via-cyan-500/4 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '8s' }} />
      </div>

      {/* Animated Geometric Patterns */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-6 h-6 bg-green-400/60 rotate-45 animate-float neon-glow" />
        <div className="absolute top-40 right-32 w-4 h-4 bg-blue-400/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-40 w-8 h-8 bg-purple-400/60 rotate-12 animate-float neon-glow-purple" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-400/60 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-10 w-4 h-4 bg-yellow-400/60 rotate-45 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-10 w-6 h-6 bg-cyan-400/60 animate-float" style={{ animationDelay: '5s' }} />
        
        {/* Additional floating elements */}
        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-green-300/40 rounded-full animate-float-fast" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/4 left-3/4 w-5 h-5 bg-blue-300/40 rotate-45 animate-float-fast" style={{ animationDelay: '3.5s' }} />
        <div className="absolute bottom-1/3 left-2/3 w-4 h-4 bg-purple-300/40 rounded-full animate-float-fast" style={{ animationDelay: '5.5s' }} />
      </div>

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse-slow" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-400/30 to-transparent animate-pulse-slow" style={{ animationDelay: '4.5s' }} />
      </div>
    </div>
  );
}