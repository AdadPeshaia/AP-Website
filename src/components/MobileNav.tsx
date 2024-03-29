import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      x: "100%", // Start off-screen to the right
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      x: 0, // Move into view
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: "100%", // Exit off-screen to the right
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // Function to handle closing the modal with an animation
  const handleClose = () => {
    setIsOpen(false);
  };

  // Wrap navigation link action to ensure animation plays on navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default link action
    const targetUrl = e.currentTarget.getAttribute("href"); // Get the target URL

    handleClose(); // Close the modal with animation

    // Navigate after the animation duration
    setTimeout(() => {
      if (targetUrl) {
        window.location.href = targetUrl; // Replace with your routing logic if using a router
      }
    }, 500); // Match the duration of the exit transition
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-50"
        >
          {/* SVG Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="w-8 h-8 hover:text-blue-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 bg-slate-700 flex justify-center items-center"
          >
            {/* This div now only stops propagation of the click event, without closing the modal */}
            <div onClick={(e) => e.stopPropagation()} className="text-center">
              <a
                href="/"
                className="text-gray-200 text-xl hover:text-white block"
                onClick={handleNavigation}
              >
                Home
              </a>
              <a
                href="/"
                className="text-gray-200 text-xl hover:text-white block mt-4"
                onClick={handleNavigation}
              >
                About
              </a>
            </div>
            {/* Close button specifically for closing the modal */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 m-2 z-50"
            >
              {/* SVG for Close Button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-8 h-8 hover:text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
