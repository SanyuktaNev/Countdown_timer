import { useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DigitalCountdown from "./components/DigitalCountdown";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [stage, setStage] = useState<"start" | "intro" | "fade" | "timer" | "outro">("start");
  const outroRef = useRef<HTMLVideoElement>(null);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);

  const handleStartExperience = () => {
    setStage("intro");
  };

  const handleIntroEnd = () => {
    setFadeOutIntro(true);
    setTimeout(() => {
      setStage("timer");
    }, 1000); // match fade duration
  };

  const handleStartOutro = () => {
    setStage("outro");
    setTimeout(() => {
      outroRef.current?.play().catch(() => {
        if (outroRef.current) {
          outroRef.current.muted = true;
          outroRef.current.play();
        }
      });
    }, 100);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
                  {stage === "start" && (
                    <button
                      onClick={handleStartExperience}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-mono text-lg border border-cyan-400 transition-all"
                    >
                      Start Timer
                    </button>
                  )}

                  {stage === "intro" && (
                    <video
                      src="/clips/intro.webm"
                      className={`w-full h-auto transition-opacity duration-1000 ${fadeOutIntro ? "opacity-0" : "opacity-100"}`}
                      autoPlay
                      muted={false}
                      playsInline
                      onEnded={handleIntroEnd}
                    />
                  )}

                  {stage === "timer" && (
                    <DigitalCountdown
                      onComplete={handleStartOutro}
                      onForceStop={handleStartOutro}
                    />
                  )}

                  {stage === "outro" && (
                    <video
                      ref={outroRef}
                      src="/clips/outro.webm"
                      className="w-full h-auto"
                      autoPlay
                      muted={false}
                      playsInline
                      controls={false}
                    />
                  )}
                </div>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
