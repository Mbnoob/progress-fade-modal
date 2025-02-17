
import { useState } from "react";
import { ProgressModal } from "@/components/ProgressModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const customTexts = [
    "Starting the process...",
    "Gathering information...",
    "Almost finished...",
    "Complete!"
  ];

  return (
    <div className="demo-container">
      <div className="demo-container__content">
        <h1 className="demo-container__title">Progress Modal Demo</h1>
        <div>
          <div className="demo-container__section">
            <h2 className="demo-container__section-title">Default Progress</h2>
            <button 
              onClick={handleOpenModal}
              className="button button--default"
            >
              Open Default Modal
            </button>
            <ProgressModal 
              isOpen={isModalOpen} 
              onClose={handleCloseModal} 
              duration={3000}
            />
          </div>

          <div className="demo-container__section">
            <h2 className="demo-container__section-title">Custom Progress</h2>
            <button 
              onClick={handleOpenModal}
              className="button button--blue"
            >
              Open Custom Modal
            </button>
            <ProgressModal 
              isOpen={isModalOpen} 
              onClose={handleCloseModal}
              duration={5000}
              texts={customTexts}
              className="progress-modal--blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
