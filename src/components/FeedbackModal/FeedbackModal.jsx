import React, { useState } from 'react';
import './FeedbackModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';

const FeedbackModal = ({ setShowFeedback }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;

    try {
      await axios.post("https://dailycrave-backend1.onrender.com/api/feedback", { feedback });
      toast.success("Feedback submitted successfully!");
      setShowConfetti(true);

      // Confetti clears after 3 seconds and modal closes
      setTimeout(() => {
        setShowConfetti(false);
        setShowFeedback(false);
      }, 3000);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="feedback-modal-overlay">
        <div className="feedback-modal">
          <h2>We value your feedback!</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              name="feedback"
              placeholder="Type your feedback here..."
              required
            />
            <div className="feedback-modal-buttons">
              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => setShowFeedback(false)}
                className="close-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;
