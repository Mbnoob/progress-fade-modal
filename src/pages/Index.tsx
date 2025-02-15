
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-8">Progress Modal Demo</h1>
        <Button 
          onClick={handleOpenModal}
          className="px-6 py-3 rounded-lg bg-black text-white hover:bg-black/90 transition-colors"
        >
          Open Progress Modal
        </Button>
        <ProgressModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          duration={3000}
        />
      </div>
    </div>
  );
};

export default Index;
