
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressModal } from "@/components/ProgressModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Example of custom texts and duration
  const customTexts = [
    "Starting the process...",
    "Gathering information...",
    "Almost finished...",
    "Complete!"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-8">Progress Modal Demo</h1>
        <div className="space-y-4">
          {/* Default Progress Modal */}
          <div>
            <h2 className="text-xl mb-2">Default Progress</h2>
            <Button 
              onClick={handleOpenModal}
              className="px-6 py-3 rounded-lg bg-black text-white hover:bg-black/90 transition-colors"
            >
              Open Default Modal
            </Button>
            <ProgressModal 
              isOpen={isModalOpen} 
              onClose={handleCloseModal} 
              duration={3000}
            />
          </div>

          {/* Custom Progress Modal */}
          <div>
            <h2 className="text-xl mb-2">Custom Progress</h2>
            <Button 
              onClick={handleOpenModal}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Open Custom Modal
            </Button>
            <ProgressModal 
              isOpen={isModalOpen} 
              onClose={handleCloseModal}
              duration={5000}
              texts={customTexts}
              className="bg-blue-50/80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
