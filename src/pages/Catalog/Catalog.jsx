import "./Catalog.css";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import booksData from "../../data/books";

import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";


// Obtiene los libros desde localStorage o usa los iniciales.
const libros = JSON.parse(localStorage.getItem("libros")) || booksData;


// Página donde se mostrará el catálogo completo.
function Catalog()
{

    const [ searchParams ] = useSearchParams();


    const [ search, setSearch ] = useState(

        searchParams.get("buscar") || ""

    );


    const [ category, setCategory ] = useState( "" );

    const [ order, setOrder ] = useState( "" );

    const [ price, setPrice ] = useState( "" );



    // Aplica búsqueda, categoría y precio al catálogo.
    let filteredBooks = libros.filter((book) =>
    {

        const text = search.toLowerCase();


        const matchesSearch =

            book.titulo.toLowerCase().includes( text ) ||

            book.autor.toLowerCase().includes( text );



        const matchesCategory =

            category === "" ||

            book.categoria === category;



        const precio = book.precioFisico || 0;


        let matchesPrice = true;



        if ( price === "40" )
        {

            matchesPrice = precio < 40000;

        }



        if ( price === "60" )
        {

            matchesPrice =

                precio >= 40000 &&

                precio <= 60000;

        }



        if ( price === "80" )
        {

            matchesPrice =

                precio > 60000 &&

                precio <= 80000;

        }



        if ( price === "100" )
        {

            matchesPrice = precio > 80000;

        }



        return (

            matchesSearch &&

            matchesCategory &&

            matchesPrice

        );

    });



    if ( order === "destacados" )
    {

        filteredBooks = filteredBooks.filter(

            (book) => book.destacado

        );

    }



    if ( order === "precio-menor" )
    {

        filteredBooks.sort(

            (a,b) =>

                a.precioFisico - b.precioFisico

        );

    }



    if ( order === "precio-mayor" )
    {

        filteredBooks.sort(

            (a,b) =>

                b.precioFisico - a.precioFisico

        );

    }



    if ( order === "az" )
    {

        filteredBooks.sort(

            (a,b) =>

                a.titulo.localeCompare(b.titulo)

        );

    }



    if ( order === "za" )
    {

        filteredBooks.sort(

            (a,b) =>

                b.titulo.localeCompare(a.titulo)

        );

    }



    if ( order === "ventas" )
    {

        filteredBooks = filteredBooks

            .sort(

                (a,b) =>

                    b.vendidos - a.vendidos

            )

            .slice(0,10);

    }



    return (

        <main className="catalog">


            <div className="catalog-header">


                <h1>

                    Catálogo

                </h1>


                <p>

                    Encuentra libros de diferentes categorías y estilos.

                </p>


            </div>




            <SearchBar

                search={search}

                setSearch={setSearch}

            />




            <FilterBar

                category={category}

                setCategory={setCategory}

                order={order}

                setOrder={setOrder}

                price={price}

                setPrice={setPrice}

            />




            <div className="catalog-results">


                <p>

                    {filteredBooks.length} libros encontrados

                </p>


            </div>




            <ProductGrid

                books={filteredBooks}

            />


        </main>

    );

}


export default Catalog;