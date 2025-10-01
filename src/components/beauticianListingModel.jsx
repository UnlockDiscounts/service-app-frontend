export default function Modal({ open, onClose, children }) {
  if (!open) return null; // Don't render anything if closed

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose} // closes when clicking background
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()} // stops closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
}
