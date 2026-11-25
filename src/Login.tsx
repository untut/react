import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from './api/auth'
import { useAuthStore } from './store/authStore'
import styles from './Login.module.css'

function Login() {
  const [screen, setScreen] = useState<'login' | 'register'>('login')

  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.includes('@')) {
      setError('Введи почту')
      return
    }
    if (password.length < 4) {
      setError('Пароль должен быть минимум 4 символа')
      return
    }

    setLoading(true)
    try {
      const data = await login({ email, password })
      setToken(data.access_token)
      navigate('/profile')
    } catch {
      setError('Неверная почта или пароль')
    } finally {
      setLoading(false)
    }
  }

  if (screen === 'register') {
    return (
      <div className={styles.loginPage}>
        <Link to="/" className={styles.logo}>БлаБла Форум</Link>

        <div className={styles.card}>
          <h1>Регистрация</h1>
          <p className={styles.desc}>Создай аккаунт и присоединяйся к форуму</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.field}>
              <label>Имя пользователя</label>
              <input type="text" placeholder="Придумай ник" required />
            </div>

            <div className={styles.field}>
              <label>Электронная почта</label>
              <input type="email" placeholder="example@mail.com" required />
            </div>

            <div className={styles.field}>
              <label>Пароль</label>
              <input type="password" placeholder="Введи пароль" required />
            </div>

            <div className={styles.field}>
              <label>Повтори пароль</label>
              <input type="password" placeholder="Повтори пароль" required />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Создать аккаунт
            </button>
          </form>

          <p className={styles.switchText}>
            Уже есть аккаунт?{' '}
            <span className={styles.link} onClick={() => setScreen('login')}>
              Войти
            </span>
          </p>
        </div>

        <Link to="/" className={styles.backLink}>← Вернуться на главную</Link>
      </div>
    )
  }

  return (
    <div className={styles.loginPage}>
      <Link to="/" className={styles.logo}>БлаБла Форум</Link>

      <div className={styles.card}>
        <h1>С возвращением!</h1>
        <p className={styles.desc}>Войди, чтобы продолжить</p>

        <form onSubmit={handleLogin}>
          <div className={styles.field}>
            <label>Электронная почта</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введи пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p className={styles.switchText}>
          Ещё нет аккаунта?{' '}
          <span className={styles.link} onClick={() => setScreen('register')}>
            Регистрация
          </span>
        </p>
      </div>

      <Link to="/" className={styles.backLink}>← Вернуться на главную</Link>
    </div>
  )
}

export default Login