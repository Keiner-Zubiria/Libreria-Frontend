import "./CategoriasAdmin.css";

import { useEffect, useState } from "react";

import
{
    Plus,
    Pencil,
    Trash2,
    Tag
}
from "lucide-react";

import { API_URL, authFetch } from "../../config/api";


function CategoriasAdmin()
{

    const [ categorias, setCategorias ] = useState( [] );

    const [ cargando, setCargando ] = useState( true );

    const [ nombre, setNombre ] = useState( "" );

    const [ descripcion, setDescripcion ] = useState( "" );

    const [ editandoId, setEditandoId ] = useState( null );


    // Obtiene las categorías desde el backend.
    const obtenerCategorias = async () =>
    {

        try
        {

            const respuesta = await authFetch(
                `${API_URL}/categorias`
            );


            if ( !respuesta.ok )
            {

                throw new Error(
                    "No fue posible obtener las categorías."
                );

            }


            const datos = await respuesta.json();

            setCategorias( datos );

        }
        catch ( error )
        {

            console.error(
                "Error al cargar categorías:",
                error
            );

        }
        finally
        {

            setCargando( false );

        }

    };


    // Carga inicial.
    useEffect( () =>
    {

        obtenerCategorias();

    }, [] );


    // Guarda una categoría nueva o actualiza una existente.
    const guardarCategoria = async ( e ) =>
    {

        e.preventDefault();


        if ( !nombre.trim() )
        {

            return;

        }


        try
        {

            const url = editandoId

                ? `${API_URL}/categorias/${ editandoId }`

                : `${API_URL}/categorias`;


            const metodo = editandoId
                ? "PUT"
                : "POST";


            const respuesta = await authFetch(

                url,

                {

                    method: metodo,

                    headers:
                    {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(
                        {

                            nombre: nombre.trim(),

                            descripcion: descripcion.trim()

                        }
                    )

                }

            );


            if ( !respuesta.ok )
            {

                throw new Error(
                    "No fue posible guardar la categoría."
                );

            }


            await obtenerCategorias();

            limpiarFormulario();

        }
        catch ( error )
        {

            console.error(
                "Error al guardar categoría:",
                error
            );

        }

    };


    // Prepara una categoría para editarla.
    const editarCategoria = ( categoria ) =>
    {

        setEditandoId( categoria.id );

        setNombre(
            categoria.nombre || ""
        );

        setDescripcion(
            categoria.descripcion || ""
        );

    };


    // Elimina una categoría.
    const eliminarCategoria = async ( id ) =>
    {

        const confirmar = window.confirm(

            "¿Seguro que deseas eliminar esta categoría?"

        );


        if ( !confirmar )
        {

            return;

        }


        try
        {

            const respuesta = await authFetch(

                `${API_URL}/categorias/${ id }`,

                {

                    method: "DELETE"

                }

            );


            if ( !respuesta.ok )
            {

                throw new Error(
                    "No fue posible eliminar la categoría."
                );

            }


            await obtenerCategorias();

        }
        catch ( error )
        {

            console.error(
                "Error al eliminar categoría:",
                error
            );

        }

    };


    // Limpia el formulario.
    const limpiarFormulario = () =>
    {

        setNombre( "" );

        setDescripcion( "" );

        setEditandoId( null );

    };


    return (

        <section className="categorias-admin">


            <div className="categorias-header">

                <div>

                    <h1>
                        Gestión de categorías
                    </h1>

                    <p>
                        Administra las categorías disponibles para los libros.
                    </p>

                </div>

            </div>


            <div className="categorias-contenido">


                {/* Formulario */}

                <div className="categoria-formulario">

                    <div className="categoria-form-header">

                        <Tag size={ 22 } />

                        <h2>

                            {

                                editandoId

                                    ? "Editar categoría"

                                    : "Nueva categoría"

                            }

                        </h2>

                    </div>


                    <form
                        onSubmit={ guardarCategoria }
                    >


                        <div className="categoria-campo">

                            <label>
                                Nombre
                            </label>

                            <input

                                type="text"

                                value={ nombre }

                                onChange={ e =>
                                    setNombre( e.target.value )
                                }

                                placeholder="Ej. Fantasía"

                                required

                            />

                        </div>


                        <div className="categoria-campo">

                            <label>
                                Descripción
                            </label>

                            <textarea

                                rows="4"

                                value={ descripcion }

                                onChange={ e =>
                                    setDescripcion( e.target.value )
                                }

                                placeholder="Descripción de la categoría..."

                            />

                        </div>


                        <div className="categoria-botones">


                            {

                                editandoId && (

                                    <button

                                        type="button"

                                        className="categoria-cancelar"

                                        onClick={ limpiarFormulario }

                                    >

                                        Cancelar

                                    </button>

                                )

                            }


                            <button

                                type="submit"

                                className="categoria-guardar"

                            >

                                <Plus size={ 18 } />

                                {

                                    editandoId

                                        ? "Guardar cambios"

                                        : "Agregar categoría"

                                }

                            </button>


                        </div>


                    </form>

                </div>



                {/* Lista de categorías */}

                <div className="categorias-lista">


                    <div className="categorias-lista-header">

                        <h2>
                            Categorías registradas
                        </h2>

                        <span>
                            { categorias.length }
                        </span>

                    </div>


                    {

                        cargando

                            ? (

                                <div className="categorias-vacio">

                                    <Tag size={ 45 } />

                                    <p>
                                        Cargando categorías...
                                    </p>

                                </div>

                            )

                            : categorias.length === 0

                                ? (

                                    <div className="categorias-vacio">

                                        <Tag size={ 45 } />

                                        <h3>
                                            No hay categorías
                                        </h3>

                                        <p>
                                            Agrega la primera categoría para comenzar.
                                        </p>

                                    </div>

                                )

                                : (

                                    <div className="categorias-items">

                                        {

                                            categorias.map(
                                                categoria => (

                                                    <article

                                                        className="categoria-card"

                                                        key={ categoria.id }

                                                    >


                                                        <div className="categoria-icono">

                                                            <Tag size={ 21 } />

                                                        </div>


                                                        <div className="categoria-datos">

                                                            <strong>

                                                                { categoria.nombre }

                                                            </strong>

                                                            <p>

                                                                {

                                                                    categoria.descripcion ||

                                                                    "Sin descripción."

                                                                }

                                                            </p>

                                                        </div>


                                                        <div className="categoria-acciones">


                                                            <button

                                                                type="button"

                                                                title="Editar categoría"

                                                                onClick={ () =>
                                                                    editarCategoria(
                                                                        categoria
                                                                    )
                                                                }

                                                            >

                                                                <Pencil size={ 18 } />

                                                            </button>


                                                            <button

                                                                type="button"

                                                                title="Eliminar categoría"

                                                                onClick={ () =>
                                                                    eliminarCategoria(
                                                                        categoria.id
                                                                    )
                                                                }

                                                            >

                                                                <Trash2 size={ 18 } />

                                                            </button>


                                                        </div>


                                                    </article>

                                                )

                                            )

                                        }

                                    </div>

                                )

                    }


                </div>


            </div>


        </section>

    );

}


export default CategoriasAdmin;