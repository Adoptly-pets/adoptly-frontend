import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ShelterNavList from '../ShelterNavList/ShelterNavList';
import ShelterLogoutButton from '../ShelterLogoutButton/ShelterLogoutButton';
import styles from './ShelterMobileMenu.module.css';

interface ShelterMobileMenuProps {
  id: string;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const ShelterMobileMenu: React.FC<ShelterMobileMenuProps> = ({
  id,
  onClose,
  triggerRef,
}) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !cardRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [onClose, triggerRef]);

  return (
    <div id={id} ref={cardRef} className={styles.card}>
      {/* TODO: replace with real shelter name from backend */}
      <p className={styles.title}>Назва притулку</p>
      <nav aria-label={t('shelter.menu.ariaLabel')}>
        <ShelterNavList onItemClick={onClose} />
        <ShelterLogoutButton />
      </nav>
    </div>
  );
};

export default ShelterMobileMenu;
