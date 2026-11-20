import { Icon } from '../../components/Icon/Icon';
import { useState } from 'react';
import styles from './ChooseRolePage.module.css';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/useAuth';

const ChooseRolePage = () => {
  const [role, setRole] = useState<'USER' | 'SHELTER' | null>(null);
  const { logout } = useAuth();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title} id="chooseRoleTitle">
            Як ви будете використовувати Adoptly?
          </h1>
          <p>Оберіть роль, щоб ми відкрили вам потрібний кабінет.</p>
        </div>
        <form>
          <fieldset
            className={styles.roleOptions}
            aria-labelledby="chooseRoleTitle"
          >
            <label className={styles.option}>
              <input
                type="radio"
                name="role"
                value="USER"
                checked={role === 'USER'}
                onChange={() => setRole('USER')}
              />
              <span className={styles.check}>
                <Icon id="icon-checkmark" className={styles.checkIcon} />
              </span>
              <span className={styles.iconBox}>
                <Icon id="icon-heart-outline" className={styles.icon} />
              </span>
              <span className={styles.optionTitle}>Я хочу взяти тварину</span>
              <span>
                Переглядайте тварин із притулків і подавайте заявку на
                усиновлення.
              </span>
            </label>
            <label className={styles.option}>
              <input
                type="radio"
                name="role"
                value="SHELTER"
                checked={role === 'SHELTER'}
                onChange={() => setRole('SHELTER')}
              />
              <span className={styles.check}>
                <Icon id="icon-checkmark" className={styles.checkIcon} />
              </span>
              <span className={styles.iconBox}>
                <Icon id="icon-house" className={styles.icon} />
              </span>
              <span className={styles.optionTitle}>Я представляю притулок</span>
              <span>
                Притулок або волонтерська ініціатива: створіть профіль і
                додавайте картки тварин.
              </span>
            </label>
          </fieldset>
          <p className={styles.note}>
            <Icon id="icon-circle-alert" className={styles.noteIcon} />
            Змінити роль самостійно пізніше не вийде. Якщо помилились — напишіть
            нам.
          </p>
          <div className={styles.actions}>
            <Button
              variant="action"
              maxWidth={240}
              height={55}
              disabled={!role}
            >
              Продовжити
            </Button>
          </div>
        </form>
        <div className={styles.actions}>
          <button type="button" className={styles.logout} onClick={logout}>
            Вийти з акаунта
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseRolePage;
