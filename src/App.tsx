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
  const [stage, setStage] = useState<"idle" | "intro" | "timer" | "outro">("idle");
  const outroRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setStage("intro");
  };

  const handleIntroEnd = () => {
    setStage("timer");
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
                <div className="min-h-screen bg-black flex items-center justify-center p-4">
                  {stage === "idle" && (
                    <button
                      className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-mono text-lg border border-cyan-400 transition-all"
                      onClick={handleStart}
                    >
                      Start Timer
                    </button>
                  )}

                  {stage === "intro" && (
                    <video
                      src="/clips/intro.webm"
                      className="w-full h-auto"
                      autoPlay
                      muted={false}
                      playsInline
                      onEnded={handleIntroEnd}
                      controls={false}
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
                      controls={false} // ✅ No buttons shown
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
