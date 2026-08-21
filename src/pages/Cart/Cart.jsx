import "./Cart.css";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    Package,
    Monitor,
    Trash2,
    ShoppingCart
} from "lucide-react";

import AlertContext from "../../context/AlertContext";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import { imagenUrl } from "../../config/api";
import { obtenerLibros } from "../../services/libroService";

function Cart()
{
    const {
        cart,
        removeFromCart,
        updateQuantity
    } = useContext( CartContext );

    const { usuario } = useContext( AuthContext );
    const { mostrarMensaje } = useContext( AlertContext );

    const navigate = useNavigate();

    useEffect( () =>
    {
        if ( cart.length === 0 ) return;

        const validarCarrito = async () =>
        {
            try
            {
                const activosResp = await obtenerLibros();
                const activosIds = activosResp.data.map( l => l.id );
                const inactivos = cart.filter(
                    item => !activosIds.includes( item.id )
                );

                if ( inactivos.length > 0 )
                {
                    inactivos.forEach( item =>
                        removeFromCart( item.id, item.formato )
                    );
                    const nombres = inactivos.map( i => i.titulo ).join( ", " );
                    mostrarMensaje(
                        `Se removieron libros que ya no están disponibles: ${ nombres }`,
                        "warning"
                    );
                }
            }
            catch ( error )
            {
                console.error( "Error al validar carrito:", error );
            }
        };

        validarCarrito();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    const total = cart.reduce(
        ( acc, item ) =>
            acc + ( Number( item.precio ) * Number( item.quantity ) ),
        0
    );

    const finalizarCompra = () =>
    {
        if ( cart.length === 0 )
        {
            mostrarMensaje(
                "Tu carrito está vacío.",
                "warning"
            );

            return;
        }

        if ( !usuario )
        {
            mostrarMensaje(
                "Debes iniciar sesión para realizar una compra.",
                "warning"
            );

            navigate( "/login" );

            return;
        }

        navigate( "/checkout" );
    };

    const esFormatoFisico = ( formato ) =>
    {
        return formato === "Fisico" || formato === "Físico";
    };

    return (

        <main className="cart-page">

            <h1>
                Carrito de compras
            </h1>

            {cart.length === 0 ? (

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
                        type="button"
                        className="empty-cart-button"
                        onClick={ () => navigate( "/catalogo" ) }
                    >
                        Ver catálogo
                    </button>

                </div>

            ) : (

                <div className="cart-container">

                    <section className="cart-products">

                        {cart.map( ( item ) =>
                        {
                            const formatoFisico = esFormatoFisico(
                                item.formato
                            );

                            const precio = Number( item.precio );
                            const cantidad = Number( item.quantity );

                            const subtotal = precio * cantidad;

                            return (

                                <article
                                    className="cart-item"
                                    key={`${ item.id }-${ item.formato }`}
                                >

                                    <img
                                        src={
                                            item.imagen
                                                ? imagenUrl( item.imagen )
                                                : "/images/default-book.jpg"
                                        }
                                        alt={`Portada de ${ item.titulo }`}
                                    />

                                    <div className="cart-info">

                                        <h3>
                                            {item.titulo}
                                        </h3>

                                        <p>
                                            {item.autor}
                                        </p>

                                        <div className="cart-format">

                                            {formatoFisico
                                                ? <Package size={ 16 } />
                                                : <Monitor size={ 16 } />
                                            }

                                            <span>
                                                {formatoFisico
                                                    ? "Físico"
                                                    : "Virtual"
                                                }
                                            </span>

                                        </div>

                                        <p className="unit-price">

                                            Precio unitario:

                                            <strong>
                                                ${precio.toLocaleString( "es-CO" )}
                                            </strong>

                                        </p>

                                        {formatoFisico ? (

                                            <div className="quantity-control">

                                                <button
                                                    type="button"
                                                    aria-label={`Disminuir cantidad de ${ item.titulo }`}
                                                    onClick={ () =>
                                                        updateQuantity(
                                                            item.id,
                                                            cantidad > 1
                                                                ? cantidad - 1
                                                                : 1,
                                                            item.formato
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <strong>
                                                    {cantidad}
                                                </strong>

                                                <button
                                                    type="button"
                                                    aria-label={`Aumentar cantidad de ${ item.titulo }`}
                                                    onClick={ () =>
                                                        updateQuantity(
                                                            item.id,
                                                            cantidad + 1,
                                                            item.formato
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                        ) : (

                                            <div className="virtual-quantity">
                                                <span>
                                                    Cantidad: 1
                                                </span>
                                            </div>

                                        )}

                                        <p className="subtotal">

                                            Subtotal:

                                            <strong>
                                                ${subtotal.toLocaleString( "es-CO" )}
                                            </strong>

                                        </p>

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
                            );
                        })}

                    </section>

                    <aside className="cart-summary">

                        <h2>
                            Resumen de compra
                        </h2>

                        <h3>

                            Total:

                            <strong>
                                ${total.toLocaleString( "es-CO" )}
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

            )}

        </main>
    );
}

export default Cart;