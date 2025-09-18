import React from 'react';

interface CrisisCardProps {
  onCallNow: () => void;
  onTryBreathing: () => void;
}

const CrisisCard: React.FC<CrisisCardProps> = ({ onCallNow, onTryBreathing }) => {
  return (
    <div className="max-w-md mx-auto bg-red-100 border border-red-600 text-red-800 rounded-xl shadow-md p-6 mb-4">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">⚠️ You are not alone. Help is available 24x7. If you ever feel unsafe, please reach out immediately.</p>
      </div>
      <div className="mb-4">
        <p className="font-medium mb-2">Verified Helplines:</p>
        <ul className="space-y-1">
          <li>
            <a
              href="tel:18005990019"
              className="text-red-700 hover:text-red-900 underline"
            >
              • KIRAN Helpline (24x7): 1800-599-0019
            </a>
          </li>
          <li>
            <a
              href="tel:+919152987821"
              className="text-red-700 hover:text-red-900 underline"
            >
              • iCALL Helpline: +91 9152987821
            </a>
          </li>
        </ul>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onCallNow}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
        >
          Call Now
        </button>
        <button
          onClick={onTryBreathing}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
        >
          Try Breathing Exercise
        </button>
      </div>
    </div>
  );
};

export default CrisisCard;
