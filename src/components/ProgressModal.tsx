
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { RotatingText } from "./RotatingText";
import { cn } from "@/lib/utils";

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function ProgressModal({ isOpen, onClose, duration = 3000 }: ProgressModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, duration / 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isOpen, duration]);

  return (
    <Dialog open={isOpen} onOpenChange={() => progress >= 100 && onClose()}>
      <DialogContent className="sm:max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg">
        <div className="px-4 py-6 space-y-6">
          <div className="space-y-2">
            <Progress value={progress} className="h-2 w-full" />
            <div className="h-48 overflow-hidden">
              <RotatingText />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
