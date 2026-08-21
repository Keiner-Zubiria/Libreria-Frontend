import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../CartContext';
import CartContext from '../CartContext';
import { useContext } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

function useCart() {
  return useContext(CartContext);
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia con carrito vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
  });

  it('agrega un libro al carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const libro = { id: 1, titulo: '1984', formato: 'Físico', precio: 25000 };

    act(() => result.current.addToCart(libro));

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].titulo).toBe('1984');
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('aumenta cantidad si el libro ya está en el carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const libro = { id: 1, titulo: '1984', formato: 'Físico', precio: 25000 };

    act(() => result.current.addToCart(libro));
    act(() => result.current.addToCart(libro));

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it('libros con distinto formato se agregan por separado', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addToCart({ id: 1, titulo: '1984', formato: 'Físico', precio: 25000 }));
    act(() => result.current.addToCart({ id: 1, titulo: '1984', formato: 'Virtual', precio: 15000 }));

    expect(result.current.cart).toHaveLength(2);
  });

  it('elimina un libro del carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addToCart({ id: 1, titulo: '1984', formato: 'Físico', precio: 25000 }));
    act(() => result.current.removeFromCart(1, 'Físico'));

    expect(result.current.cart).toHaveLength(0);
  });

  it('actualiza la cantidad de un libro', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addToCart({ id: 1, titulo: '1984', formato: 'Físico', precio: 25000 }));
    act(() => result.current.updateQuantity(1, 5, 'Físico'));

    expect(result.current.cart[0].quantity).toBe(5);
  });

  it('vacía el carrito completamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addToCart({ id: 1, titulo: '1984', formato: 'Físico', precio: 25000 }));
    act(() => result.current.addToCart({ id: 2, titulo: 'Don Quijote', formato: 'Virtual', precio: 15000 }));
    act(() => result.current.clearCart());

    expect(result.current.cart).toEqual([]);
  });
});
