import { useTranslation } from 'react-i18next';
import Modal from '../Modal/Modal';
import EmailConfirmPanel from '../EmailConfirmPanel/EmailConfirmPanel';

interface EmailConfirmModalProps {
  isOpen: boolean;
  email: string;
  messageKey: string;
  hasActiveRateLimit: boolean;
  onClose: () => void;
}

const EmailConfirmModal: React.FC<EmailConfirmModalProps> = ({
  isOpen,
  email,
  messageKey,
  hasActiveRateLimit,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={t('emailConfirm.title')}
    >
      <EmailConfirmPanel
        email={email}
        messageKey={messageKey}
        hasActiveRateLimit={hasActiveRateLimit}
      />
    </Modal>
  );
};

export default EmailConfirmModal;
