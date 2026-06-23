import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import styles from './AuthPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  const errorMessage = error instanceof Error ? error.message : (error ? 'Email yoki parol noto\'g\'ri' : '');

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.logo}>🛍️ MiniShop</h1>
        <h2 className={styles.subtitle}>Hisobga kirish</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Parol</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting"
                required
              />
              <button type="button" className={styles.togglePass} onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          <button type="submit" className={styles.submit} disabled={isPending}>
            {isPending ? <span className={styles.spinner} /> : 'Kirish'}
          </button>
        </form>

        <p className={styles.link}>
          Hisobingiz yo'qmi?{' '}
          <Link to="/register">Ro'yxatdan o'ting</Link>
        </p>

        <p className={styles.hint}>
          💡 Avval ro'yxatdan o'tmagan bo'lsangiz, "Ro'yxatdan o'ting" tugmasini bosing.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
