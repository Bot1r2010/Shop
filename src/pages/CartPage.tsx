import { Link } from 'react-router-dom';
import styles from './CartPage.module.css';
import type { CartItem, Product } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (productId: number) => void;
  onDelete: (productId: number) => void;
}

const CartPage = ({ cart, onAdd, onRemove, onDelete }: CartPageProps) => {
  const formatPrice = (p: number) => p.toLocaleString('uz-UZ') + " so'm";

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Savat bo'sh</h2>
        <p>Hali hech narsa qo'shilmagan. Xaridni boshlang!</p>
        <Link to="/" className={styles.shopLink}>Xarid qilish →</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>🛒 Savat <span>{itemCount} ta mahsulot</span></h1>

        <div className={styles.layout}>
          <div className={styles.itemsList}>
            {cart.map(({ product, qty }) => (
              <div key={product.id} className={styles.item}>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.itemImg}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/90x90/EEF2FF/4F46E5?text=img`; }}
                  />
                </Link>
                <div className={styles.itemBody}>
                  <div className={styles.itemHeader}>
                    {product.brand && <span className={styles.itemBrand}>{product.brand}</span>}
                    <Link to={`/product/${product.id}`} className={styles.itemTitleLink}>
                      <h3 className={styles.itemTitle}>{product.title}</h3>
                    </Link>
                    <div className={styles.itemRating}>{'★'.repeat(Math.round(product.rating))} {product.rating}</div>
                  </div>
                  <div className={styles.itemFooter}>
                    <div className={styles.qtyControl}>
                      <button onClick={() => onRemove(product.id)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => onAdd(product)}>+</button>
                    </div>
                    <div className={styles.itemPrices}>
                      <span className={styles.itemPrice}>{formatPrice(product.price * qty)}</span>
                      {qty > 1 && <span className={styles.itemUnit}>{formatPrice(product.price)} / ta</span>}
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => onDelete(product.id)}
                      title="O'chirish"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Buyurtma xulosasi</h3>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Mahsulotlar ({itemCount} ta)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Yetkazib berish</span>
                <span className={styles.freeDelivery}>Bepul</span>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Jami</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button className={styles.checkoutBtn} onClick={()=>{
const name=prompt("Ismingiz")||"";
const phone=prompt("Telefon")||"";
const address=prompt("Manzil")||"";
const items=cart.map(i=>`- ${i.product.title} x${i.qty}`).join("\n");
const text=`Yangi buyurtma%0AIsm: ${name}%0ATel: ${phone}%0AManzil: ${address}%0A${items}`;
window.open(`https://t.me/botirusmanaliev?text=${text}`,"_blank");
}}>Buyurtma berish →</button>

            <Link to="/" className={styles.continueLink}>← Xaridni davom ettirish</Link>

            <div className={styles.secureInfo}>
              <span>🔒 Xavfsiz to'lov</span>
              <span>·</span>
              <span>30 kun qaytarish</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
