import styles from './ResetPasswordPage.module.css';

const ResetPasswordPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div>
          <h2>Відновлення паролю</h2>
          <p>Введіть ваш новий пароль нижче:</p>
        </div>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Новий пароль*</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Підтвердіть новий пароль*</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
          <button type="submit">Змінити пароль</button>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
