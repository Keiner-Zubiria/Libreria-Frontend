import "./BookCard.css";

import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import AlertContext from "../../context/AlertContext.jsx";
import { imagenUrl } from "../../config/api";


// Componente encargado de mostrar la información de un libro individual.
function BookCard( { book } )
{

    const { addToCart } = useContext( CartContext );

    const { mostrarMensaje } = useContext( AlertContext );


    // Precio mostrado inicialmente en la tarjeta.
    // Se utiliza el precio físico como referencia.
    const precio = book.precioFisico || 0;


    return (

        <Link
            to={ `/libro/${ book.id }` }
            className="book-link"
        >

            <article className="book-card">


                {/* Imagen del libro */ }
                <div className="book-image">

                    <img
                        src={ imagenUrl( book.imagen ) || "/img/libro-default.jpg" }
                        alt={ book.titulo }
                    />

                </div>


                {/* Información principal del libro */ }
                <div className="book-info">


                    {/* Categoría */ }
                    <span className="book-category">

                        { book.categoria }

                    </span>


                    {/* Título */ }
                    <h3>

                        { book.titulo }

                    </h3>


                    {/* Autor */ }
                    <p className="book-author">

                        { book.autor }

                    </p>


                    {/* Precio y acción de compra */ }
                    <div className="book-footer">


                        <strong>

                            ${ precio.toLocaleString( "es-CO" ) }

                        </strong>


                        <button

                            className="cart-button"

                            onClick={ ( e ) =>
                            {

                                e.preventDefault();

                                e.stopPropagation();

                                addToCart( {

                                    ...book,

                                    precio,

                                    formato: "Fisico",

                                    quantity: 1

                                } );

                                mostrarMensaje(

                                    "Libro agregado al carrito.",

                                    "success"

                                );

                            } }

                        >

                            <ShoppingCart size={ 18 } />

                            Agregar

                        </button>


                    </div>


                </div>


            </article>


        </Link>

    );

}

export default BookCard;