import { useState } from "react";
import DigitalCountdown from "../components/DigitalCountdown";

const CountdownWithClips = () => {
  const [phase, setPhase] = useState<"intro" | "countdown" | "outro">("intro");

  const handleIntroEnd = () => setPhase("countdown");
  const handleCountdownComplete = () => setPhase("outro");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {phase === "intro" && (
        <video
          src="/intro.webm"
          autoPlay
          controls
          className="w-full h-full object-cover"
          onEnded={handleIntroEnd}
        />
      )}

      {phase === "countdown" && (
        <DigitalCountdown onComplete={handleCountdownComplete} />
      )}

      {phase === "outro" && (
        <video
          src="/outro.webm"
          autoPlay
          controls
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default CountdownWithClips;