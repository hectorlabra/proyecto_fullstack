import { useEffect, useRef } from "react";
import { Button } from "./Button";
import "../../styles/ui/modal.css";

/**
 * Modal component with focus trap and accessibility
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.size='md'] - sm, md, lg, xl
 * @param {string} [props.variant='default'] - default, danger, warning, info
 * @param {boolean} [props.showCloseButton=true] - Show X button
 * @param {React.ReactNode} [props.footer] - Custom footer content
 * @param {boolean} [props.closeOnOverlayClick=true] - Close when clicking overlay
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  variant = "default",
  showCloseButton = true,
  footer,
  closeOnOverlayClick = true,
  className = "",
}) {
  const overlayRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Focus trap and escape key
  useEffect(() => {
    if (!isOpen) return;

    // Save previously focused element
    previousActiveElement.current = document.activeElement;

    // Focus first focusable element in modal
    const modal = overlayRef.current?.querySelector(".modal-content");
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Focus trap
    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      const modal = overlayRef.current?.querySelector(".modal-content");
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
      document.body.style.overflow = "";

      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalClasses = [
    "modal-content",
    size !== "md" ? `modal-${size}` : "",
    variant !== "default" ? `modal-${variant}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          {showCloseButton && (
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          )}
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

/**
 * ConfirmModal - Pre-configured confirmation modal
 */
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  isLoading = false,
}) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      closeOnOverlayClick={!isLoading}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Procesando..." : confirmText}
          </Button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}

export default Modal;
