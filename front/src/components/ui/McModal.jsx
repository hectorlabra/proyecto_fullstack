import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./McModal.css";

/**
 * McModal - Dialog modal accesible
 * Maneja focus trap, cierre con ESC, overlay
 */
export default function McModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="mc-modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`mc-modal mc-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mc-modal-title"
      >
        {showCloseButton && (
          <button
            type="button"
            className="mc-modal__close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {title && (
          <div className="mc-modal__header">
            <h2 id="mc-modal-title" className="mc-modal__title">
              {title}
            </h2>
          </div>
        )}

        <div className="mc-modal__body">{children}</div>

        {footer && <div className="mc-modal__footer">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

McModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  closeOnOverlayClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
};
