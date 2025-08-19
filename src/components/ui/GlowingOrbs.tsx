import React from 'react';

export function GlowingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large Orbs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute top-1/4 -right-20 w-32 h-32 bg-gradient-to-bl from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '3s' }} />
      <div className="absolute -bottom-20 left-1/4 w-36 h-36 bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '6s' }} />
      
      {/* Medium Orbs */}
      <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-gradient-to-l from-pink-400/20 to-red-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Small Orbs */}
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-green-300/15 to-teal-400/15 rounded-full blur-lg animate-float-fast" style={{ animationDelay: '2s' }} />
      <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-tl from-indigo-400/15 to-purple-400/15 rounded-full blur-lg animate-float-fast" style={{ animationDelay: '5s' }} />
    </div>
  );
}