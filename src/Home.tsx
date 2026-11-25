import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePostsStore } from './store/postsStore'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './Home.module.css'

const categories = [
  { id: 1, icon: '💬', name: 'Общение', text: 'Разговоры на любые темы' },
  { id: 2, icon: '🎨', name: 'Творчество', text: 'Рисунки, музыка и идеи' },
  { id: 3, icon: '🎮', name: 'Игры', text: 'Игры и поиск пати' },
]

function Home() {
  const state = usePostsStore((s) => s.state)
  const fetchPosts = usePostsStore((s) => s.fetchPosts)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.main}>
          <section className={styles.welcome}>
            <p className={styles.eyebrow}>Самый свободный форум</p>
            <h1>
              Пиши что хочешь <span>˚✧₊⁎(˃ᴗ˂)⁎⁺˳✧</span>
            </h1>
            <p className={styles.welcomeText}>где хочешь и как хочешь</p>
          </section>

          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <Link to="/chat" className={styles.categoryCard} key={cat.id}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <h3>{cat.name}</h3>
                <p>{cat.text}</p>
              </Link>
            ))}
          </div>

          <section className={styles.posts}>
            <div className={styles.sectionHeading}>
              <h2>Посты</h2>
              <span className={styles.sectionNote}>Недавно опубликовано</span>
            </div>

            {(state.status === 'idle' || state.status === 'loading') && (
              <p className={styles.message}>Загрузка...</p>
            )}

            {state.status === 'error' && (
              <p className={styles.error}>Ошибка: {state.error}</p>
            )}

            {state.status === 'success' && (
              <div className={styles.postList}>
                {state.data.length === 0 && (
                  <p className={styles.message}>Постов пока нет</p>
                )}

                {state.data.map((post) => (
                  <article className={styles.postCard} key={post.id}>
                    <div className={styles.postHeader}>
                      <div className={styles.avatar}>👤</div>
                      <h3>{post.author}</h3>
                    </div>

                    <h4 className={styles.postTitle}>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </h4>
                    <p className={styles.postText}>{post.content}</p>

                    <button className={styles.likeButton}>♡ {post.likes}</button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default Home