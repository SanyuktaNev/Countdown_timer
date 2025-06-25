
import { useState, useEffect } from 'react';

const DigitalCountdown = () => {
  // Start with 24 hours in seconds
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setTimeLeft(24 * 60 * 60);
    setIsActive(false);
  };

  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
      
      {/* Main container */}
      <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-mono text-cyan-400 mb-2 tracking-wider">
            DIGITAL COUNTDOWN
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        {/* Clock display */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {/* Hours */}
          <div className="relative">
            <div className="bg-gray-900 border border-cyan-500/50 rounded-lg p-4 min-w-[80px]">
              <div className="text-4xl font-mono text-cyan-400 font-bold text-center relative">
                {hours}
                <div className="absolute inset-0 text-cyan-400 opacity-50 blur-sm">{hours}</div>
              </div>
              <div className="text-xs text-cyan-300 text-center mt-1 font-mono">HOURS</div>
            </div>
            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
          </div>

          {/* Separator */}
          <div className="text-4xl text-cyan-400 font-mono animate-pulse">:</div>

          {/* Minutes */}
          <div className="relative">
            <div className="bg-gray-900 border border-cyan-500/50 rounded-lg p-4 min-w-[80px]">
              <div className="text-4xl font-mono text-cyan-400 font-bold text-center relative">
                {minutes}
                <div className="absolute inset-0 text-cyan-400 opacity-50 blur-sm">{minutes}</div>
              </div>
              <div className="text-xs text-cyan-300 text-center mt-1 font-mono">MINUTES</div>
            </div>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
          </div>

          {/* Separator */}
          <div className="text-4xl text-cyan-400 font-mono animate-pulse">:</div>

          {/* Seconds */}
          <div className="relative">
            <div className="bg-gray-900 border border-cyan-500/50 rounded-lg p-4 min-w-[80px]">
              <div className="text-4xl font-mono text-cyan-400 font-bold text-center relative">
                {seconds}
                <div className="absolute inset-0 text-cyan-400 opacity-50 blur-sm">{seconds}</div>
              </div>
              <div className="text-xs text-cyan-300 text-center mt-1 font-mono">SECONDS</div>
            </div>
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={startTimer}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-mono text-sm border border-green-400 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
          >
            START
          </button>
          <button
            onClick={pauseTimer}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-mono text-sm border border-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25"
          >
            PAUSE
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-700 hover:bg-gray-600 text-cyan-400 px-6 py-2 rounded-lg font-mono text-sm border border-gray-500 transition-all duration-200 hover:shadow-lg hover:shadow-gray-500/25"
          >
            RESET
          </button>
        </div>

        {/* Status indicator */}
        <div className="text-center">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${
            timeLeft === 0 
              ? 'bg-red-900/50 border-red-500 text-red-400' 
              : isActive 
                ? 'bg-green-900/50 border-green-500 text-green-400' 
                : 'bg-yellow-900/50 border-yellow-500 text-yellow-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              timeLeft === 0 
                ? 'bg-red-500' 
                : isActive 
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-yellow-500'
            }`}></div>
            <span className="text-xs font-mono">
              {timeLeft === 0 ? 'COMPLETED' : isActive ? 'RUNNING' : 'PAUSED'}
            </span>
          </div>
        </div>

        {/* Corner scan lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
      </div>
    </div>
  );
};

export default DigitalCountdown;
