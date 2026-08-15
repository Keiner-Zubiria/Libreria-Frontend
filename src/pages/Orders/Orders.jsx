import "./Orders.css";

import { useContext, useEffect, useState } from "react";

import
{
    Package,
    Monitor,
    ShoppingBag,
    ChevronDown,
    ChevronUp,
    User,
    CreditCard,
    Calendar,
    Download
} from "lucide-react";

import AuthContext from "../../context/AuthContext";
import AlertContext from "../../context/AlertContext";
import { API_URL, UPLOADS_URL, authFetch } from "../../config/api";


// Página donde el usuario puede consultar sus pedidos.
function Orders()
{

    const { usuario } = useContext( AuthContext );

    const { mostrarMensaje } = useContext( AlertContext );


    const [ pedidos, setPedidos ] = useState( [] );

    const [ cargando, setCargando ] = useState( true );

    const [ pedidoAbierto, setPedidoAbierto ] = useState( null );


    // Carga los pedidos del usuario desde el backend.
    useEffect( () =>
    {

        const cargarPedidos = async () =>
        {

            if ( !usuario )
            {

                setPedidos( [] );

                setCargando( false );

                return;

            }


            try
            {

                const respuesta = await authFetch(

                    `${API_URL}/pedidos/usuario/${ usuario.id }`

                );


                if ( !respuesta.ok )
                {

                    throw new Error(
                        "No fue posible cargar los pedidos."
                    );

                }


                const datos = await respuesta.json();


                setPedidos( datos );

            }
            catch ( error )
            {

                console.error( error );

                mostrarMensaje(

                    "No fue posible cargar tus pedidos.",

                    "error"

                );

            }
            finally
            {

                setCargando( false );

            }

        };


        cargarPedidos();

    }, [ usuario, mostrarMensaje ] );


    // Abre o cierra los detalles de un pedido.
    const togglePedido = ( id ) =>
    {

        setPedidoAbierto(

            pedidoAbierto === id

                ? null

                : id

        );

    };


    // Descarga un libro digital comprado.
    const descargarLibro = async ( libroId, titulo ) =>
    {

        try
        {

            const respuesta = await authFetch(
                `${API_URL}/libros/${ libroId }/descargar`
            );

            if ( !respuesta.ok )
            {

                const mensaje = await respuesta.text();

                throw new Error( mensaje );

            }

            const blob = await respuesta.blob();

            // Usa el nombre original subido (lo devuelve el backend).
            const nombreDescarga =
                respuesta.headers.get( "X-File-Name" ) ||
                `${ titulo }.pdf`;

            const url = URL.createObjectURL( blob );

            const enlace = document.createElement( "a" );

            enlace.href = url;

            enlace.download = nombreDescarga;

            document.body.appendChild( enlace );

            enlace.click();

            document.body.removeChild( enlace );

            URL.revokeObjectURL( url );

            mostrarMensaje(
                `Descarga iniciada: ${ titulo }`,
                "success"
            );

        }
        catch ( error )
        {

            console.error( error );

            mostrarMensaje(
                error.message,
                "error"
            );

        }

    };


    // Muestra la fecha de forma más sencilla.
    const mostrarFecha = ( fecha ) =>
    {
        if ( !fecha )
        {

            return "Fecha no disponible";

        }


        const fechaPedido = new Date( fecha );


        return fechaPedido.toLocaleString(

            "es-CO",

            {

                dateStyle: "short",

                timeStyle: "short"

            }

        );

    };


    if ( cargando )
    {

        return (

            <main className="orders-page">

                <section className="orders-card">

                    <div className="orders-empty">

                        <Package size={ 55 } />

                        <h2>

                            Cargando pedidos...

                        </h2>

                        <p>

                            Estamos consultando tus compras.

                        </p>

                    </div>

                </section>

            </main>

        );

    }


    return (

        <main className="orders-page">

            <section className="orders-card">


                {/* Encabezado de la página */ }
                <div className="orders-header">

                    <Package size={ 32 } />

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

                    pedidos.length === 0

                        ? (

                            <div className="orders-empty">

                                <ShoppingBag size={ 55 } />

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

                            <div className="orders-list">

                                {

                                    pedidos.map( ( pedido ) =>
                                    {

                                        const detalles =

                                            pedido.productos || [];


                                        return (

                                            <article

                                                className="order-item"

                                                key={ pedido.id }

                                            >


                                                {/* Encabezado del pedido */ }
                                                <div className="order-top">

                                                    <div className="order-info">

                                                        <strong>

                                                            Pedido #{ pedido.id }

                                                        </strong>


                                                        <span>

                                                            <Calendar size={ 14 } />

                                                            {

                                                                mostrarFecha(

                                                                    pedido.fecha

                                                                )

                                                            }

                                                        </span>

                                                    </div>


                                                    <div className="order-header-right">

                                                        <span
                                                            className={ `order-status estado-${ pedido.estado
                                                                ?.toLowerCase()
                                                                .replaceAll( " ", "-" ) }` }
                                                        >
                                                            { pedido.estado || "Pendiente" }
                                                        </span>


                                                        <button

                                                            type="button"

                                                            className="details-button"

                                                            onClick={ () =>

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

                                                                            <ChevronUp size={ 18 } />

                                                                        </>

                                                                    )

                                                                    : (

                                                                        <>

                                                                            Ver detalles

                                                                            <ChevronDown size={ 18 } />

                                                                        </>

                                                                    )

                                                            }

                                                        </button>

                                                    </div>

                                                </div>


                                                {/* Resumen rápido del pedido */ }
                                                <div className="order-total-preview">

                                                    <span>

                                                        {

                                                            detalles.length

                                                        }

                                                        {

                                                            detalles.length === 1

                                                                ? " producto"

                                                                : " productos"

                                                        }

                                                    </span>


                                                    <strong>

                                                        $

                                                        {

                                                            (

                                                                pedido.total || 0

                                                            ).toLocaleString(

                                                                "es-CO"

                                                            )

                                                        }

                                                    </strong>

                                                </div>


                                                {

                                                    pedidoAbierto === pedido.id &&

                                                    (

                                                        <div className="order-details">


                                                            {/* Datos del comprador */ }
                                                            <div className="order-user">

                                                                <h3>

                                                                    <User size={ 18 } />

                                                                    Datos del comprador

                                                                </h3>


                                                                <div className="order-user-grid">

                                                                    <p>

                                                                        <strong>

                                                                            Nombre:

                                                                        </strong>

                                                                        {

                                                                            pedido.nombreUsuario ||

                                                                            "No disponible"

                                                                        }

                                                                    </p>


                                                                    <p>

                                                                        <strong>

                                                                            Correo:

                                                                        </strong>

                                                                        {

                                                                            pedido.correoUsuario ||

                                                                            "No disponible"

                                                                        }

                                                                    </p>


                                                                    <p>

                                                                        <strong>

                                                                            Teléfono:

                                                                        </strong>

                                                                        {

                                                                            pedido.telefono ||

                                                                            "No disponible"

                                                                        }

                                                                    </p>


                                                                    <p>

                                                                        <strong>

                                                                            Ciudad:

                                                                        </strong>

                                                                        {

                                                                            pedido.ciudad ||

                                                                            "No disponible"

                                                                        }

                                                                    </p>


                                                                    <p className="full-width">

                                                                        <strong>

                                                                            Dirección:

                                                                        </strong>

                                                                        {

                                                                            pedido.direccion ||

                                                                            "No disponible"

                                                                        }

                                                                    </p>

                                                                </div>

                                                            </div>


                                                            {/* Método de pago */ }
                                                            <div className="payment-info">

                                                                <CreditCard size={ 18 } />

                                                                <span>

                                                                    Método de pago:

                                                                </span>

                                                                <strong>

                                                                    {

                                                                        pedido.metodoPago ||

                                                                        "No especificado"

                                                                    }

                                                                </strong>

                                                                <span

                                                                    className={ `pago-badge ${

                                                                        pedido.estadoPago === "Pagado"

                                                                            ? "pagado"

                                                                            : "pendiente"

                                                                    }` }

                                                                >

                                                                    {

                                                                        pedido.estadoPago ||

                                                                        "Pendiente"

                                                                    }

                                                                </span>

                                                            </div>


                                                            {/* Productos del pedido */ }
                                                            <div className="order-products">

                                                                <h3>

                                                                    Productos

                                                                </h3>


                                                                <div className="order-products-list">

                                                                    {

                                                                        detalles.map(

                                                                            ( detalle, index ) =>
                                                                            {

                                                                                const esVirtual =

                                                                                    detalle.formato ===

                                                                                    "Virtual";


                                                                                const precio =

                                                                                    detalle.precio ||

                                                                                    0;


                                                                                const cantidad =

                                                                                    detalle.cantidad ||

                                                                                    1;


                                                                                return (

                                                                                    <div

                                                                                        className="order-product"

                                                                                        key={

                                                                                            `${ detalle.id }-${ index }`

                                                                                        }

                                                                                    >


                                                                                        {/* Imagen del producto */ }
                                                                                        <img

                                                                                            src={
                                                                                                detalle.imagen
                                                                                                    ? `${UPLOADS_URL}/${ detalle.imagen }`
                                                                                                    : "/images/default-book.jpg"
                                                                                            }

                                                                                            alt={ detalle.titulo }


                                                                                            onError={ ( e ) =>
                                                                                            {

                                                                                                e.currentTarget.src =

                                                                                                    "/images/default-book.jpg";

                                                                                            } }

                                                                                        />


                                                                                        {/* Información del producto */ }
                                                                                        <div className="order-product-info">

                                                                                            <strong>

                                                                                                {

                                                                                                    detalle.titulo ||

                                                                                                    "Libro no disponible"

                                                                                                }

                                                                                            </strong>


                                                                                            <span className="order-format">

                                                                                                {

                                                                                                    esVirtual

                                                                                                        ? (

                                                                                                            <Monitor size={ 15 } />

                                                                                                        )

                                                                                                        : (

                                                                                                            <Package size={ 15 } />

                                                                                                        )

                                                                                                }


                                                                                                {

                                                                                                    esVirtual

                                                                                                        ? "Virtual"

                                                                                                        : "Físico"

                                                                                                }

                                                                                            </span>


                                                                                            {

                                                                                                !esVirtual &&

                                                                                                (

                                                                                                    <span>

                                                                                                        Cantidad: { cantidad }

                                                                                                    </span>

                                                                                                )

                                                                                            }


                                                                                            {

                                                                                                esVirtual &&

                                                                                                detalle.tieneArchivo &&

                                                                                                pedido.estadoPago === "Pagado" &&

                                                                                                (

                                                                                                    <button

                                                                                                        type="button"

                                                                                                        className="download-button"

                                                                                                        onClick={ () =>

                                                                                                            descargarLibro(

                                                                                                                detalle.id,

                                                                                                                detalle.titulo

                                                                                                            )

                                                                                                        }

                                                                                                    >

                                                                                                        <Download size={ 15 } />

                                                                                                        Descargar

                                                                                                    </button>

                                                                                                )

                                                                                            }


                                                                                            <span>

                                                                                                Precio unitario: $

                                                                                                {

                                                                                                    precio.toLocaleString(

                                                                                                        "es-CO"

                                                                                                    )

                                                                                                }

                                                                                            </span>

                                                                                        </div>


                                                                                        {/* Subtotal del producto */ }
                                                                                        <strong className="order-product-price">

                                                                                            $

                                                                                            {

                                                                                                (

                                                                                                    precio *

                                                                                                    cantidad

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


                                                            {/* Total del pedido */ }
                                                            <div className="order-total">

                                                                <span>

                                                                    Total del pedido

                                                                </span>


                                                                <strong>

                                                                    $

                                                                    {

                                                                        (

                                                                            pedido.total || 0

                                                                        ).toLocaleString(

                                                                            "es-CO"

                                                                        )

                                                                    }

                                                                </strong>

                                                            </div>

                                                        </div>

                                                    )

                                                }

                                            </article>

                                        );

                                    } )

                                }

                            </div>

                        )

                }

            </section>

        </main>

    );

}


export default Orders;