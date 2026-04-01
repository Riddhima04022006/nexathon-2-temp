export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md">
      <div className="flex flex-col items-center">
        {/* Futuristic Spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-t-white border-white/10 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-b-gray-400 border-white/5 rounded-full animate-[spin_1.5s_linear_reverse_infinite]"></div>
          <div className="absolute inset-4 bg-white/20 rounded-full animate-pulse blur-sm"></div>
        </div>
        
        {/* Loading Text */}
        <p className="mt-6 font-mono text-white text-xs tracking-[0.3em] uppercase animate-pulse">
          Initiating Hyperspace
        </p>
      </div>
    </div>
  );
}
