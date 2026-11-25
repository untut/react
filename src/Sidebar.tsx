import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'

const categories = [
  { id: 1, icon: '💬', name: 'Общение' },
  { id: 2, icon: '🎨', name: 'Творчество' },
  { id: 3, icon: '🎮', name: 'Игры' },
  { id: 4, icon: '🧠', name: 'Психология' },
  { id: 5, icon: '🏛️', name: 'Политика' },
  { id: 6, icon: '🍕', name: 'Еда' },
  { id: 7, icon: '✏️', name: 'Дизайн' },
  { id: 8, icon: '💼', name: 'Работа' },
  { id: 9, icon: '💞', name: 'Знакомства' },
]

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.label}>КАТЕГОРИИ</p>

      <nav className={styles.navigation}>
        {categories.map((cat) => (
          <Link key={cat.id} to="/chat" className={styles.navLink}>
            <span>{cat.icon}</span>
            {cat.name}
          </Link>
        ))}
      </nav>

      <div className={styles.bottom}>
        <div className={styles.decoration}>✧</div>
        <p>Самый свободный форум</p>
      </div>
    </aside>
  )
}

export default Sidebar