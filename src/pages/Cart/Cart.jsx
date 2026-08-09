import "./Cart.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import
{
    Package,
    Monitor,
    Trash2,
    ShoppingCart
} from "lucide-react";

import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";


// Página del carrito de compras.
function Cart()
{

    const {

        cart,

        removeFromCart,

        updateQuantity

    } = useContext( CartContext );


    const { usuario } = useContext( AuthContext );

    const navigate = useNavigate();


    // Calcula el total de la compra.
    const total = cart.reduce(

        ( acc, item ) =>

            acc + (

                item.precio *

                item.quantity

            ),

        0

    );


    // Envía al checkout.
    const finalizarCompra = () =>
    {

        if ( cart.length === 0 )
        {

            alert(

                "Tu carrito está vacío."

            );

            return;

        }


        if ( !usuario )
        {

            alert(

                "Debes iniciar sesión para realizar una compra."

            );

            navigate( "/login" );

            return;

        }


        navigate( "/checkout" );

    };


    return (

        <main className="cart-page">


            <h1>

                Carrito de compras

            </h1>


            {

                cart.length === 0

                    ? (

                        <div className="empty-cart">

                            <ShoppingCart size={ 80 } />

                            <h2>
                                Tu carrito está vacío
                            </h2>

                            <p>
                                Aún no tienes libros agregados.
                                Explora nuestro catálogo y encuentra tu próxima lectura.
                            </p>

                            <button
                                className="empty-cart-button"
                                onClick={ () => navigate( "/catalogo" ) }
                            >
                                Ver catálogo
                            </button>

                        </div>

                    )

                    : (

                        <div className="cart-container">


                            {/* Productos */ }
                            <section className="cart-products">

                                {

                                    cart.map( ( item ) =>

                                    (

                                        <article

                                            className="cart-item"

                                            key={

                                                `${ item.id }-${ item.formato }`

                                            }

                                        >


                                            {/* Imagen */ }
                                            <img

                                                src={ item.imagen }

                                                alt={ item.titulo }

                                            />


                                            {/* Información */ }
                                            <div className="cart-info">


                                                <h3>

                                                    { item.titulo }

                                                </h3>


                                                <p>

                                                    { item.autor }

                                                </p>


                                                {/* Formato */ }
                                                <div className="cart-format">

                                                    {

                                                        item.formato === "Virtual"

                                                            ? (

                                                                <Monitor

                                                                    size={ 16 }

                                                                />

                                                            )

                                                            : (

                                                                <Package

                                                                    size={ 16 }

                                                                />

                                                            )

                                                    }


                                                    <span>

                                                        {

                                                            item.formato === "Virtual"

                                                                ? "Virtual"

                                                                : "Físico"

                                                        }

                                                    </span>

                                                </div>


                                                {/* Precio */ }
                                                <p className="unit-price">

                                                    Precio unitario:

                                                    <strong>

                                                        $

                                                        {

                                                            item.precio.toLocaleString(

                                                                "es-CO"

                                                            )

                                                        }

                                                    </strong>

                                                </p>


                                                {/* Cantidad */ }

                                                {

                                                    item.formato === "Fisico"

                                                        ? (

                                                            <div className="quantity-control">

                                                                <button

                                                                    type="button"

                                                                    onClick={ () =>

                                                                        updateQuantity(

                                                                            item.id,

                                                                            item.quantity > 1

                                                                                ? item.quantity - 1

                                                                                : 1,

                                                                            item.formato

                                                                        )

                                                                    }

                                                                >

                                                                    −

                                                                </button>


                                                                <strong>

                                                                    { item.quantity }

                                                                </strong>


                                                                <button

                                                                    type="button"

                                                                    onClick={ () =>

                                                                        updateQuantity(

                                                                            item.id,

                                                                            item.quantity + 1,

                                                                            item.formato

                                                                        )

                                                                    }

                                                                >

                                                                    +

                                                                </button>

                                                            </div>

                                                        )

                                                        : (



                                                            <div className="virtual-quantity">

                                                                <span>

                                                                    Cantidad: 1

                                                                </span>

                                                            </div>

                                                        )

                                                }


                                                {/* Subtotal */ }
                                                <p className="subtotal">

                                                    Subtotal:

                                                    <strong>

                                                        $

                                                        {

                                                            (

                                                                item.precio *

                                                                item.quantity

                                                            ).toLocaleString(

                                                                "es-CO"

                                                            )

                                                        }

                                                    </strong>

                                                </p>


                                                {/* Eliminar */ }
                                                <button

                                                    type="button"

                                                    className="remove-button"

                                                    onClick={ () =>

                                                        removeFromCart(

                                                            item.id,

                                                            item.formato

                                                        )

                                                    }

                                                >

                                                    <Trash2 size={ 17 } />

                                                    Eliminar

                                                </button>


                                            </div>

                                        </article>

                                    ) )

                                }

                            </section>


                            {/* Resumen */ }
                            <aside className="cart-summary">


                                <h2>

                                    Resumen de compra

                                </h2>


                                <h3>

                                    Total:

                                    <strong>

                                        $

                                        {

                                            total.toLocaleString(

                                                "es-CO"

                                            )

                                        }

                                    </strong>

                                </h3>


                                <button

                                    type="button"

                                    className="buy-button"

                                    onClick={ finalizarCompra }

                                >

                                    Continuar compra

                                </button>


                            </aside>


                        </div>

                    )

            }


        </main>

    );

}


export default Cart;