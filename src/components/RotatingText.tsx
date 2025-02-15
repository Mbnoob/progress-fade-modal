
import React from 'react';

export function RotatingText() {
  return (
    <div className="rotatingText">
      <div className="rotatingText-content">
        <p className="rotatingText-description">
          Your application is being processed
        </p>
        <h2 className="rotatingText-adjective">Loading</h2>
        <h2 className="rotatingText-adjective">Processing</h2>
        <h2 className="rotatingText-adjective">Complete!</h2>
      </div>
    </div>
  );
}
