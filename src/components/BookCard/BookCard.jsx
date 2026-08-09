import "./BookCard.css";

import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../context/CartContext";


// Componente encargado de mostrar la información de un libro individual.
function BookCard({ book }) {

    const { addToCart } = useContext(CartContext);


    // Precio mostrado inicialmente en la tarjeta.
    // Se utiliza el precio físico como referencia.
    const precio = book.precioFisico || 0;


    return (

        <Link
            to={`/libro/${book.id}`}
            className="book-link"
        >

            <article className="book-card">


                {/* Imagen del libro */}
                <div className="book-image">

                    <img
                        src={book.imagen}
                        alt={book.titulo}
                    />

                </div>


                {/* Información principal del libro */}
                <div className="book-info">


                    {/* Categoría */}
                    <span className="book-category">

                        {book.categoria}

                    </span>


                    {/* Título */}
                    <h3>

                        {book.titulo}

                    </h3>


                    {/* Autor */}
                    <p className="book-author">

                        {book.autor}

                    </p>


                    {/* Precio y acción de compra */}
                    <div className="book-footer">


                        <strong>

                            ${precio.toLocaleString("es-CO")}

                        </strong>


                        <button

                            className="cart-button"

                            onClick={(e) => {

                                e.preventDefault();
                                e.stopPropagation();


                                // Agrega el libro con la misma estructura usada en el detalle.
                                addToCart({

                                    ...book,

                                    precio,

                                    formato: "Fisico",

                                    quantity: 1

                                });

                            }}

                        >

                            <ShoppingCart size={18} />

                            Agregar

                        </button>


                    </div>


                </div>


            </article>


        </Link>

    );

}

export default BookCard;