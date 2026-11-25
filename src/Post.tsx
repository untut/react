import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPost } from './api/posts'
import type { Post } from './store/postsStore'
import type { AsyncState } from './types/async'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './Post.module.css'

interface Comment {
  id: number
  avatar: string
  author: string
  time: string
  text: string
}

const comments: Comment[] = [
  { id: 1, avatar: '🌙', author: 'moonlight', time: '5 минут назад', text: 'Быстрее заканчивай, жду!' },
  { id: 2, avatar: '👾', author: 'ghost.exe', time: '3 минуты назад', text: 'Сколько времени ушло на рисунок?' },
  { id: 3, avatar: '🐸', author: 'frog.png', time: '1 минуту назад', text: 'Тоже сейчас пытаюсь закончить свой проект :)' },
]

function PostPage() {
  const { id } = useParams<{ id: string }>()

  const [state, setState] = useState<AsyncState<Post>>({ status: 'loading' })

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setState({ status: 'loading' })

    getPost(id)
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data })
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: 'error', error: 'Пост не найден или сервер не отвечает' })
        }
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.main}>
          <Link to="/" className={styles.backLink}>
            ← На главную
          </Link>

          {state.status === 'loading' && (
            <p className={styles.message}>Загрузка...</p>
          )}

          {state.status === 'error' && (
            <p className={styles.error}>Ошибка: {state.error}</p>
          )}

          {state.status === 'success' && (
            <article className={styles.fullPost}>
              <div className={styles.postHeader}>
                <div className={styles.avatar}>👤</div>
                <h3>{state.data.author}</h3>
              </div>

              <h1>{state.data.title}</h1>
              <p className={styles.text}>{state.data.content}</p>

              <button className={styles.likeButton}>♡ {state.data.likes}</button>
            </article>
          )}

          <section className={styles.comments}>
            <div className={styles.commentsHeading}>
              <h2>Комментарии</h2>
              <span>{comments.length}</span>
            </div>

            {comments.map((c) => (
              <article className={styles.comment} key={c.id}>
                <div className={styles.commentAvatar}>{c.avatar}</div>

                <div className={styles.commentContent}>
                  <div className={styles.commentMeta}>
                    <strong>
                      <Link to="/profile" className={styles.commentAuthor}>
                        {c.author}
                      </Link>
                    </strong>
                    <span>{c.time}</span>
                  </div>
                  <p>{c.text}</p>
                </div>
              </article>
            ))}

            <form className={styles.commentForm}>
              <textarea placeholder="Комментарий..." rows={2} />
              <button className={styles.sendButton} type="button">
                Отправить
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}

export default PostPage