import { Link, useParams } from 'react-router-dom'
import Header from './Header'
import styles from './Profile.module.css'

interface ProfilePost {
  id: number
  title: string
  text: string
  likes: number
  comments: number
}

const stats = [
  { label: 'Посты', value: 12 },
  { label: 'Подписчики', value: 48 },
  { label: 'Подписки', value: 35 },
]

const tags = ['🎨 Рисование', '🎵 Музыка', '🌙 Ночной житель']

const posts: ProfilePost[] = [
  { id: 1, title: 'Наконец закончила свой рисунок', text: 'Долго над ним работала, осталось пара правок', likes: 12, comments: 3 },
  { id: 2, title: 'Посоветуйте, во что поиграть', text: 'Последним понравилась sally face', likes: 8, comments: 5 },
]

function Profile() {
  const { id } = useParams<{ id: string }>()
  const profileId = id ?? '1'

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <Link to="/" className={styles.backLink}>
          ← Вернуться к постам
        </Link>

        <section className={styles.card}>
          <div className={styles.cover}>✧*｡٩(ˊᗜˋ*)و✧*｡</div>

          <div className={styles.info}>
            <div className={styles.userRow}>
              <div className={styles.avatar}>🐈</div>

              <div className={styles.userInfo}>
                <h1>pixel_cat</h1>
                <p className={styles.profileId}>ID профиля: {profileId}</p>
                <p className={styles.nickname}>@pixel_cat</p>
              </div>

              <button className={styles.editButton}>Редактировать профиль</button>
            </div>

            <p className={styles.description}>
              Рисую и делаю анимации, тг - t.me/myaamlya
            </p>

            <div className={styles.stats}>
              {stats.map((s) => (
                <div className={styles.stat} key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.posts}>
          <div className={styles.sectionHeading}>
            <h2>Посты пользователя</h2>
            <span>Последние публикации</span>
          </div>

          <div className={styles.postList}>
            {posts.map((p) => (
              <Link to={`/post/${p.id}`} className={styles.postCard} key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className={styles.postMeta}>
                  ♡ {p.likes} &nbsp; 💬 {p.comments}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile