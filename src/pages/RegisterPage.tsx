import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import styles from './AuthPage.module.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { mutate: register, isPending, error } = useRegister();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (name.trim().length < 2) return setValidationError("Ism kamida 2 ta belgi bo'lishi kerak");
    if (!email.includes('@')) return setValidationError("To'g'ri email kiriting");
    if (password.length < 6) return setValidationError("Parol kamida 6 ta belgi bo'lishi kerak");
    if (password !== confirm) return setValidationError('Parollar mos kelmadi');

    register({ name: name.trim(), email: email.trim(), password });
  };

  const serverErrorMessage = error instanceof Error ? error.message : (error ? 'Xatolik yuz berdi, qaytadan urinib ko\'ring' : '');
  const errorMessage = validationError || serverErrorMessage;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.logo}>🛍️ MiniShop</h1>
        <h2 className={styles.subtitle}>Ro'yxatdan o'tish</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Ism</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ismingiz"
              required
              minLength={2}
            />
          </div>

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
                placeholder="Kamida 6 ta belgi"
                required
                minLength={6}
              />
              <button type="button" className={styles.togglePass} onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label>Parolni tasdiqlash</label>
            <input
              type={showPass ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Parolni qaytaring"
              required
            />
          </div>

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          <button type="submit" className={styles.submit} disabled={isPending}>
            {isPending ? <span className={styles.spinner} /> : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <p className={styles.link}>
          Hisobingiz bormi?{' '}
          <Link to="/login">Kiring</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
