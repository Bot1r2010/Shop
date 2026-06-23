import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCurrentUser, useLogout } from '../../hooks/useAuth';
import styles from './Header.module.css';

interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  const navLinks = [
    { to: '/', label: 'Bosh sahifa' },
    { to: '/?cat=1', label: 'Elektronika' },
    { to: '/?cat=2', label: 'Kiyim' },
    { to: '/?cat=3', label: 'Sport' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛍️</span>
          <span>MiniShop</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.navLink} ${location.pathname === link.to ? styles.navActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Mahsulot qidirish..." className={styles.searchInput} />
        </div>

        <div className={styles.actions}>
          {user ? (
            <div className={styles.userMenu}>
              <div className={styles.userAvatar}>{user.name?.[0]?.toUpperCase() ?? '👤'}</div>
              <div className={styles.userDropdown}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
                <hr className={styles.dropdownDivider} />
                <button onClick={logout} className={styles.logoutItem}>Chiqish</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className={styles.loginBtn}>Kirish</Link>
          )}

          <button
            className={styles.cartBtn}
            onClick={() => accessToken ? navigate('/cart') : navigate('/login')}
            aria-label="Savat"
          >
            <span className={styles.cartIcon}>🛒</span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount > 99 ? '99+' : cartCount}</span>}
          </button>

          <button
            className={styles.burgerBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
};

export default Header;
