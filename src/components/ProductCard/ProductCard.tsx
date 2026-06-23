import { useNavigate } from 'react-router-dom';
import type { CartItem, Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartItem?: CartItem;
  onRemoveFromCart?: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart, cartItem, onRemoveFromCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const inCart = cartItem ? cartItem.qty : 0;

  const formatPrice = (price: number) => price.toLocaleString('uz-UZ') + " so'm";

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span key={i} style={{ color: i < Math.floor(product.rating) ? '#F59E0B' : '#E5E7EB' }}>★</span>
  ));

  const handleCardClick = () => navigate(`/product/${product.id}`);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveFromCart?.(product.id);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.img}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/400x400/EEF2FF/4F46E5?text=${encodeURIComponent(product.title.slice(0, 8))}`;
          }}
        />
        <div className={styles.ratingBadge}>⭐ {product.rating}</div>
        <button style={{position:'absolute',top:10,right:10}} onClick={(e)=>{e.stopPropagation(); const f=JSON.parse(localStorage.getItem('favorites')||'[]'); const n=f.includes(product.id)?f.filter((x:number)=>x!==product.id):[...f,product.id]; localStorage.setItem('favorites',JSON.stringify(n));}}>❤️</button>
        {product.stock && product.stock <= 10 && (
          <div className={styles.stockBadge}>🔥 Kam qoldi</div>
        )}
      </div>

      <div className={styles.body}>
        {product.brand && <span className={styles.brand}>{product.brand}</span>}
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.stars}>{stars}</div>
        <div className={styles.footer}>
          <div>
            <div className={styles.price}>{formatPrice(product.price)}</div>
            <div className={styles.oldPrice}>{formatPrice(Math.round(product.price * 1.2))}</div>
          </div>

          {/* Cart controls */}
          {inCart > 0 ? (
            <div className={styles.qtyControl} onClick={e => e.stopPropagation()}>
              <button className={styles.qtyBtn} onClick={handleRemove}>−</button>
              <span className={styles.qtyNum}>{inCart}</span>
              <button className={styles.qtyBtn} onClick={handleAdd}>+</button>
            </div>
          ) : (
            <button className={styles.addBtn} onClick={handleAdd}>
              🛒
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
