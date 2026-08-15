import "./PedidosAdmin.css";

import { useEffect, useMemo, useState } from "react";

import {
    Package,
    Search,
    Eye,
    User,
    Calendar,
    CreditCard
} from "lucide-react";

import { API_URL, UPLOADS_URL, authFetch } from "../../config/api";

function PedidosAdmin()
{

    // Lista completa de pedidos.
    const [ pedidos, setPedidos ] = useState( [] );

    // Pedido seleccionado.
    const [ pedidoSeleccionado, setPedidoSeleccionado ] = useState( null );

    // Estado de carga.
    const [ cargando, setCargando ] = useState( true );

    // Buscador.
    const [ busqueda, setBusqueda ] = useState( "" );

    // Filtro por estado.
    const [ estadoFiltro, setEstadoFiltro ] = useState( "Todos" );

    // Filtro por método de pago.
    const [ pagoFiltro, setPagoFiltro ] = useState( "Todos" );

    // Orden.
    const [ orden, setOrden ] = useState( "recientes" );


    // Obtiene todos los pedidos.
    const obtenerPedidos = async () =>
    {

        try
        {

            const respuesta = await authFetch(
                `${API_URL}/pedidos`
            );

            if ( !respuesta.ok )
            {
                throw new Error(
                    "No se pudieron obtener los pedidos."
                );
            }

            const datos = await respuesta.json();

            setPedidos(
                Array.isArray( datos )
                    ? datos
                    : []
            );

        }
        catch ( error )
        {

            console.error(
                "Error cargando pedidos:",
                error
            );

            setPedidos( [] );

        }
        finally
        {

            setCargando( false );

        }

    };


    // Carga inicial.
    useEffect( () =>
    {

        obtenerPedidos();

    }, [] );


    // Cambia el estado del pedido.
    const cambiarEstado = async ( id, estado ) =>
    {

        try
        {

            const respuesta = await authFetch(

                `${API_URL}/pedidos/${ id }/estado`,

                {
                    method: "PUT",

                    headers:
                    {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify( estado )
                }

            );

            if ( !respuesta.ok )
            {
                throw new Error(
                    "No se pudo actualizar el estado."
                );
            }

            await obtenerPedidos();

            setPedidoSeleccionado( pedidoActual =>
            {

                if ( !pedidoActual )
                {
                    return null;
                }

                if ( pedidoActual.id !== id )
                {
                    return pedidoActual;
                }

                return {
                    ...pedidoActual,
                    estado: estado
                };

            } );

        }
        catch ( error )
        {

            console.error(
                "Error actualizando pedido:",
                error
            );

        }

    };


    // Formatea la fecha.
    const mostrarFecha = ( fecha ) =>
    {

        if ( !fecha )
        {
            return "Sin fecha";
        }

        const fechaConvertida = new Date( fecha );

        if ( Number.isNaN( fechaConvertida.getTime() ) )
        {
            return "Fecha no disponible";
        }

        return fechaConvertida.toLocaleString(

            "es-CO",

            {
                dateStyle: "short",
                timeStyle: "short"
            }

        );

    };


    // Contadores por estado.
    const estadisticas = useMemo(
        () =>
        ( {

            Todos: pedidos.length,

            Pendiente: pedidos.filter(
                pedido => pedido.estado === "Pendiente"
            ).length,

            "En proceso": pedidos.filter(
                pedido => pedido.estado === "En proceso"
            ).length,

            Enviado: pedidos.filter(
                pedido => pedido.estado === "Enviado"
            ).length,

            Entregado: pedidos.filter(
                pedido => pedido.estado === "Entregado"
            ).length,

            Cancelado: pedidos.filter(
                pedido => pedido.estado === "Cancelado"
            ).length

        } ),

        [ pedidos ]

    );


    // Pedidos filtrados.
    const pedidosFiltrados = useMemo(
        () =>
        {

            let lista = [ ...pedidos ];


            // Filtro por estado.
            if ( estadoFiltro !== "Todos" )
            {

                lista = lista.filter(
                    pedido =>
                        pedido.estado === estadoFiltro
                );

            }


            // Filtro por método de pago.
            if ( pagoFiltro !== "Todos" )
            {

                lista = lista.filter(
                    pedido =>
                        pedido.metodoPago === pagoFiltro
                );

            }


            // Buscador.
            if ( busqueda.trim() !== "" )
            {

                const texto =
                    busqueda
                        .trim()
                        .toLowerCase();


                lista = lista.filter(
                    pedido =>
                    {

                        const id =
                            String(
                                pedido.id ?? ""
                            ).toLowerCase();

                        const nombre =
                            String(
                                pedido.nombreUsuario ?? ""
                            ).toLowerCase();

                        const correo =
                            String(
                                pedido.correoUsuario ?? ""
                            ).toLowerCase();

                        const telefono =
                            String(
                                pedido.telefono ?? ""
                            ).toLowerCase();

                        const ciudad =
                            String(
                                pedido.ciudad ?? ""
                            ).toLowerCase();


                        return (

                            id.includes( texto ) ||

                            nombre.includes( texto ) ||

                            correo.includes( texto ) ||

                            telefono.includes( texto ) ||

                            ciudad.includes( texto )

                        );

                    }

                );

            }


            // Orden.
            lista.sort(
                ( a, b ) =>
                {

                    const fechaA =
                        new Date(
                            a.fecha
                        ).getTime();

                    const fechaB =
                        new Date(
                            b.fecha
                        ).getTime();


                    if ( orden === "recientes" )
                    {
                        return fechaB - fechaA;
                    }

                    return fechaA - fechaB;

                }

            );


            return lista;

        },

        [
            pedidos,
            estadoFiltro,
            pagoFiltro,
            busqueda,
            orden
        ]

    );


    // Abre o cierra los detalles.
    const alternarDetalles = ( pedido ) =>
    {

        setPedidoSeleccionado(
            pedidoSeleccionado?.id === pedido.id
                ? null
                : pedido
        );

    };


    if ( cargando )
    {

        return (

            <main className="pedidos-admin">

                <div className="pedidos-vacio">

                    <Package size={ 60 } />

                    <h2>
                        Cargando pedidos...
                    </h2>

                </div>

            </main>

        );

    }


    return (

        <main className="pedidos-admin">

            <header className="pedidos-header">

                <h1>
                    Gestión de pedidos
                </h1>

                <p>
                    Administra todos los pedidos realizados por los clientes.
                </p>

            </header>


            {/* Estadísticas */ }

            <section className="pedidos-estadisticas">

                {

                    Object.entries(
                        estadisticas
                    ).map(
                        ( [ estado, cantidad ] ) => (

                            <button

                                key={ estado }

                                type="button"

                                className={

                                    `estado-card ${
                                        estadoFiltro === estado
                                            ? "activo"
                                            : ""
                                    }`

                                }

                                onClick={ () =>
                                    setEstadoFiltro(
                                        estado
                                    )
                                }

                            >

                                <span>
                                    { estado }
                                </span>

                                <strong>
                                    { cantidad }
                                </strong>

                            </button>

                        )
                    )

                }

            </section>


            {/* Buscador y filtros */ }

            <section className="pedidos-toolbar">

                <div className="pedidos-search">

                    <Search size={ 18 } />

                    <input

                        type="text"

                        placeholder="Buscar pedido, cliente, correo, teléfono o ciudad..."

                        value={ busqueda }

                        onChange={ e =>
                            setBusqueda(
                                e.target.value
                            )
                        }

                    />

                </div>


                <select

                    value={ pagoFiltro }

                    onChange={ e =>
                        setPagoFiltro(
                            e.target.value
                        )
                    }

                >

                    <option value="Todos">
                        Todos los pagos
                    </option>

                    <option value="Contraentrega">
                        Contraentrega
                    </option>

                    <option value="Tarjeta">
                        Tarjeta
                    </option>

                    <option value="PSE">
                        PSE
                    </option>

                </select>


                <select

                    value={ orden }

                    onChange={ e =>
                        setOrden(
                            e.target.value
                        )
                    }

                >

                    <option value="recientes">
                        Más recientes
                    </option>

                    <option value="antiguos">
                        Más antiguos
                    </option>

                </select>

            </section>


            {/* Lista de pedidos */ }

            <section className="pedidos-lista">

                {

                    pedidosFiltrados.length === 0

                        ? (

                            <div className="pedidos-vacio">

                                <Package size={ 55 } />

                                <h2>
                                    No se encontraron pedidos
                                </h2>

                                <p>
                                    Prueba cambiando los filtros o la búsqueda.
                                </p>

                            </div>

                        )

                        : (

                            pedidosFiltrados.map(
                                pedido => (

                                    <article

                                        className="pedido-card"

                                        key={ pedido.id }

                                    >

                                        {/* Resumen */ }

                                        <div className="pedido-card-resumen">

                                            <div className="pedido-card-info">

                                                <div className="pedido-numero">

                                                    <strong>
                                                        Pedido #{ pedido.id }
                                                    </strong>

                                                    <span

                                                        className={

                                                            `pedido-estado estado-${
                                                                String(
                                                                    pedido.estado ?? ""
                                                                )
                                                                    .toLowerCase()
                                                                    .replaceAll(
                                                                        " ",
                                                                        "-"
                                                                    )
                                                            }`

                                                        }

                                                    >

                                                        { pedido.estado }

                                                    </span>

                                                </div>


                                                <div className="pedido-card-datos">

                                                    <span>

                                                        <User size={ 15 } />

                                                        {
                                                            pedido.nombreUsuario ||
                                                            "Cliente no registrado"
                                                        }

                                                    </span>


                                                    <span>

                                                        <Calendar size={ 15 } />

                                                        {
                                                            mostrarFecha(
                                                                pedido.fecha
                                                            )
                                                        }

                                                    </span>


                                                    <span>

                                                        <CreditCard size={ 15 } />

                                                        {
                                                            pedido.metodoPago ||
                                                            "No registrado"
                                                        }

                                                    </span>

                                                </div>

                                            </div>


                                            <div className="pedido-card-acciones">

                                                <strong className="pedido-total">

                                                    $

                                                    {
                                                        Number(
                                                            pedido.total ?? 0
                                                        ).toLocaleString(
                                                            "es-CO"
                                                        )
                                                    }

                                                </strong>


                                                <button

                                                    type="button"

                                                    className="btn-ver-pedido"

                                                    onClick={ () =>
                                                        alternarDetalles(
                                                            pedido
                                                        )
                                                    }

                                                >

                                                    <Eye size={ 17 } />

                                                    {

                                                        pedidoSeleccionado?.id === pedido.id

                                                            ? "Ocultar"

                                                            : "Ver detalles"

                                                    }

                                                </button>

                                            </div>

                                        </div>


                                        {/* Detalles */ }

                                        {

                                            pedidoSeleccionado?.id === pedido.id && (

                                                <div className="pedido-detalles">

                                                    <div className="pedido-detalles-header">

                                                        <div>

                                                            <h2>
                                                                Pedido #{ pedido.id }
                                                            </h2>

                                                            <p>
                                                                Información completa del pedido
                                                            </p>

                                                        </div>

                                                    </div>


                                                    {/* Cliente */ }

                                                    <div className="pedido-detalle-seccion">

                                                        <h3>
                                                            Información del cliente
                                                        </h3>


                                                        <div className="pedido-cliente-grid">

                                                            <div>

                                                                <span>
                                                                    Cliente
                                                                </span>

                                                                <strong>
                                                                    { pedido.nombreUsuario || "No registrado" }
                                                                </strong>

                                                            </div>


                                                            <div>

                                                                <span>
                                                                    Correo
                                                                </span>

                                                                <strong>
                                                                    { pedido.correoUsuario || "No registrado" }
                                                                </strong>

                                                            </div>


                                                            <div>

                                                                <span>
                                                                    Teléfono
                                                                </span>

                                                                <strong>
                                                                    { pedido.telefono || "No registrado" }
                                                                </strong>

                                                            </div>


                                                            <div>

                                                                <span>
                                                                    Ciudad
                                                                </span>

                                                                <strong>
                                                                    { pedido.ciudad || "No registrada" }
                                                                </strong>

                                                            </div>


                                                            <div className="cliente-direccion">

                                                                <span>
                                                                    Dirección
                                                                </span>

                                                                <strong>
                                                                    { pedido.direccion || "No registrada" }
                                                                </strong>

                                                            </div>

                                                        </div>

                                                    </div>


                                                    {/* Productos */ }

                                                    <div className="pedido-detalle-seccion">

                                                        <h3>
                                                            Productos
                                                        </h3>


                                                        <div className="pedido-productos">

                                                            {

                                                                pedido.productos?.length > 0

                                                                    ? (

                                                                        pedido.productos.map(
                                                                            (
                                                                                producto,
                                                                                index
                                                                            ) => (

                                                                                <div

                                                                                    className="pedido-producto"

                                                                                    key={
                                                                                        `${ pedido.id }-${ producto.id }-${ index }`
                                                                                    }

                                                                                >

                                                                                    <img

                                                                                        src={

                                                                                            producto.imagen

                                                                                                ? `${UPLOADS_URL}/${ producto.imagen }`

                                                                                                : "/images/default-book.jpg"

                                                                                        }

                                                                                        alt={
                                                                                            producto.titulo ||
                                                                                            "Producto"
                                                                                        }

                                                                                        onError={
                                                                                            e =>
                                                                                            {

                                                                                                e.currentTarget.src =
                                                                                                    "/images/default-book.jpg";

                                                                                            }
                                                                                        }

                                                                                    />


                                                                                    <div className="producto-datos">

                                                                                        <strong>
                                                                                            {
                                                                                                producto.titulo ||
                                                                                                "Producto sin título"
                                                                                            }
                                                                                        </strong>

                                                                                        <span>
                                                                                            Formato: {
                                                                                                producto.formato ||
                                                                                                "No especificado"
                                                                                            }
                                                                                        </span>

                                                                                        <span>
                                                                                            Cantidad: {
                                                                                                producto.cantidad ?? 0
                                                                                            }
                                                                                        </span>

                                                                                    </div>


                                                                                    <div className="producto-precio">

                                                                                        <span>
                                                                                            Precio unitario
                                                                                        </span>

                                                                                        <strong>

                                                                                            $

                                                                                            {
                                                                                                Number(
                                                                                                    producto.precio ?? 0
                                                                                                ).toLocaleString(
                                                                                                    "es-CO"
                                                                                                )
                                                                                            }

                                                                                        </strong>

                                                                                    </div>


                                                                                    <div className="producto-subtotal">

                                                                                        <span>
                                                                                            Subtotal
                                                                                        </span>

                                                                                        <strong>

                                                                                            $

                                                                                            {

                                                                                                (

                                                                                                    Number(
                                                                                                        producto.precio ?? 0
                                                                                                    )

                                                                                                    *

                                                                                                    Number(
                                                                                                        producto.cantidad ?? 0
                                                                                                    )

                                                                                                ).toLocaleString(
                                                                                                    "es-CO"
                                                                                                )

                                                                                            }

                                                                                        </strong>

                                                                                    </div>

                                                                                </div>

                                                                            )
                                                                        )

                                                                    )

                                                                    : (

                                                                        <p className="pedido-sin-productos">
                                                                            Este pedido no tiene productos registrados.
                                                                        </p>

                                                                    )

                                                            }

                                                        </div>

                                                    </div>


                                                    {/* Pie de detalles */ }

                                                    <div className="pedido-detalle-footer">

                                                        <div className="pedido-pago-info">

                                                            <CreditCard size={ 18 } />

                                                            <div>

                                                                <span>
                                                                    Método de pago
                                                                </span>

                                                                <strong>
                                                                    {
                                                                        pedido.metodoPago ||
                                                                        "No registrado"
                                                                    }
                                                                </strong>

                                                            </div>

                                                        </div>


                                                        <div className="pedido-estado-control">

                                                            <label
                                                                htmlFor={
                                                                    `estado-${ pedido.id }`
                                                                }
                                                            >

                                                                Estado del pedido

                                                            </label>


                                                            <select

                                                                id={
                                                                    `estado-${ pedido.id }`
                                                                }

                                                                value={
                                                                    pedido.estado || ""
                                                                }

                                                                onChange={ e =>
                                                                    cambiarEstado(
                                                                        pedido.id,
                                                                        e.target.value
                                                                    )
                                                                }

                                                            >

                                                                <option value="Pendiente">
                                                                    Pendiente
                                                                </option>

                                                                <option value="En proceso">
                                                                    En proceso
                                                                </option>

                                                                <option value="Enviado">
                                                                    Enviado
                                                                </option>

                                                                <option value="Entregado">
                                                                    Entregado
                                                                </option>

                                                                <option value="Cancelado">
                                                                    Cancelado
                                                                </option>

                                                            </select>

                                                        </div>


                                                        <div className="pedido-total-final">

                                                            <span>
                                                                Total del pedido
                                                            </span>

                                                            <strong>

                                                                $

                                                                {
                                                                    Number(
                                                                        pedido.total ?? 0
                                                                    ).toLocaleString(
                                                                        "es-CO"
                                                                    )
                                                                }

                                                            </strong>

                                                        </div>

                                                    </div>

                                                </div>

                                            )

                                        }

                                    </article>

                                )
                            )

                        )

                }

            </section>

        </main>

    );

}

export default PedidosAdmin;