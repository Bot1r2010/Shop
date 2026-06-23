import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useBanners } from '../../hooks/useBanners';
import styles from './HeroSwiper.module.css';

const gradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #4F46E5 100%)',
  'linear-gradient(135deg, #0f2027 0%, #2196f3 100%)',
  'linear-gradient(135deg, #1a1a1a 0%, #16a34a 100%)',
];

const HeroSwiper = () => {
  const { data: banners } = useBanners();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    speed: 700,
    arrows: false,
    pauseOnHover: true,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: 24 }}><ul style={{ margin: 0 }}>{dots}</ul></div>
    ),
  };

  return (
    <div className={styles.wrapper}>
      <Slider {...settings}>
        {banners?.map((banner, idx) => (
          <div key={banner.id}>
            <div className={styles.slide}>
              <div className={styles.gradientBg} style={{ background: gradients[idx % 3] }} />
              <img
                src={banner.image}
                alt={banner.title}
                className={styles.bg}
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <span className={styles.badge}>✨ Yangi 2025</span>
                <h2 className={styles.title}>{banner.title}</h2>
                <p className={styles.subtitle}>{banner.subtitle}</p>
                <div className={styles.ctaRow}>
                  <button className={styles.ctaPrimary}>{banner.ctaText}</button>
                  <button className={styles.ctaSecondary}>Batafsil →</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSwiper;
