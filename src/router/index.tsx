import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProtectedRoute from '../components/ProtectedRoute';
import type { CartItem, Product } from '../types';

interface AppRouterProps {
  cart: CartItem[];
  totalCount: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  onDeleteFromCart: (productId: number) => void;
  favorites: number[];
  toggleFavorite: (productId: number) => void;
}

const AppRouter = ({
  cart,
  totalCount,
  onAddToCart,
  onRemoveFromCart,
  onDeleteFromCart,
}: AppRouterProps) => {
  return (
    <>
      <Header cartCount={totalCount} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              cart={cart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              cart={cart}
            />
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage
                cart={cart}
                onAdd={onAddToCart}
                onRemove={onRemoveFromCart}
                onDelete={onDeleteFromCart}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default AppRouter;