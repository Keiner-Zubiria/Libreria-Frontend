import "./MisLibros.css";

import { useContext, useEffect, useState } from "react";

import
{
    BookOpen,
    Download,
    FileX,
    FileText,
    Monitor
} from "lucide-react";

import AuthContext from "../../context/AuthContext";
import AlertContext from "../../context/AlertContext";
import { API_URL, UPLOADS_URL, authFetch } from "../../config/api";


// Página donde el usuario ve los libros digitales que ha comprado.
function MisLibros()
{

    const { usuario } = useContext( AuthContext );

    const { mostrarMensaje } = useContext( AlertContext );

    const [ cargando, setCargando ] = useState( true );

    const [ libros, setLibros ] = useState( [] );


    // Reúne los libros virtuales comprados y pagados.
    useEffect( () =>
    {

        const cargarLibros = async () =>
        {

            if ( !usuario )
            {

                setLibros( [] );

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
                        "No fue posible cargar tus libros."
                    );

                }


                const pedidos = await respuesta.json();

                const comprados = [];

                const vistos = new Set();

                for ( const pedido of pedidos )
                {

                    // Los pedidos viejos no tienen estado_pago:
                    // se consideran pagados salvo contraentrega.
                    const pagado =
                        pedido.estadoPago === "Pagado" ||
                        (
                            !pedido.estadoPago &&
                            pedido.metodoPago !== "Contraentrega"
                        );


                    // Solo cuentan los pedidos pagados y no cancelados.
                    if (
                        pedido.estado === "Cancelado" ||
                        !pagado
                    )
                    {

                        continue;

                    }


                    for ( const detalle of pedido.productos || [] )
                    {

                        // Solo la versión virtual es descargable.
                        if ( detalle.formato !== "Virtual" )
                        {

                            continue;

                        }


                        // Evita repetir el mismo libro si se compró varias veces.
                        if ( vistos.has( detalle.id ) )
                        {

                            continue;

                        }


                        vistos.add( detalle.id );

                        comprados.push( detalle );

                    }

                }


                setLibros( comprados );

            }
            catch ( error )
            {

                console.error( error );

                mostrarMensaje(
                    "No fue posible cargar tus libros.",
                    "error"
                );

            }
            finally
            {

                setCargando( false );

            }

        };


        cargarLibros();

    }, [ usuario, mostrarMensaje ] );


    // Descarga el PDF del libro comprado.
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
                `Descarga iniciada: ${ titulo }`,
                "success"
            );

        }
        catch ( error )
        {

            mostrarMensaje(
                error.message ||
                "No fue posible descargar el libro.",
                "error"
            );

        }

    };


    return (

        <main className="mis-libros-page">

            {/* Encabezado */ }
            <section className="mis-libros-header">

                <div className="mis-libros-title">

                    <BookOpen size={ 32 } />

                    <div>

                        <h1>
                            Mis libros
                        </h1>

                        <p>
                            Los libros digitales que has comprado,
                            listos para descargar.
                        </p>

                    </div>

                </div>

            </section>


            {/* Contenido */ }
            <section className="mis-libros-contenido">

                {

                    cargando ? (

                        <div className="mis-libros-vacio">

                            Cargando tus libros...

                        </div>

                    ) : libros.length === 0 ? (

                        <div className="mis-libros-vacio">

                            <BookOpen size={ 42 } />

                            <h2>
                                Aún no tienes libros digitales
                            </h2>

                            <p>
                                Cuando compres un libro en formato virtual,
                                aparecerá aquí para que lo descargues.
                            </p>

                        </div>

                    ) : (

                        <div className="mis-libros-grid">

                            {

                                libros.map( ( libro ) => (

                                    <article
                                        className="mis-libro-card"
                                        key={ libro.id }
                                    >

                                        <div className="mis-libro-portada">

                                            <img
                                                src={
                                                    libro.imagen
                                                        ? `${UPLOADS_URL}/${ libro.imagen }`
                                                        : "/images/default-book.jpg"
                                                }
                                                alt={ `Portada de ${ libro.titulo }` }
                                            />

                                            <span className="mis-libro-format">

                                                <Monitor size={ 13 } />

                                                Virtual

                                            </span>

                                        </div>


                                        <div className="mis-libro-info">

                                            <h3>
                                                { libro.titulo }
                                            </h3>

                                            <p className="mis-libro-autor">
                                                { libro.autor }
                                            </p>

                                            <p className="mis-libro-precio">

                                                Pagado: $

                                                { Number(
                                                    libro.precio || 0
                                                ).toLocaleString( "es-CO" ) }

                                            </p>


                                            {

                                                libro.tieneArchivo ? (

                                                    <button
                                                        type="button"
                                                        className="mis-libro-descargar"
                                                        onClick={ () =>
                                                            descargarLibro(
                                                                libro.id,
                                                                libro.titulo
                                                            )
                                                        }
                                                    >

                                                        <Download size={ 17 } />

                                                        Descargar PDF

                                                    </button>

                                                ) : (

                                                    <p className="mis-libro-sin-pdf">

                                                        <FileX size={ 15 } />

                                                        <span>

                                                            <FileText size={ 13 } />

                                                            Sin PDF disponible

                                                        </span>

                                                    </p>

                                                )

                                            }

                                        </div>

                                    </article>

                                ) )

                            }

                        </div>

                    )

                }

            </section>

        </main>

    );

}


export default MisLibros;
