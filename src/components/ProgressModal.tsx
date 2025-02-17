
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import "./ProgressModal.scss";

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  texts?: string[];
  className?: string;
}

export function ProgressModal({ 
  isOpen, 
  onClose, 
  duration = 3000,
  texts = ["Processing...", "Almost there...", "Finalizing..."],
  className 
}: ProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

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

      const textInterval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, duration / texts.length);

      return () => {
        clearInterval(interval);
        clearTimeout(textInterval);
      };
    }
  }, [isOpen, duration, texts.length]);

  return (
    <Dialog open={isOpen} onOpenChange={() => progress >= 100 && onClose()}>
      <DialogContent className={`progress-modal ${className || ''}`}>
        <div className="progress-modal__content">
          <div className="progress-modal__container">
            <div className="progress-modal__progress">
              <div 
                className="progress-modal__progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-modal__text-container">
              {texts.map((text, index) => (
                <p
                  key={text}
                  className={`progress-modal__text ${
                    currentTextIndex === index 
                      ? 'progress-modal__text--active'
                      : index < currentTextIndex
                      ? 'progress-modal__text--previous'
                      : ''
                  }`}
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
