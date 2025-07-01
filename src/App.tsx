import { useRef, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DigitalCountdown from "./components/DigitalCountdown";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [stage, setStage] = useState<"intro" | "timer" | "outro">("intro");
  const introRef = useRef<HTMLVideoElement>(null);
  const outroRef = useRef<HTMLVideoElement>(null);

  // Auto-play intro when component mounts
  useEffect(() => {
    if (stage === "intro" && introRef.current) {
      introRef.current.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }, [stage]);

  const handleIntroEnd = () => {
    setStage("timer");
  };

  const handleStartOutro = () => {
    setStage("outro");
    setTimeout(() => {
      outroRef.current?.play().catch((err) => {
        console.warn("Outro play error:", err);
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
                <div className="min-h-screen bg-black flex items-center justify-center">
                  {stage === "intro" && (
                    <video
                      ref={introRef}
                      src="/clips/intro.webm"
                      className="w-full h-auto"
                      autoPlay
                      muted
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
