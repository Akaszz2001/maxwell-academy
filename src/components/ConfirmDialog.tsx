import React from "react";

interface ConfirmDialogProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center border border-gray-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
