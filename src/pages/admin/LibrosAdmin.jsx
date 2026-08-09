import "./LibrosAdmin.css";

import { useState } from "react";

import
{
    Plus,
    Pencil,
    Trash2,
    Search
} from "lucide-react";

import books from "../../data/books";
import LibroModal from "./LibroModal";


// Módulo encargado de administrar los libros.
function LibrosAdmin()
{

    // Carga los libros desde localStorage o usa los iniciales.
    const [ libros, setLibros ] = useState( () =>
    {

        const librosGuardados = localStorage.getItem( "libros" );


        if ( librosGuardados )
        {

            return JSON.parse( librosGuardados );

        }


        localStorage.setItem(

            "libros",

            JSON.stringify( books )

        );


        return books;

    } );



    const [ busqueda, setBusqueda ] = useState( "" );

    const [ categoria, setCategoria ] = useState( "Todas" );

    const [ formato, setFormato ] = useState( "Todos" );

    const [ stock, setStock ] = useState( "Todos" );


    // Controla la apertura del modal.
    const [ modalAbierto, setModalAbierto ] = useState( false );


    // Libro que se está editando.
    const [ libroEditar, setLibroEditar ] = useState( null );



    // Guarda los cambios del catálogo.
    const guardarLibros = ( nuevosLibros ) =>
    {

        setLibros( nuevosLibros );


        localStorage.setItem(

            "libros",

            JSON.stringify( nuevosLibros )

        );

    };



    // Abre el modal para agregar un libro.
    const abrirAgregar = () =>
    {

        setLibroEditar( null );

        setModalAbierto( true );

    };



    // Abre el modal para editar un libro.
    const abrirEditar = ( libro ) =>
    {

        setLibroEditar( libro );

        setModalAbierto( true );

    };



    // Guarda un libro nuevo o actualizado.
    const guardarLibro = ( libroGuardado ) =>
    {

        // Si existe un libro con el mismo ID,
        // significa que estamos editando.
        const existe = libros.some(

            ( libro ) => libro.id === libroGuardado.id

        );


        if ( existe )
        {

            const librosActualizados = libros.map(

                ( libro ) =>

                    libro.id === libroGuardado.id

                        ? libroGuardado

                        : libro

            );


            guardarLibros( librosActualizados );

        }

        else
        {

            guardarLibros( [

                ...libros,

                libroGuardado

            ] );

        }


        setModalAbierto( false );

        setLibroEditar( null );

    };



    // Elimina un libro del catálogo.
    const eliminarLibro = ( id ) =>
    {

        const confirmar = window.confirm(

            "¿Seguro que deseas eliminar este libro del catálogo?"

        );


        if ( !confirmar )
        {

            return;

        }


        const nuevosLibros = libros.filter(

            ( libro ) => libro.id !== id

        );


        guardarLibros( nuevosLibros );

    };



    // Aplica los filtros seleccionados.
    const librosFiltrados = libros.filter( ( libro ) =>
    {

        const texto = busqueda.toLowerCase();


        const coincideBusqueda =

            libro.titulo.toLowerCase().includes( texto ) ||

            libro.autor.toLowerCase().includes( texto );



        const coincideCategoria =

            categoria === "Todas" ||

            libro.categoria === categoria;



        const coincideFormato =

            formato === "Todos" ||

            libro.formatos.includes( formato );



        const coincideStock =

            stock === "Todos" ||

            ( stock === "Disponible" && libro.stock > 0 ) ||

            ( stock === "Agotado" && libro.stock === 0 );



        return (

            coincideBusqueda &&

            coincideCategoria &&

            coincideFormato &&

            coincideStock

        );

    } );



    const categorias = [

        "Todas",

        ...new Set(

            libros.map( ( libro ) => libro.categoria )

        )

    ];



    return (

        <section className="libros-admin">


            <div className="libros-header">


                <div>

                    <h1>

                        Gestión de libros

                    </h1>


                    <p>

                        Administra el catálogo de la librería.

                    </p>

                </div>



                <button

                    className="add-book"

                    onClick={ abrirAgregar }

                >

                    <Plus size={ 20 } />

                    Agregar libro

                </button>


            </div>



            {/* Filtros */}
            <div className="books-filters">


                <div className="books-search-box">

                    <Search size={ 18 } />


                    <input

                        type="text"

                        placeholder="Buscar por título o autor..."

                        value={ busqueda }

                        onChange={ ( e ) =>

                            setBusqueda( e.target.value )

                        }

                    />

                </div>



                <select

                    value={ categoria }

                    onChange={ ( e ) =>

                        setCategoria( e.target.value )

                    }

                >

                    {

                        categorias.map( ( item ) =>

                            <option

                                key={ item }

                                value={ item }

                            >

                                { item }

                            </option>

                        )

                    }

                </select>



                <select

                    value={ formato }

                    onChange={ ( e ) =>

                        setFormato( e.target.value )

                    }

                >

                    <option value="Todos">

                        Todos los formatos

                    </option>


                    <option value="Fisico">

                        Físico

                    </option>


                    <option value="Virtual">

                        Virtual

                    </option>

                </select>



                <select

                    value={ stock }

                    onChange={ ( e ) =>

                        setStock( e.target.value )

                    }

                >

                    <option value="Todos">

                        Todo el stock

                    </option>


                    <option value="Disponible">

                        Disponible

                    </option>


                    <option value="Agotado">

                        Agotado

                    </option>

                </select>


            </div>



            <p className="results-count">

                Mostrando { librosFiltrados.length } de { libros.length } libros

            </p>



            <div className="books-table">


                <div className="table-header">

                    <span>
                        Libro
                    </span>


                    <span>
                        Categoría
                    </span>


                    <span>
                        Precio físico
                    </span>


                    <span>
                        Stock
                    </span>


                    <span>
                        Acciones
                    </span>

                </div>



                {

                    librosFiltrados.map( ( libro ) =>

                    (

                        <div

                            className="table-row"

                            key={ libro.id }

                        >


                            <div className="book-info">


                                <img

                                    src={ libro.imagen }

                                    alt={ libro.titulo }

                                />


                                <div>

                                    <strong>

                                        { libro.titulo }

                                    </strong>


                                    <span>

                                        { libro.autor }

                                    </span>

                                </div>


                            </div>



                            <span>

                                { libro.categoria }

                            </span>



                            <span>

                                $

                                { Number(

                                    libro.precioFisico || 0

                                ).toLocaleString( "es-CO" ) }

                            </span>



                            <span>

                                { libro.stock }

                            </span>



                            <div className="book-actions">


                                {/* Editar */}
                                <button

                                    type="button"

                                    title="Editar libro"

                                    onClick={ () =>

                                        abrirEditar( libro )

                                    }

                                >

                                    <Pencil size={ 18 } />

                                </button>



                                {/* Eliminar */}
                                <button

                                    type="button"

                                    title="Eliminar libro"

                                    onClick={ () =>

                                        eliminarLibro( libro.id )

                                    }

                                >

                                    <Trash2 size={ 18 } />

                                </button>


                            </div>


                        </div>

                    ) )

                }


            </div>



            {

                modalAbierto && (

                    <LibroModal

                        libroEditar={ libroEditar }

                        onClose={ () =>

                        {

                            setModalAbierto( false );

                            setLibroEditar( null );

                        } }

                        onGuardar={ guardarLibro }

                    />

                )

            }


        </section>

    );

}


export default LibrosAdmin;