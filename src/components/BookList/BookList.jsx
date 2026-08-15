import "./BookList.css";

import { useEffect, useState } from "react";

import { obtenerLibros } from "../../services/libroService";

import ProductGrid from "../ProductGrid/ProductGrid";


// Componente encargado de mostrar los libros destacados
// en la página principal.
function BookList()
{

    const [ libros, setLibros ] = useState( [] );

    const [ cargando, setCargando ] = useState( true );


    useEffect( () =>
    {

        const cargarLibros = async () =>
        {

            try
            {

                const response = await obtenerLibros();

                const librosDestacados = response.data.filter(

                    ( libro ) => libro.destacado === true

                );

                setLibros( librosDestacados.slice( 0, 5 ) );

            }
            catch ( error )
            {

                console.error(

                    "Error al cargar los libros destacados:",

                    error

                );

            }
            finally
            {

                setCargando( false );

            }

        };


        cargarLibros();

    }, [] );


    return (

        <section className="book-list">


            <div className="section-title">

                <h2>
                    Libros destacados
                </h2>

                <p>
                    Explora algunos de nuestros libros más recomendados.
                </p>

            </div>


            {

                cargando ? (

                    <p>
                        Cargando libros destacados...
                    </p>

                ) : libros.length > 0 ? (

                    <ProductGrid
                        books={ libros }
                    />

                ) : (

                    <p>
                        No hay libros destacados disponibles.
                    </p>

                )

            }


        </section>

    );

}


export default BookList;