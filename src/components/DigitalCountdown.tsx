import { useState, useEffect } from "react";

interface DigitalCountdownProps {
  onComplete: () => void;
  onForceStop?: () => void;
}

const DigitalCountdown = ({ onComplete, onForceStop }: DigitalCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: secs.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setTimeLeft(24 * 60 * 60);
    setIsActive(false);
  };
  const stopCountdown = () => {
    setIsActive(false);
    onForceStop?.(); // Fire outro manually
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-mono text-cyan-400 mb-2 tracking-wider">
            INCEPTIA
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-8">
          <TimeBlock label="HOURS" value={hours} />
          <div className="text-4xl text-cyan-400 font-mono animate-pulse">:</div>
          <TimeBlock label="MINUTES" value={minutes} />
          <div className="text-4xl text-cyan-400 font-mono animate-pulse">:</div>
          <TimeBlock label="SECONDS" value={seconds} />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
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
          <button
            onClick={stopCountdown}
            className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-mono text-sm border border-red-500 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
          >
            STOP COUNTDOWN
          </button>
        </div>

        <div className="text-center">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${
              timeLeft === 0
                ? "bg-red-900/50 border-red-500 text-red-400"
                : isActive
                ? "bg-green-900/50 border-green-500 text-green-400"
                : "bg-yellow-900/50 border-yellow-500 text-yellow-400"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                timeLeft === 0
                  ? "bg-red-500"
                  : isActive
                  ? "bg-green-500 animate-pulse"
                  : "bg-yellow-500"
              }`}
            ></div>
            <span className="text-xs font-mono">
              {timeLeft === 0 ? "COMPLETED" : isActive ? "RUNNING" : "PAUSED"}
            </span>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
      </div>
    </div>
  );
};

const TimeBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="relative">
    <div className="bg-gray-900 border border-cyan-500/50 rounded-lg p-4 min-w-[80px]">
      <div className="text-4xl font-mono text-cyan-400 font-bold text-center relative">
        {value}
        <div className="absolute inset-0 text-cyan-400 opacity-50 blur-sm">{value}</div>
      </div>
      <div className="text-xs text-cyan-300 text-center mt-1 font-mono">{label}</div>
    </div>
    <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
    <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400"></div>
    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400"></div>
    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
  </div>
);

export default DigitalCountdown;
