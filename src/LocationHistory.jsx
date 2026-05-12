import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";

function LocationEntry({ entry, index }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${entry.latitude}&lon=${entry.longitude}&format=json&accept-language=en`
      )
        .then((res) => res.json())
        .then((data) => {
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county;
          const country = data.address.country;
          if (city && country) setLocation(`${city}, ${country}`);
          else if (country) setLocation(country);
        })
        .catch(() => {});
    }, index * 1000);
    return () => clearTimeout(timer);
  }, [entry, index]);

  const date = new Date(entry.updatedAt);
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b border-gray-100 py-3 flex items-start gap-3">
      <MapPin size={16} className="text-red-400 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-sm text-gray-900 font-medium">{formatted}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {location ||
            `${entry.latitude.toFixed(4)}, ${entry.longitude.toFixed(4)}`}
        </p>
      </div>
    </div>
  );
}

export default function LocationHistory({ locations, isOpen, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[60vh] overflow-y-auto p-6 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-1">Location History</h3>
            <p className="text-sm text-gray-500 mb-4">
              {locations.length} location
              {locations.length !== 1 ? "s" : ""} recorded
            </p>
            <div>
              {locations.map((entry, i) => (
                <LocationEntry key={entry.updatedAt} entry={entry} index={i} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
