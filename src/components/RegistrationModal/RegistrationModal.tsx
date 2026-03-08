import React from 'react';
import Modal from '../Modal/Modal';

type RegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>Registration Modal</div>
    </Modal>
  );
};

export default RegistrationModal;
