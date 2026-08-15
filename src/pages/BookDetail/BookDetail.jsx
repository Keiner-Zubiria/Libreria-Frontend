import "./BookDetail.css";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import
{
    ShoppingCart,
    Package,
    Monitor,
    Star,
    ShoppingBag
} from "lucide-react";

import { obtenerLibro } from "../../services/libroService";
import { UPLOADS_URL } from "../../config/api";

import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import AlertContext from "../../context/AlertContext";


// Página encargada de mostrar la información completa de un libro.
function BookDetail()
{

    const { id } = useParams();

    const navigate = useNavigate();

    const [ quantity, setQuantity ] = useState( 1 );

    // Controla el formato seleccionado.
    const [ formato, setFormato ] = useState( "Fisico" );

    // Almacena la información del libro obtenida desde la API.
    const [ book, setBook ] = useState( null );

    // Obtiene funciones del carrito.
    const { addToCart } = useContext( CartContext );

    // Usuario activo.
    const { usuario } = useContext( AuthContext );

    // Alertas 
    const { mostrarMensaje } = useContext(AlertContext);



    // Carga la información del libro cuando se abre la página.
    useEffect( () =>
    {

        const cargarLibro = async () =>
        {

            try
            {

                const response = await obtenerLibro( id );

                setBook( response.data );

            }
            catch ( error )
            {

                console.error( "Error al cargar el libro:", error );

            }

        };

        cargarLibro();

    }, [ id ] );


    // Mientras carga la información.
    if ( !book )
    {

        return (

            <main className="book-detail">

                <section className="detail-container">

                    <div className="detail-info">

                        <h2>

                            Cargando libro...

                        </h2>

                    </div>

                </section>

            </main>

        );

    }


    // Precio según formato.
    const precio =
        formato === "Fisico"
            ? ( book.precioFisico || 0 )
            : ( book.precioVirtual || 0 );


    // Stock según formato.
    const stock =
        formato === "Fisico"
            ? ( book.stock || 0 )
            : ( book.stockVirtual || 9999 );


    const stockIlimitado = formato === "Virtual";


    // Agregar carrito.
    const handleAddToCart = () =>
    {

        const agregado = addToCart( {

            ...book,

            precio,

            stock,

            formato,

            quantity

        } );

        mostrarMensaje(

            agregado
                ? "Libro agregado al carrito."
                : "El libro virtual ya está en tu carrito.",

            agregado ? "success" : "warning"

        );

    };


    // Comprar ahora.
    const handleBuyNow = () =>
    {

        if ( !usuario )
        {

            mostrarMensaje(
                "Debes iniciar sesión para realizar una compra.",
                "warning"
            );

            navigate( "/login" );

            return;

        }


        navigate( "/checkout", {

            state: {

                producto: {

                    ...book,

                    precio,

                    stock,

                    formato,

                    quantity

                }

            }

        } );

    };


    // Cambiar formato.
    const cambiarFormato = ( nuevoFormato ) =>
    {

        setFormato( nuevoFormato );

        setQuantity( 1 );

    };


    return (

        <main className="book-detail">

            <section className="detail-container">


                {/* Imagen del libro */ }
                <div className="detail-image">

                    <img

                        src={

                            book.imagen

                                ? `${UPLOADS_URL}/${ book.imagen }`

                                : "/images/default-book.jpg"

                        }

                        alt={ book.titulo }

                    />

                </div>


                {/* Información del libro */ }
                <div className="detail-info">

                    <h1>

                        { book.titulo }

                    </h1>


                    <h3>

                        { book.autor }

                    </h3>


                    <p className="detail-category">

                        Categoría: { book.categoria }

                    </p>


                    <p className="detail-rating">

                        <Star size={ 17 } />

                        { book.calificacion || "Sin calificación" }

                    </p>


                    <p className="detail-sold">

                        { book.vendidos || 0 } vendidos

                    </p>


                    {/* Formato */ }
                    <div className="format-box">

                        <span className="format-title">

                            Formato

                        </span>


                        <div className="format-options">


                            { (

                                book.formatos?.includes( "Fisico" )

                                ?? true

                            ) && (

                                    <button

                                        type="button"

                                        className={

                                            formato === "Fisico"

                                                ? "format-option selected"

                                                : "format-option"

                                        }

                                        onClick={ () =>

                                            cambiarFormato( "Fisico" )

                                        }

                                    >

                                        <Package size={ 18 } />

                                        Físico

                                    </button>

                                ) }


                            { book.formatos?.includes( "Virtual" ) && (

                                <button

                                    type="button"

                                    className={

                                        formato === "Virtual"

                                            ? "format-option selected"

                                            : "format-option"

                                    }

                                    onClick={ () =>

                                        cambiarFormato( "Virtual" )

                                    }

                                >

                                    <Monitor size={ 18 } />

                                    Virtual

                                </button>

                            ) }


                        </div>

                    </div>


                    {/* Precio */ }
                    <h2 className="detail-price">

                        $

                        { precio.toLocaleString( "es-CO" ) }

                    </h2>


                    {/* Stock */ }
                    <p className="detail-stock">

                        {

                            stockIlimitado

                                ? "Disponible de forma ilimitada"

                                : `Stock disponible: ${ stock }`

                        }

                    </p>


                    {/* Cantidad */ }
                    { formato === "Fisico" && (

                        <div className="quantity-box">

                            <span>

                                Cantidad:

                            </span>


                            <button

                                type="button"

                                onClick={ () =>

                                    setQuantity(

                                        quantity > 1

                                            ? quantity - 1

                                            : 1

                                    )

                                }

                            >

                                −

                            </button>


                            <strong>

                                { quantity }

                            </strong>


                            <button

                                type="button"

                                onClick={ () =>

                                    quantity < stock &&

                                    setQuantity(

                                        quantity + 1

                                    )

                                }

                            >

                                +

                            </button>

                        </div>

                    ) }


                    {/* Acciones */ }
                    <div className="detail-actions">

                        <button

                            className="cart-button-detail"

                            onClick={ handleAddToCart }

                        >

                            <ShoppingCart size={ 20 } />

                            Agregar al carrito

                        </button>


                        <button

                            className="buy-button"

                            onClick={ handleBuyNow }

                        >

                            <ShoppingBag size={ 20 } />

                            Comprar ahora

                        </button>

                    </div>

                </div>

            </section>


            {/* Descripción */ }
            <section className="description-section">

                <h2>

                    Descripción

                </h2>


                <p>

                    {

                        book.descripcion

                        || "Descripción no disponible."

                    }

                </p>

            </section>

        </main>

    );

}

export default BookDetail;