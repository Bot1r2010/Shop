import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { MOCK_PRODUCTS } from '../api/mockData';
import type { CartItem, Product } from '../types';
import styles from './ProductDetailPage.module.css';

interface Props {
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  cart: CartItem[];
}

const ProductDetailPage = ({ onAddToCart, onRemoveFromCart, cart }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(Number(id));
  const { data: categories } = useCategories();
  const [wished, setWished] = useState(false);

  const category = categories?.find(c => c.id === product?.categoryId);
  const related = MOCK_PRODUCTS.filter(p => p.categoryId === product?.categoryId && p.id !== product?.id).slice(0, 4);

  const formatPrice = (price: number) => price.toLocaleString('uz-UZ') + " so'm";

  const cartItem = product ? cart.find(item => item.product.id === product.id) : undefined;
  const qtyInCart = cartItem?.qty ?? 0;

  if (isLoading) return (
    <div className={styles.loading}>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonLines}>
        {[60, 40, 100, 80, 50].map((w, i) => (
          <div key={i} className={styles.skeletonLine} style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );

  if (!product) return (
    <div className={styles.notFound}>
      <div>😕</div>
      <h2>Mahsulot topilmadi</h2>
      <button onClick={() => navigate('/')}>← Bosh sahifaga</button>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <nav className={styles.breadcrumb}>
          <Link to="/">Bosh sahifa</Link>
          <span>›</span>
          <Link to="/">{category?.icon} {category?.name}</Link>
          <span>›</span>
          <span>{product.title}</span>
        </nav>

        <div className={styles.main}>

          <div className={styles.imageCol}>
            <div className={styles.imageBox}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.mainImg}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://placehold.co/600x600/EEF2FF/4F46E5?text=${encodeURIComponent(product.title.slice(0, 8))}`;
                }}
              />
              {product.stock && product.stock <= 10 && (
                <div className={styles.lowStock}>🔥 Faqat {product.stock} ta qoldi</div>
              )}
            </div>
            <div className={styles.thumbRow}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`${styles.thumb} ${i === 0 ? styles.thumbActive : ''}`}>
                  <img src={product.image} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoCol}>
            {product.brand && <span className={styles.brand}>{product.brand}</span>}
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.ratingRow}>
              <span className={styles.stars}>
                {Array.from({length: 5}).map((_, i) => (
                  <span key={i} style={{color: i < Math.floor(product.rating) ? '#F59E0B' : '#E5E7EB'}}>★</span>
                ))}
              </span>
              <span className={styles.ratingVal}>{product.rating}</span>
              <span className={styles.reviewsCount}>124 sharh</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              <span className={styles.oldPrice}>{formatPrice(Math.round(product.price * 1.2))}</span>
              <span className={styles.discountBadge}>−20%</span>
            </div>

            <p className={styles.desc}>{product.description}</p>

            <div className={styles.divider} />

            {/* Add to cart with qty control */}
            <div className={styles.purchaseRow}>
              {qtyInCart > 0 ? (
                <div className={styles.qtyBoxBig}>
                  <button onClick={() => onRemoveFromCart(product.id)}>−</button>
                  <span>{qtyInCart} ta savatda</span>
                  <button onClick={() => onAddToCart(product)}>+</button>
                </div>
              ) : (
                <button className={styles.addBtn} onClick={() => onAddToCart(product)}>
                  🛒 Savatga qo'shish
                </button>
              )}
              <button
                className={`${styles.wishBtn} ${wished ? styles.wishedBtn : ''}`}
                onClick={() => setWished(w => !w)}
              >
                {wished ? '❤️' : '🤍'}
              </button>
            </div>

            <button
              className={styles.buyNowBtn}
              onClick={() => { if (qtyInCart === 0) onAddToCart(product); navigate('/cart'); }}
            >
              Hozir sotib olish →
            </button>

            <div className={styles.badges}>
              <div className={styles.badge}><span>🚚</span><span>Bepul yetkazish</span></div>
              <div className={styles.badge}><span>🔄</span><span>30 kun qaytarish</span></div>
              <div className={styles.badge}><span>🛡️</span><span>1 yil kafolat</span></div>
            </div>

            <div className={styles.specs}>
              <div className={styles.specRow}><span>Brend</span><span>{product.brand ?? '—'}</span></div>
              <div className={styles.specRow}><span>Kategoriya</span><span>{category?.icon} {category?.name}</span></div>
              <div className={styles.specRow}><span>Mavjudligi</span><span className={styles.inStock}>✅ Sotuvda bor</span></div>
              <div className={styles.specRow}><span>Reyting</span><span>⭐ {product.rating} / 5</span></div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className={styles.related}>
            <h2>O'xshash mahsulotlar</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <div
                  key={p.id}
                  className={styles.relatedCard}
                  onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0, 0); }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://placehold.co/300x300/EEF2FF/4F46E5?text=${encodeURIComponent(p.title.slice(0, 8))}`;
                    }}
                  />
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedTitle}>{p.title}</span>
                    <span className={styles.relatedPrice}>{formatPrice(p.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
