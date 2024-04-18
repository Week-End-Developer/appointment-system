import styles from './styles.module.scss'

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>Doktor</span>
          <span>Randevu Sistemi</span>
        </div>
        <div>Randevu Al</div>
      </div>
    </div>
  );
}

export default Header;
