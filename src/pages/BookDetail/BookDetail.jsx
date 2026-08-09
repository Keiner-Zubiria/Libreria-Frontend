import "./BookDetail.css";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import
    {
        ShoppingCart,
        Package,
        Monitor,
        Star,
        ShoppingBag
    } from "lucide-react";


import booksData from "../../data/books";

import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";



// Página encargada de mostrar la información completa de un libro.
function BookDetail()
{

    const { id } = useParams();

    const navigate = useNavigate();


    const [ quantity, setQuantity ] = useState( 1 );


    // Controla el formato seleccionado.
    const [ formato, setFormato ] = useState( "Fisico" );



    // Carga libros desde localStorage.
    const [ books ] = useState( () =>
    {

        const librosGuardados = localStorage.getItem( "libros" );


        if ( librosGuardados )
        {
            return JSON.parse( librosGuardados );
        }


        return booksData;

    } );



    // Obtiene funciones del carrito.
    const { addToCart } = useContext( CartContext );



    // Usuario activo.
    const { usuario } = useContext( AuthContext );




    // Busca el libro seleccionado.
    const book = books.find(

        ( book ) => book.id === Number( id )

    );




    // Si no existe el libro.
    if ( !book )
    {

        return (

            <main className="book-detail">

                <section className="detail-container">

                    <div className="detail-info">

                        <h2>
                            Libro no encontrado.
                        </h2>

                    </div>

                </section>

            </main>

        );

    }





    // Precio según formato.
    const precio =

        formato === "Fisico"

            ? book.precioFisico

            : book.precioVirtual;





    // Stock según formato.
    const stock =

        formato === "Fisico"

            ? book.stock

            : book.stockVirtual;




    const stockIlimitado = formato === "Virtual";






    // Agregar carrito.
    const handleAddToCart = () =>
    {

        addToCart( {

            ...book,

            precio,

            stock,

            formato,

            quantity

        } );

    };






    // Comprar ahora.
    const handleBuyNow = () =>
    {

        if ( !usuario )
        {

            alert(
                "Debes iniciar sesión para realizar una compra."
            );


            navigate( "/login" );


            return;

        }



        navigate( "/checkout",
            {

                state:
                {

                    producto:
                    {

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



                <div className="detail-image">

                    <img

                        src={ book.imagen }

                        alt={ book.titulo }

                    />

                </div>





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

                        { book.calificacion }

                    </p>





                    <p className="detail-sold">

                        { book.vendidos || 0 } vendidos

                    </p>







                    <div className="format-box">


                        <span className="format-title">

                            Formato

                        </span>




                        <div className="format-options">



                            {

                                book.formatos.includes( "Fisico" ) &&

                                (

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

                                )

                            }






                            {

                                book.formatos.includes( "Virtual" ) &&

                                (

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

                                )

                            }




                        </div>


                    </div>







                    <h2 className="detail-price">

                        $

                        { precio.toLocaleString( "es-CO" ) }

                    </h2>







                    <p className="detail-stock">


                        {

                            stockIlimitado

                                ?

                                "Disponible de forma ilimitada"

                                :

                                `Stock disponible: ${ stock }`

                        }


                    </p>


                    {
                        formato === "Fisico" && (

                            <div className="quantity-box">

                                <span>
                                    Cantidad:
                                </span>


                                <button
                                    type="button"
                                    onClick={ () =>
                                        setQuantity(
                                            quantity > 1
                                                ?
                                                quantity - 1
                                                :
                                                1
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
                                        setQuantity( quantity + 1 )
                                    }
                                >

                                    +

                                </button>


                            </div>

                        )
                    }




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







            <section className="description-section">


                <h2>

                    Descripción

                </h2>




                <p>

                    { book.descripcion }

                </p>



            </section>





        </main>

    );

}


export default BookDetail;