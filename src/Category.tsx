import { Link } from 'react-router-dom'
import Header from './Header'
import styles from './Category.module.css'

interface Message {
  id: number
  avatar: string
  author: string
  time: string
  text: string
}

const messages: Message[] = [
  { id: 1, avatar: '🌙', author: 'moonlight', time: '15:42', text: 'Всем привет:) Как у вас дела?' },
  { id: 2, avatar: '🐈', author: 'pixel_cat', time: '15:45', text: 'Привет! Сижу смотрю сериал' },
  { id: 3, avatar: '👾', author: 'ghost.exe', time: '15:47', text: 'А я играю' },
]

function Category() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.content}>
        <Link to="/" className={styles.backLink}>
          ← На главную
        </Link>

        <section className={styles.welcome}>
          <h1>Общение</h1>
          <p>Разговоры на любые темы</p>
        </section>

        <section className={styles.chat}>
          <div className={styles.chatHeader}>
            <span className={styles.chatCount}>{messages.length} сообщения</span>
          </div>

          <div className={styles.messages}>
            {messages.map((msg) => (
              <article className={styles.message} key={msg.id}>
                <Link to="/profile" className={styles.avatarLink}>
                  <div className={styles.avatar}>{msg.avatar}</div>
                </Link>

                <div className={styles.messageContent}>
                  <div className={styles.user}>
                    <strong>
                      <Link to="/profile" className={styles.author}>
                        {msg.author}
                      </Link>
                    </strong>
                    <span>{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              </article>
            ))}
          </div>

          <form className={styles.inputArea}>
            <input type="text" placeholder="Cообщение..." disabled />
            <button type="button" disabled>
              Отправить
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Category