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
  const [stage, setStage] = useState<"intro" | "timer" | "outro" | "start">("start");
  const introRef = useRef<HTMLVideoElement>(null);
  const outroRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setStage("intro");
    setTimeout(() => {
      introRef.current?.play();
    }, 100);
  };

  const handleIntroEnd = () => {
    setStage("timer");
  };

  const handleStartOutro = () => {
    setStage("outro");
    setTimeout(() => {
      outroRef.current?.play();
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
                <div className="min-h-screen bg-black flex items-center justify-center">
                  {stage === "start" && (
                    <button
                      onClick={handleStart}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-mono text-lg border border-cyan-400 transition-all"
                    >
                      Start Experience
                    </button>
                  )}

                  {stage === "intro" && (
                    <video
                      ref={introRef}
                      src="/clips/intro.webm"
                      className="w-full h-auto"
                      controls={false}
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
                      playsInline
                      controls
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
