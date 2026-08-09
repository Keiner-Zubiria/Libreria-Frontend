import { createContext, useEffect, useState } from "react";

// Contexto global del carrito.
const CartContext = createContext();

function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];

    });

    const [showMessage, setShowMessage] = useState(false);


    // Guarda automáticamente el carrito en el navegador.
    useEffect(() => {

        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );

    }, [cart]);


    // Agrega un libro al carrito.
    const addToCart = (book) => {

        const quantity = book.quantity || 1;


        // El libro y el formato identifican el producto.
        // Así se puede comprar el mismo libro en físico y virtual.
        const existingBook = cart.find(

            (item) =>

                item.id === book.id &&

                item.formato === book.formato

        );


        if (existingBook) {

            setCart(

                cart.map((item) =>

                    item.id === book.id &&

                    item.formato === book.formato

                        ? {

                            ...item,

                            quantity: item.quantity + quantity

                        }

                        : item

                )

            );

        }

        else {

            setCart([

                ...cart,

                {

                    ...book,

                    quantity

                }

            ]);

        }


        // Mostrar mensaje de confirmación.
        setShowMessage(true);

        setTimeout(() => {

            setShowMessage(false);

        }, 2000);

    };


    // Elimina un producto específico del carrito.
    const removeFromCart = (id, formato) => {

        setCart(

            cart.filter(

                (item) =>

                    !(
                        item.id === id &&

                        item.formato === formato
                    )

            )

        );

    };


    // Cambia la cantidad de un producto específico.
    const updateQuantity = (id, quantity, formato) => {

        setCart(

            cart.map((item) =>

                item.id === id &&

                item.formato === formato

                    ? {

                        ...item,

                        quantity

                    }

                    : item

            )

        );

    };


    // Vacía completamente el carrito.
    const clearCart = () => {

        setCart([]);

    };


    return (

        <CartContext.Provider

            value={{

                cart,

                addToCart,

                removeFromCart,

                updateQuantity,

                clearCart,

                showMessage

            }}

        >

            {children}

        </CartContext.Provider>

    );

}

export { CartProvider };

export default CartContext;