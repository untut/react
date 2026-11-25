import { Link } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import styles from './Header.module.css'

function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>✧*｡٩(ˊᗜˋ*)و✧*｡</span> БлаБла Форум
      </Link>

      <div className={styles.actions}>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={styles.button}>
              Профиль
            </Link>
            <button className={styles.button} onClick={logout}>
              Выйти
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.button}>
            Войти
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header