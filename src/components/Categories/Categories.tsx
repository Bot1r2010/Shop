import { useCategories } from '../../hooks/useCategories';
import styles from './Categories.module.css';

interface CategoriesProps {
  selectedId?: number;
  onSelect: (id?: number) => void;
}

const Categories = ({ selectedId, onSelect }: CategoriesProps) => {
  const { data: categories } = useCategories();

  const allBtn = [{ id: undefined as number | undefined, name: 'Hammasi', icon: '🏪' }];
  const items = [...allBtn, ...(categories ?? [])];

  return (
    <div className={styles.wrapper}>
      {items.map((cat) => (
        <button
          key={cat.id ?? 'all'}
          className={`${styles.chip} ${selectedId === cat.id ? styles.active : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className={styles.icon}>{cat.icon}</span>
          <span className={styles.name}>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Categories;
