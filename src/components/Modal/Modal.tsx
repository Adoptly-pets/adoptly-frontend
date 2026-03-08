import React, { useEffect } from 'react';
import { Icon } from '../Icon/Icon';
import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  ariaLabel,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="modal-close" aria-label="Close">
          <Icon id="icon-Close" className="icon-close" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
