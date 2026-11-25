import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.page}>
      <h1>404 Страница не найдена</h1>
      <Link to="/" className={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  )
}

export default NotFound