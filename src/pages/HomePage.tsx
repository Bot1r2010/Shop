import { useState } from 'react';
import HeroSwiper from '../components/HeroSwiper/HeroSwiper';
import Categories from '../components/Categories/Categories';
import ProductCard from '../components/ProductCard/ProductCard';
import { useProducts } from '../hooks/useProducts';
import type { CartItem, Product } from '../types';
import styles from './HomePage.module.css';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  cart: CartItem[];
}

const sortOptions = [
  { value: 'default', label: 'Standart' },
  { value: 'price_asc', label: 'Narx: arzondan' },
  { value: 'price_desc', label: 'Narx: qimmatdan' },
  { value: 'rating', label: 'Reyting bo\'yicha' },
];

const HomePage = ({ onAddToCart, onRemoveFromCart, cart }: HomePageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [sort, setSort] = useState('default');
  const { data: products = [], isLoading } = useProducts(selectedCategory);

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const findCartItem = (productId: number) => cart.find(item => item.product.id === productId);

  return (
    <main className={styles.main}>
      <HeroSwiper />

      <div className={styles.statsBar}>
        <div className={styles.statsInner}>
          <div className={styles.statItem}><span>🚚</span><span>Toshkentga bepul yetkazish</span></div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}><span>🔄</span><span>30 kun qaytarish</span></div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}><span>🛡️</span><span>1 yil kafolat</span></div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}><span>💳</span><span>Bo'lib to'lash 0%</span></div>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Kategoriyalar</h2>
          <Categories selectedId={selectedCategory} onSelect={setSelectedCategory} />
        </section>

        <section className={styles.section}>
          <div className={styles.productsHeader}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory ? 'Mahsulotlar' : 'Barcha mahsulotlar'}
              {!isLoading && <span className={styles.count}>{sorted.length} ta</span>}
            </h2>
            <div className={styles.controls}>
              <select className={styles.sortSelect} value={sort} onChange={e => setSort(e.target.value)}>
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {selectedCategory && (
                <button className={styles.clearBtn} onClick={() => setSelectedCategory(undefined)}>
                  × Filtrni tozalash
                </button>
              )}
            </div>
          </div>

          <div className={styles.grid}>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <div key={i} className={styles.skeleton} />)
              : sorted.length === 0
              ? (
                <div className={styles.empty}>
                  <div className={styles.emptyIcon}>📦</div>
                  <p>Bu kategoriyada mahsulot topilmadi</p>
                  <button onClick={() => setSelectedCategory(undefined)} className={styles.emptyBtn}>
                    Hammasi ko'rish
                  </button>
                </div>
              )
              : sorted.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onRemoveFromCart={onRemoveFromCart}
                  cartItem={findCartItem(product.id)}
                />
              ))
            }
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
