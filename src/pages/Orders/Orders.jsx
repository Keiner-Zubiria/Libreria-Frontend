import "./Orders.css";

import { useState } from "react";

import
{
    Package,
    Monitor,
    ShoppingBag,
    ChevronDown,
    ChevronUp,
    User,
    CreditCard,
    Calendar
} from "lucide-react";


// Página donde el usuario puede consultar sus pedidos.
function Orders()
{

    const pedidos = JSON.parse(

        localStorage.getItem("pedidos")

    ) || [];


    // Controla qué pedido está abierto.
    const [ pedidoAbierto, setPedidoAbierto ] = useState(null);


    // Abre o cierra los detalles de un pedido.
    const togglePedido = (id) =>
    {

        setPedidoAbierto(

            pedidoAbierto === id

                ? null

                : id

        );

    };


    return (

        <main className="orders-page">

            <section className="orders-card">


                {/* Encabezado de la página */}
                <div className="orders-header">

                    <Package size={32} />

                    <div>

                        <h1>

                            Mis pedidos

                        </h1>

                        <p>

                            Consulta el historial de tus compras.

                        </p>

                    </div>

                </div>


                {

                    // Mensaje cuando no existen pedidos.
                    pedidos.length === 0

                        ? (

                            <div className="orders-empty">

                                <ShoppingBag size={55} />

                                <h2>

                                    No tienes pedidos todavía

                                </h2>

                                <p>

                                    Cuando realices una compra,
                                    aparecerá aquí.

                                </p>

                            </div>

                        )

                        : (

                            // Lista de pedidos realizados.
                            <div className="orders-list">

                                {

                                    pedidos.map((pedido) =>

                                    (

                                        <article

                                            className="order-item"

                                            key={pedido.id}

                                        >


                                            {/* Encabezado del pedido */}
                                            <div className="order-top">

                                                <div className="order-info">

                                                    <strong>

                                                        Pedido #{pedido.id}

                                                    </strong>


                                                    <span>

                                                        <Calendar size={14} />

                                                        {pedido.fecha}

                                                    </span>

                                                </div>


                                                <div className="order-header-right">

                                                    {/* Estado del pedido */}
                                                    <span className="order-status">

                                                        {pedido.estado}

                                                    </span>


                                                    {/* Botón para mostrar los detalles */}
                                                    <button

                                                        type="button"

                                                        className="details-button"

                                                        onClick={() =>

                                                            togglePedido(

                                                                pedido.id

                                                            )

                                                        }

                                                    >

                                                        {

                                                            pedidoAbierto === pedido.id

                                                                ? (

                                                                    <>

                                                                        Ocultar detalles

                                                                        <ChevronUp size={18} />

                                                                    </>

                                                                )

                                                                : (

                                                                    <>

                                                                        Ver detalles

                                                                        <ChevronDown size={18} />

                                                                    </>

                                                                )

                                                        }

                                                    </button>

                                                </div>

                                            </div>


                                            {/* Resumen rápido del pedido */}
                                            <div className="order-total-preview">

                                                <span>

                                                    {

                                                        pedido.productos.length

                                                    }

                                                    {

                                                        pedido.productos.length === 1

                                                            ? " producto"

                                                            : " productos"

                                                    }

                                                </span>


                                                <strong>

                                                    $

                                                    {

                                                        pedido.total.toLocaleString(

                                                            "es-CO"

                                                        )

                                                    }

                                                </strong>

                                            </div>


                                            {

                                                // Detalles del pedido seleccionado.
                                                pedidoAbierto === pedido.id &&

                                                (

                                                    <div className="order-details">


                                                        {/* Datos del comprador */}
                                                        <div className="order-user">

                                                            <h3>

                                                                <User size={18} />

                                                                Datos del comprador

                                                            </h3>


                                                            <div className="order-user-grid">

                                                                <p>

                                                                    <strong>

                                                                        Nombre:

                                                                    </strong>

                                                                    {

                                                                        pedido.usuario?.nombre ||

                                                                        "No disponible"

                                                                    }

                                                                </p>


                                                                <p>

                                                                    <strong>

                                                                        Correo:

                                                                    </strong>

                                                                    {

                                                                        pedido.usuario?.correo ||

                                                                        "No disponible"

                                                                    }

                                                                </p>


                                                                <p>

                                                                    <strong>

                                                                        Teléfono:

                                                                    </strong>

                                                                    {

                                                                        pedido.usuario?.telefono ||

                                                                        "No disponible"

                                                                    }

                                                                </p>


                                                                <p>

                                                                    <strong>

                                                                        Ciudad:

                                                                    </strong>

                                                                    {

                                                                        pedido.usuario?.ciudad ||

                                                                        "No disponible"

                                                                    }

                                                                </p>


                                                                <p className="full-width">

                                                                    <strong>

                                                                        Dirección:

                                                                    </strong>

                                                                    {

                                                                        pedido.usuario?.direccion ||

                                                                        "No disponible"

                                                                    }

                                                                </p>

                                                            </div>

                                                        </div>


                                                        {/* Método de pago */}
                                                        <div className="payment-info">

                                                            <CreditCard size={18} />

                                                            <span>

                                                                Método de pago:

                                                            </span>

                                                            <strong>

                                                                {

                                                                    pedido.metodoPago ||

                                                                    "No especificado"

                                                                }

                                                            </strong>

                                                        </div>


                                                        {/* Productos del pedido */}
                                                        <div className="order-products">

                                                            <h3>

                                                                Productos

                                                            </h3>


                                                            <div className="order-products-list">

                                                                {

                                                                    pedido.productos.map(

                                                                        (producto, index) =>

                                                                        {

                                                                            const esVirtual =

                                                                                producto.formato === "Virtual";


                                                                            return (

                                                                                <div

                                                                                    className="order-product"

                                                                                    key={

                                                                                        `${producto.id}-${producto.formato}-${index}`

                                                                                    }

                                                                                >


                                                                                    {/* Imagen del producto */}
                                                                                    <img

                                                                                        src={producto.imagen}

                                                                                        alt={producto.titulo}

                                                                                    />


                                                                                    {/* Información del producto */}
                                                                                    <div className="order-product-info">

                                                                                        <strong>

                                                                                            {producto.titulo}

                                                                                        </strong>


                                                                                        {/* Formato */}
                                                                                        <span className="order-format">

                                                                                            {

                                                                                                esVirtual

                                                                                                    ? (

                                                                                                        <Monitor size={15} />

                                                                                                    )

                                                                                                    : (

                                                                                                        <Package size={15} />

                                                                                                    )

                                                                                            }


                                                                                            {

                                                                                                esVirtual

                                                                                                    ? "Virtual"

                                                                                                    : "Físico"

                                                                                            }

                                                                                        </span>


                                                                                        {

                                                                                            !esVirtual && (

                                                                                                <span>

                                                                                                    Cantidad: {producto.quantity}

                                                                                                </span>

                                                                                            )

                                                                                        }


                                                                                        <span>

                                                                                            Precio unitario: $

                                                                                            {

                                                                                                producto.precio.toLocaleString(

                                                                                                    "es-CO"

                                                                                                )

                                                                                            }

                                                                                        </span>

                                                                                    </div>


                                                                                    {/* Subtotal del producto */}
                                                                                    <strong className="order-product-price">

                                                                                        $

                                                                                        {

                                                                                            (

                                                                                                producto.precio *

                                                                                                producto.quantity

                                                                                            ).toLocaleString(

                                                                                                "es-CO"

                                                                                            )

                                                                                        }

                                                                                    </strong>

                                                                                </div>

                                                                            );

                                                                        }

                                                                    )

                                                                }

                                                            </div>

                                                        </div>


                                                        {/* Total del pedido */}
                                                        <div className="order-total">

                                                            <span>

                                                                Total del pedido

                                                            </span>


                                                            <strong>

                                                                $

                                                                {

                                                                    pedido.total.toLocaleString(

                                                                        "es-CO"

                                                                    )

                                                                }

                                                            </strong>

                                                        </div>

                                                    </div>

                                                )

                                            }

                                        </article>

                                    )

                                )}

                            </div>

                        )

                }

            </section>

        </main>

    );

}


export default Orders;