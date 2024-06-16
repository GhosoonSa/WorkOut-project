import React from "react";
import "../styling/TrainerProfileModal.css";

function Trainer({ show, onClose, trainer }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {trainer && (
          <div className="trainer-profile">
            <img
              src={trainer.img}
              alt={`${trainer.name}'s profile`}
              className="trainer-img"
            />
            <h3>{trainer.name}</h3>
            <p>Weight: {trainer.weight}</p>
            <p>Height: {trainer.height}</p>
            <p>Email: {trainer.email}</p>
            <p>BMI: {trainer.bmi}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Trainer;
