import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './router';
import type { CartItem, Product } from './types';
const queryClient = new QueryClient({defaultOptions:{queries:{staleTime:5*60*1000}}});
function App() {
 const [cart,setCart]=useState<CartItem[]>(()=>JSON.parse(localStorage.getItem('cart')||'[]'));
 const [favorites,setFavorites]=useState<number[]>(()=>JSON.parse(localStorage.getItem('favorites')||'[]'));
 useEffect(()=>{localStorage.setItem('cart',JSON.stringify(cart));},[cart]);
 useEffect(()=>{localStorage.setItem('favorites',JSON.stringify(favorites));},[favorites]);
 const addToCart=(product:Product)=>setCart(prev=>{const e=prev.find(i=>i.product.id===product.id); return e?prev.map(i=>i.product.id===product.id?{...i,qty:i.qty+1}:i):[...prev,{product,qty:1}]});
 const removeFromCart=(id:number)=>setCart(prev=>{const e=prev.find(i=>i.product.id===id); if(!e)return prev; return e.qty===1?prev.filter(i=>i.product.id!==id):prev.map(i=>i.product.id===id?{...i,qty:i.qty-1}:i)});
 const deleteFromCart=(id:number)=>setCart(prev=>prev.filter(i=>i.product.id!==id));
 const totalCount=cart.length;
 return <QueryClientProvider client={queryClient}><BrowserRouter><AppRouter cart={cart} totalCount={totalCount} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} onDeleteFromCart={deleteFromCart}/></BrowserRouter></QueryClientProvider>
}
export default App;