import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <div className={styles.logo}>🛍️ MiniShop</div>
            <p>O'zbekistonning eng qulay online do'koni. Tez va xavfsiz yetkazib berish.</p>
            <div className={styles.social}>
              <a href="#" className={styles.socialBtn} aria-label="Telegram">✈️</a>
              <a href="#" className={styles.socialBtn} aria-label="Instagram">📷</a>
              <a href="#" className={styles.socialBtn} aria-label="Facebook">👥</a>
              <a href="#" className={styles.socialBtn} aria-label="YouTube">▶️</a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>Do'kon</h4>
            <Link to="/">Bosh sahifa</Link>
            <Link to="/">Barcha mahsulotlar</Link>
            <Link to="/">Aksiyalar</Link>
            <Link to="/">Yangi kelganlar</Link>
          </div>

          <div className={styles.col}>
            <h4>Mijoz</h4>
            <Link to="/login">Kirish</Link>
            <Link to="/register">Ro'yxatdan o'tish</Link>
            <Link to="/cart">Savat</Link>
            <Link to="/">Buyurtmalarim</Link>
          </div>

          <div className={styles.col}>
            <h4>Yordam</h4>
            <a href="#">Yetkazib berish</a>
            <a href="#">Qaytarish siyosati</a>
            <a href="#">Biz haqimizda</a>
            <a href="#">Aloqa</a>
          </div>

          <div className={styles.contacts}>
            <h4>Aloqa</h4>
            <div className={styles.contactItem}><span>📞</span><span>+998 71 123-45-67</span></div>
            <div className={styles.contactItem}><span>📧</span><span>info@minishop.uz</span></div>
            <div className={styles.contactItem}><span>📍</span><span>Toshkent, O'zbekiston</span></div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.container}>
          <span>© {year} MiniShop. Barcha huquqlar himoyalangan.</span>
          <div className={styles.payIcons}>
            <span>💳</span><span>Uzcard</span>
            <span>·</span>
            <span>💳</span><span>Humo</span>
            <span>·</span>
            <span>💳</span><span>Visa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
