import "./LibrosAdmin.css";

import { useEffect, useState } from "react";

import {
    Plus,
    Pencil,
    Trash2,
    Search,
    Eye,
    EyeOff
} from "lucide-react";

import LibroModal from "./LibroModal";

import { imagenUrl } from "../../config/api";

import {
    obtenerLibrosAdmin,
    crearLibro,
    actualizarLibro,
    toggleActivo,
    eliminarLibro as eliminarLibroService
} from "../../services/libroService";


// Módulo encargado de administrar los libros.
function LibrosAdmin()
{
    const [ libros, setLibros ] = useState( [] );
    const [ busqueda, setBusqueda ] = useState( "" );
    const [ categoria, setCategoria ] = useState( "Todas" );
    const [ formato, setFormato ] = useState( "Todos" );
    const [ stock, setStock ] = useState( "Todos" );
    const [ estado, setEstado ] = useState( "Todos" );

    const [ modalAbierto, setModalAbierto ] = useState( false );
    const [ libroEditar, setLibroEditar ] = useState( null );

    // Carga los libros desde la API.
    const cargarLibros = async () =>
    {
        try
        {
            const response = await obtenerLibrosAdmin();

            const librosConvertidos = response.data.map(
                ( libro ) => ( {
                    ...libro,
                    formatos: libro.formatos
                        ? libro.formatos.split( "," )
                        : []
                } )
            );

            setLibros( librosConvertidos );
        }
        catch ( error )
        {
            console.error(
                "Error al cargar libros:",
                error
            );
        }
    };

    useEffect( () =>
    {
        cargarLibros();
    }, [] );

    const abrirAgregar = () =>
    {
        setLibroEditar( null );
        setModalAbierto( true );
    };

    const abrirEditar = ( libro ) =>
    {
        setLibroEditar( libro );
        setModalAbierto( true );
    };

    const cerrarModal = () =>
    {
        setModalAbierto( false );
        setLibroEditar( null );
    };

    const guardarLibro = async ( formData ) =>
    {
        try
        {
            if ( libroEditar )
            {
                await actualizarLibro(
                    libroEditar.id,
                    formData
                );
            }
            else
            {
                await crearLibro( formData );
            }

            await cargarLibros();
            cerrarModal();
        }
        catch ( error )
        {
            console.error(
                "Error al guardar libro:",
                error
            );
        }
    };

    const eliminarLibro = async ( id ) =>
    {
        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar este libro permanentemente? Esta acción no se puede deshacer."
        );

        if ( !confirmar )
        {
            return;
        }

        try
        {
            const response = await eliminarLibroService( id );
            alert( response.data );
            await cargarLibros();
        }
        catch ( error )
        {
            const mensaje = error.response?.data || "No fue posible eliminar el libro.";
            alert( typeof mensaje === "string" ? mensaje : JSON.stringify( mensaje ) );
            console.error(
                "Error al eliminar libro:",
                error
            );
        }
    };

    const toggleLibroActivo = async ( id, activoActual ) =>
    {
        const accion = activoActual ? "desactivar" : "activar";
        const confirmar = window.confirm(
            `¿Seguro que deseas ${ accion } este libro?`
        );

        if ( !confirmar )
        {
            return;
        }

        try
        {
            await toggleActivo( id );
            await cargarLibros();
        }
        catch ( error )
        {
            const mensaje = error.response?.data || "No fue posible cambiar el estado del libro.";
            alert( typeof mensaje === "string" ? mensaje : JSON.stringify( mensaje ) );
            console.error(
                "Error al cambiar estado del libro:",
                error
            );
        }
    };

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
            libro.formatos?.includes( formato );

        const coincideStock =
            stock === "Todos" ||
            ( stock === "Disponible" && libro.stock > 0 ) ||
            ( stock === "Agotado" && libro.stock === 0 );

        const coincideEstado =
            estado === "Todos" ||
            ( estado === "Activos" && libro.activo !== false ) ||
            ( estado === "Inactivos" && libro.activo === false );

        return (
            coincideBusqueda &&
            coincideCategoria &&
            coincideFormato &&
            coincideStock &&
            coincideEstado
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
                    type="button"
                    className="add-book"
                    onClick={ abrirAgregar }
                >
                    <Plus size={ 20 } />
                    Agregar libro
                </button>

            </div>

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
                    {categorias.map( ( item ) => (
                        <option
                            key={ item }
                            value={ item }
                        >
                            {item}
                        </option>
                    ) )}
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

                <select
                    value={ estado }
                    onChange={ ( e ) =>
                        setEstado( e.target.value )
                    }
                >
                    <option value="Todos">
                        Todos los estados
                    </option>

                    <option value="Activos">
                        Activos
                    </option>

                    <option value="Inactivos">
                        Inactivos
                    </option>
                </select>

            </div>

            <p className="results-count">
                Mostrando {librosFiltrados.length} de {libros.length} libros
            </p>

            <div className="books-table">

                <div className="table-header">
                    <span>Libro</span>
                    <span>Categoría</span>
                    <span>Precio físico</span>
                    <span>Stock</span>
                    <span>Acciones</span>
                </div>

                {librosFiltrados.length === 0 ? (

                    <div className="empty-books">
                        No se encontraron libros.
                    </div>

                ) : (

                    librosFiltrados.map( ( libro ) => (

                        <div
                            className="table-row"
                            key={ libro.id }
                        >

                            <div className="book-info">

                                <img
                                    src={
                                        libro.imagen
                                            ? imagenUrl( libro.imagen )
                                            : "/images/default-book.jpg"
                                    }
                                    alt={`Portada de ${ libro.titulo }`}
                                />

                                <div>
                                    <strong>
                                        {libro.titulo}
                                    </strong>

                                    <span>
                                        {libro.autor}
                                    </span>

                                    {libro.activo === false && (
                                        <span className="inactive-badge">
                                            Inactivo
                                        </span>
                                    )}
                                </div>

                            </div>

                            <span data-label="Categoría">
                                {libro.categoria}
                            </span>

                            <span data-label="Precio físico">
                                $
                                {Number(
                                    libro.precioFisico || 0
                                ).toLocaleString( "es-CO" )}
                            </span>

                            <span data-label="Stock">
                                {libro.stock}
                            </span>

                            <div
                                className="book-actions"
                                data-label="Acciones"
                            >
                                <button
                                    type="button"
                                    className={ `btn-toggle ${ libro.activo === false ? "inactivo" : "activo" }` }
                                    title={ libro.activo === false ? "Activar libro" : "Desactivar libro" }
                                    aria-label={ `${ libro.activo === false ? "Activar" : "Desactivar" } ${ libro.titulo }` }
                                    onClick={ () =>
                                        toggleLibroActivo( libro.id, libro.activo !== false )
                                    }
                                >
                                    {libro.activo === false
                                        ? <EyeOff size={ 18 } />
                                        : <Eye size={ 18 } />
                                    }
                                </button>

                                <button
                                    type="button"
                                    title="Editar libro"
                                    aria-label={`Editar ${ libro.titulo }`}
                                    onClick={ () =>
                                        abrirEditar( libro )
                                    }
                                >
                                    <Pencil size={ 18 } />
                                </button>

                                <button
                                    type="button"
                                    className="btn-delete"
                                    title="Eliminar permanentemente"
                                    aria-label={`Eliminar ${ libro.titulo }`}
                                    onClick={ () =>
                                        eliminarLibro( libro.id )
                                    }
                                >
                                    <Trash2 size={ 18 } />
                                </button>
                            </div>

                        </div>

                    ) )

                )}

            </div>

            {modalAbierto && (

                <LibroModal
                    libroEditar={ libroEditar }
                    onClose={ cerrarModal }
                    onGuardar={ guardarLibro }
                />

            )}

        </section>
    );
}

export default LibrosAdmin;