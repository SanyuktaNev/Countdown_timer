import { useState, useRef } from "react";
import DigitalCountdown from "@/components/DigitalCountdown";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
  const introRef = useRef<HTMLVideoElement | null>(null);
  const outroRef = useRef<HTMLVideoElement | null>(null);

  const handleStart = () => {
    setStarted(true);
    setShowIntro(true);
    introRef.current?.play();
  };

  const handleIntroEnd = () => {
    setShowIntro(false);
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setShowOutro(true);
    outroRef.current?.play();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {!started && (
        <button
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-mono text-lg border border-cyan-400 transition-all"
          onClick={handleStart}
        >
          Start Experience
        </button>
      )}

      {showIntro && (
        <video
          ref={introRef}
          src="/clips/intro.webm"
          className="w-full h-auto"
          controls
          playsInline
          onEnded={handleIntroEnd}
        />
      )}

      {showCountdown && (
        <DigitalCountdown
          onComplete={handleCountdownComplete}
          onForceStop={handleCountdownComplete}
        />
      )}

      {showOutro && (
        <video
          ref={outroRef}
          src="/clips/outro.webm"
          className="w-full h-auto"
          controls
          playsInline
        />
      )}
    </div>
  );
};

export default Index;
