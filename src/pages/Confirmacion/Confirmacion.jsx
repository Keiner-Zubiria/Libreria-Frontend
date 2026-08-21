import "./Confirmacion.css";

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import
{
    CircleCheck,
    Package,
    Monitor,
    Download,
    CreditCard,
    Calendar,
    ShoppingBag
} from "lucide-react";

import AuthContext from "../../context/AuthContext";
import AlertContext from "../../context/AlertContext";
import { API_URL, imagenUrl, authFetch } from "../../config/api";


// Página que confirma una compra realizada.
function Confirmacion()
{

    const { id } = useParams();

    const { usuario } = useContext( AuthContext );

    const { mostrarMensaje } = useContext( AlertContext );


    const [ pedido, setPedido ] = useState( null );

    const [ cargando, setCargando ] = useState( true );


    // Carga el pedido recién creado.
    useEffect( () =>
    {

        const cargarPedido = async () =>
        {

            if ( !usuario )
            {

                setCargando( false );

                return;

            }

            try
            {

                const respuesta = await authFetch(
                    `${API_URL}/pedidos/${ id }`
                );

                if ( !respuesta.ok )
                {

                    throw new Error(
                        "No fue posible cargar la confirmación."
                    );

                }

                const datos = await respuesta.json();

                setPedido( datos );

            }
            catch ( error )
            {

                console.error( error );

                mostrarMensaje(

                    "No fue posible cargar la confirmación del pedido.",

                    "error"

                );

            }
            finally
            {

                setCargando( false );

            }

        };

        cargarPedido();

    }, [ id, usuario, mostrarMensaje ] );


    // Descarga el archivo digital del libro.
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
                `${ titulo || "libro" }.pdf`;

            const url = URL.createObjectURL( blob );

            const enlace = document.createElement( "a" );

            enlace.href = url;

            enlace.download = nombreDescarga;

            document.body.appendChild( enlace );

            enlace.click();

            document.body.removeChild( enlace );

            URL.revokeObjectURL( url );

            mostrarMensaje(
                "Descarga iniciada.",
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


    if ( cargando )
    {

        return (

            <main className="confirmacion-page">

                <section className="confirmacion-card">

                    <div className="confirmacion-empty">

                        <Package size={ 55 } />

                        <h2>

                            Cargando confirmación...

                        </h2>

                    </div>

                </section>

            </main>

        );

    }


    if ( !pedido )
    {

        return (

            <main className="confirmacion-page">

                <section className="confirmacion-card">

                    <div className="confirmacion-empty">

                        <ShoppingBag size={ 55 } />

                        <h2>

                            Pedido no encontrado

                        </h2>

                        <p>

                            No pudimos encontrar el pedido solicitado.

                        </p>

                        <Link

                            to="/pedidos"

                            className="confirmacion-button"

                        >

                            Ver mis pedidos

                        </Link>

                    </div>

                </section>

            </main>

        );

    }


    const detalles = pedido.productos || [];

    const fechaPedido = pedido.fecha
        ? new Date( pedido.fecha ).toLocaleString(
            "es-CO",
            {
                dateStyle: "short",
                timeStyle: "short"
            }
        )
        : "Fecha no disponible";


    return (

        <main className="confirmacion-page">

            <section className="confirmacion-card">

                {/* Mensaje de éxito */ }
                <div className="confirmacion-exito">

                    <CircleCheck size={ 52 } />

                    <h1>

                        ¡Compra confirmada!

                    </h1>

                    <p>

                        Tu pedido <strong>#{ pedido.id }</strong> fue
                        registrado correctamente. Te enviamos un correo
                        con el resumen de la compra.

                    </p>

                </div>


                {/* Datos del pedido */ }
                <div className="confirmacion-detalle">

                    <div className="confirmacion-row">

                        <span>

                            <Calendar size={ 16 } />

                            Fecha

                        </span>

                        <strong>

                            { fechaPedido }

                        </strong>

                    </div>

                    <div className="confirmacion-row">

                        <span>

                            <CreditCard size={ 16 } />

                            Método de pago

                        </span>

                        <strong>

                            { pedido.metodoPago || "No especificado" }

                        </strong>

                    </div>

                    <div className="confirmacion-row">

                        <span>

                            <CreditCard size={ 16 } />

                            Estado del pago

                        </span>

                        <span

                            className={ `confirmacion-pago ${

                                pedido.estadoPago === "Pagado"

                                    ? "pagado"

                                    : "pendiente"

                            }` }

                        >

                            { pedido.estadoPago || "Pendiente" }

                        </span>

                    </div>

                </div>


                {/* Productos del pedido */ }
                <div className="confirmacion-productos">

                    <h2>

                        Resumen del pedido

                    </h2>

                    {

                        detalles.map( ( detalle, index ) =>
                        {

                            const esVirtual =

                                detalle.formato === "Virtual";

                            const cantidad =

                                detalle.cantidad || 1;

                            return (

                                <div

                                    className="confirmacion-producto"

                                    key={ `${ detalle.id }-${ index }` }

                                >

                                    <img

                                        src={

                                            detalle.imagen

                                                ? imagenUrl( detalle.imagen )

                                                : "/images/default-book.jpg"

                                        }

                                        alt={ detalle.titulo }

                                    />


                                    <div className="confirmacion-producto-info">

                                        <strong>

                                            { detalle.titulo }

                                        </strong>

                                        <span>

                                            {

                                                esVirtual

                                                    ? "Virtual"

                                                    : "Físico"

                                            }

                                        </span>

                                        <span>

                                            { esVirtual

                                                ? "Cantidad: 1"

                                                : `Cantidad: ${ cantidad }` }

                                        </span>

                                    </div>


                                    <strong className="confirmacion-producto-precio">

                                        $

                                        {

                                            (

                                                detalle.precio * cantidad

                                            ).toLocaleString( "es-CO" )

                                        }

                                    </strong>

                                </div>

                            );

                        } )

                    }


                    {/* Total */ }
                    <div className="confirmacion-total">

                        <span>

                            Total

                        </span>

                        <strong>

                            $

                            {

                                ( pedido.total || 0 ).toLocaleString(

                                    "es-CO"

                                )

                            }

                        </strong>

                    </div>

                </div>


                {/* Descargas de libros virtuales */ }
                {

                    detalles.some(

                        detalle =>

                            detalle.formato === "Virtual" &&

                            detalle.tieneArchivo &&

                            pedido.estadoPago === "Pagado"

                    ) && (

                        <div className="confirmacion-descargas">

                            <h3>

                                Tus libros digitales

                            </h3>

                            <p>

                                Puedes descargar los libros virtuales que
                                compraste:

                            </p>

                            {

                                detalles

                                    .filter(

                                        detalle =>

                                            detalle.formato === "Virtual" &&

                                            detalle.tieneArchivo

                                    )

                                    .map( ( detalle, index ) => (

                                        <button

                                            type="button"

                                            className="confirmacion-descarga"

                                            key={ `${ detalle.id }-${ index }` }

                                            onClick={ () =>

                                                descargarLibro( detalle.id, detalle.titulo )

                                            }

                                        >

                                            <Monitor size={ 18 } />

                                            <span>

                                                { detalle.titulo }

                                            </span>

                                            <Download size={ 18 } />

                                        </button>

                                    ) )

                            }

                        </div>

                    )

                }


                {/* Acciones finales */ }
                <div className="confirmacion-acciones">

                    <Link

                        to="/pedidos"

                        className="confirmacion-button"

                    >

                        Ver mis pedidos

                    </Link>

                    <Link

                        to="/catalogo"

                        className="confirmacion-button secundario"

                    >

                        Seguir comprando

                    </Link>

                </div>

            </section>

        </main>

    );

}


export default Confirmacion;
