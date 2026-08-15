import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import { ThemeProvider } from "./context/ThemeContext";


ReactDOM.createRoot(
    document.getElementById( "root" )
).render(

    <React.StrictMode>

        {/* Proveedor del tema claro/oscuro. */}
        <ThemeProvider>

            <AuthProvider>

                <CartProvider>

                    <AlertProvider>

                        <App />

                    </AlertProvider>

                </CartProvider>

            </AuthProvider>

        </ThemeProvider>

    </React.StrictMode>

);