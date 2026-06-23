import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './router';
import type { CartItem, Product } from './types';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } }
});

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => 
    JSON.parse(localStorage.getItem('cart') || '[]')
  );
  const [favorites, setFavorites] = useState<number[]>(() => 
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.findIndex(item => item.product.id === product.id);
      if (existing !== -1) {
        return prev.map((item, i) =>
          i === existing ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.product.id === productId && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => !(item.product.id === productId && item.qty === 1))
    );
  };

  const deleteFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Правильный подсчёт количества товаров
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter
          cart={cart}
          totalCount={totalCount}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onDeleteFromCart={deleteFromCart}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;