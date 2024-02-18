import React from "react";

type ModalProps = {
  setTargetIndex: (value: string) => void;
  handleCopyRule: () => void;
  closeModal: () => void;
  options: string[];
};

export const Modal: React.FC<ModalProps> = ({
  setTargetIndex,
  handleCopyRule,
  closeModal,
  options,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 w-96">
        <h2 className="font-bold mb-4 text-black">
          Choose an index to copy the rule to
        </h2>
        <div className="relative inline-block w-full text-gray-700">
          <select
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
            onChange={(e) => setTargetIndex(e.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                stroke="#648299"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              ></path>
            </svg>
          </div>
        </div>
        <button
          className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleCopyRule}
        >
          Confirm
        </button>
        <button
          className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
