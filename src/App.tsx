import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DigitalCountdown from "./components/DigitalCountdown";

const queryClient = new QueryClient();

const App = () => {
  const [stage, setStage] = useState<"intro" | "timer" | "outro">("intro");
  const introRef = useRef<HTMLVideoElement | null>(null);
  const outroRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (stage === "intro") {
      introRef.current?.play().catch((err) =>
        console.warn("Intro autoplay failed", err)
      );
    }
    if (stage === "outro") {
      outroRef.current?.play().catch((err) =>
        console.warn("Outro autoplay failed", err)
      );
    }
  }, [stage]);

  const handleIntroEnd = () => setStage("timer");
  const handleTimerEnd = () => setStage("outro");

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
                  {stage === "intro" && (
                    <video
                      ref={introRef}
                      src="/clips/intro.webm"
                      className="w-full h-auto"
                      controls
                      playsInline
                      onEnded={handleIntroEnd}
                    />
                  )}

                  {stage === "timer" && (
                    <DigitalCountdown
                      onComplete={handleTimerEnd}
                      onForceStop={handleTimerEnd}
                    />
                  )}

                  {stage === "outro" && (
                    <video
                      ref={outroRef}
                      src="/clips/outro.webm"
                      className="w-full h-auto"
                      controls
                      playsInline
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
