
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // Duration in milliseconds
}

export function ProgressModal({ isOpen, onClose, duration = 3000 }: ProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Processing...", "Almost there...", "Finalizing..."];

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setCurrentTextIndex(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, duration / 100);

      // Text rotation timing
      const textInterval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, duration / 3);

      return () => {
        clearInterval(interval);
        clearTimeout(textInterval);
      };
    }
  }, [isOpen, duration]);

  return (
    <Dialog open={isOpen} onOpenChange={() => progress >= 100 && onClose()}>
      <DialogContent className="sm:max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg">
        <div className="px-4 py-6 space-y-6">
          <div className="space-y-2">
            <Progress value={progress} className="h-2 w-full" />
            <div className="h-24 relative overflow-hidden">
              {texts.map((text, index) => (
                <p
                  key={text}
                  className={cn(
                    "absolute w-full text-center transition-all duration-500 transform text-lg",
                    currentTextIndex === index
                      ? "translate-y-0 opacity-100"
                      : index < currentTextIndex
                      ? "-translate-y-full opacity-0"
                      : "translate-y-full opacity-0"
                  )}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
