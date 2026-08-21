import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from '../AuthContext';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

function useAuth() {
  return useContext(AuthContext);
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia sin usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.usuario).toBeNull();
  });

  it('login guarda el usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const userData = { nombre: 'Keiner', correo: 'test@test.com', rol: 'usuario' };

    act(() => result.current.login(userData));

    expect(result.current.usuario.nombre).toBe('Keiner');
    expect(result.current.usuario.rol).toBe('usuario');
  });

  it('login asigna rol usuario por defecto', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.login({ nombre: 'Keiner', correo: 'test@test.com' }));

    expect(result.current.usuario.rol).toBe('usuario');
  });

  it('logout limpia el usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.login({ nombre: 'Keiner', correo: 'test@test.com', rol: 'usuario' }));
    act(() => result.current.logout());

    expect(result.current.usuario).toBeNull();
  });

  it('updateUser actualiza datos del usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.login({ nombre: 'Keiner', correo: 'old@test.com', rol: 'usuario' }));
    act(() => result.current.updateUser({ correo: 'new@test.com' }));

    expect(result.current.usuario.correo).toBe('new@test.com');
    expect(result.current.usuario.nombre).toBe('Keiner');
  });

  it('persiste sesión en localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.login({ nombre: 'Keiner', correo: 'test@test.com', rol: 'admin' }));

    const guardado = JSON.parse(localStorage.getItem('usuarioActivo'));
    expect(guardado.nombre).toBe('Keiner');
    expect(guardado.rol).toBe('admin');
  });
});
