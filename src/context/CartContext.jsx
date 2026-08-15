import { createContext, useEffect, useState } from "react";


// Contexto global del carrito.
const CartContext = createContext();

function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];

    });


    // Guarda automáticamente el carrito en el navegador.
    useEffect(() => {

        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );

    }, [cart]);


    // Agrega un libro al carrito.
    // Devuelve true si se agregó y false si no fue posible.
    const addToCart = (book) => {

        // Un libro virtual solo se compra una vez.
        const esVirtual = book.formato === "Virtual";

        const quantity = esVirtual
            ? 1
            : (book.quantity || 1);


        // El libro y el formato identifican el producto.
        // Así se puede comprar el mismo libro en físico y virtual.
        const existingBook = cart.find(

            (item) =>

                item.id === book.id &&

                item.formato === book.formato

        );


        if (existingBook) {

            // Si el libro virtual ya está en el carrito, no se agrega de nuevo.
            if (esVirtual) {

                return false;

            }


            setCart(

                cart.map((item) =>

                    item.id === book.id &&

                    item.formato === book.formato

                        ? {

                            ...item,

                            quantity: Math.min(

                                item.quantity + quantity,

                                item.stock || Infinity

                            )

                        }

                        : item

                )

            );

            return true;

        }

        setCart([

            ...cart,

            {

                ...book,

                quantity: Math.min(

                    quantity,

                    book.stock || Infinity

                )

            }

        ]);

        return true;

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
   

            }}

        >

            {children}

        </CartContext.Provider>

    );

}

export { CartProvider };

export default CartContext;