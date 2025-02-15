
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
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setShowText(false);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, duration / 100);

      // Trigger text animation when progress hits certain points
      const textTimer = setTimeout(() => setShowText(true), duration / 3);

      return () => {
        clearInterval(interval);
        clearTimeout(textTimer);
      };
    }
  }, [isOpen, duration]);

  return (
    <Dialog open={isOpen} onOpenChange={() => progress >= 100 && onClose()}>
      <DialogContent className="sm:max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg">
        <div className="px-4 py-6 space-y-6">
          <div className="space-y-2">
            <Progress value={progress} className="h-2 w-full" />
            <div className="relative h-20 overflow-hidden">
              <p
                className={cn(
                  "text-lg text-center absolute w-full transition-all duration-500 transform",
                  showText
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                )}
              >
                Processing your request...
              </p>
              {progress >= 75 && (
                <p
                  className={cn(
                    "text-xl font-semibold text-center absolute w-full transition-all duration-500 transform",
                    progress >= 75
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                  )}
                >
                  Almost there!
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
