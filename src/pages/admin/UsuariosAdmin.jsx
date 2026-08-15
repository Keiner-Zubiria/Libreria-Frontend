import "./UsuariosAdmin.css";

import { useContext, useEffect, useMemo, useState } from "react";

import
{
    Search,
    User,
    Mail,
    Phone,
    MapPin,
    ShieldCheck
} from "lucide-react";

import AlertContext from "../../context/AlertContext";
import AuthContext from "../../context/AuthContext";

import { API_URL, authFetch } from "../../config/api";


function UsuariosAdmin()
{

    const { mostrarMensaje } = useContext( AlertContext );

    const { usuario } = useContext( AuthContext );


    const [ usuarios, setUsuarios ] = useState( [] );

    const [ cargando, setCargando ] = useState( true );

    const [ busqueda, setBusqueda ] = useState( "" );

    const [ rolFiltro, setRolFiltro ] = useState( "Todos" );


    // Obtiene todos los usuarios.
    const obtenerUsuarios = async () =>
    {

        try
        {

            const respuesta = await authFetch(
                `${API_URL}/usuarios/lista`
            );


            if ( !respuesta.ok )
            {

                throw new Error(
                    "No fue posible obtener los usuarios."
                );

            }


            const datos = await respuesta.json();

            setUsuarios( datos );

        }
        catch ( error )
        {

            console.error( error );

        }
        finally
        {

            setCargando( false );

        }

    };


    // Carga inicial.
    useEffect( () =>
    {

        obtenerUsuarios();

    }, [] );


    // Cambia el rol del usuario.
    const cambiarRol = async ( id, rol ) =>
    {

        // Evita cambiar el propio rol.
        if ( usuario?.id === id )
        {

            mostrarMensaje(
                "No puedes cambiar tu propio rol.",
                "warning"
            );

            return;

        }


        const confirmar = window.confirm(

            `¿Deseas cambiar el rol de este usuario a "${ rol }"?`

        );


        if ( !confirmar )
        {

            return;

        }


        try
        {

            const respuesta = await authFetch(

                `${API_URL}/usuarios/${ id }/rol`,

                {

                    method: "PUT",

                    headers:
                    {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify( rol )

                }

            );


            if ( !respuesta.ok )
            {

                throw new Error(
                    "No fue posible actualizar el rol."
                );

            }


            const usuarioActualizado =
                await respuesta.json();


            setUsuarios( usuariosActuales =>

                usuariosActuales.map( item =>

                    item.id === id

                        ? usuarioActualizado

                        : item

                )

            );


            mostrarMensaje(

                "Rol actualizado correctamente.",

                "success"

            );

        }
        catch ( error )
        {

            console.error( error );

            mostrarMensaje(

                "No fue posible actualizar el rol.",

                "error"

            );

        }

    };


    // Filtra los usuarios.
    const usuariosFiltrados = useMemo( () =>
    {

        let lista = [ ...usuarios ];


        if ( rolFiltro !== "Todos" )
        {

            lista = lista.filter(

                item => item.rol === rolFiltro

            );

        }


        if ( busqueda.trim() !== "" )
        {

            const texto =
                busqueda.toLowerCase().trim();


            lista = lista.filter( item =>

                item.nombre
                    ?.toLowerCase()
                    .includes( texto ) ||

                item.correo
                    ?.toLowerCase()
                    .includes( texto ) ||

                item.telefono
                    ?.toLowerCase()
                    .includes( texto ) ||

                item.ciudad
                    ?.toLowerCase()
                    .includes( texto )

            );

        }


        return lista;

    }, [

        usuarios,
        rolFiltro,
        busqueda

    ] );


    if ( cargando )
    {

        return (

            <main className="usuarios-admin">

                <div className="usuarios-vacio">

                    <User size={ 55 } />

                    <h2>
                        Cargando usuarios...
                    </h2>

                </div>

            </main>

        );

    }


    return (

        <main className="usuarios-admin">

            <header className="usuarios-header">

                <h1>
                    Gestión de usuarios
                </h1>

                <p>
                    Administra las cuentas y los roles registrados.
                </p>

            </header>


            {/* Barra de herramientas */ }

            <section className="usuarios-toolbar">

                <div className="usuarios-search">

                    <Search size={ 18 } />

                    <input

                        type="text"

                        placeholder="Buscar usuario..."

                        value={ busqueda }

                        onChange={ e =>
                            setBusqueda( e.target.value )
                        }

                    />

                </div>


                <select

                    value={ rolFiltro }

                    onChange={ e =>
                        setRolFiltro( e.target.value )
                    }

                >

                    <option value="Todos">
                        Todos los roles
                    </option>

                    <option value="usuario">
                        Usuarios
                    </option>

                    <option value="administrador">
                        Administradores
                    </option>

                </select>

            </section>


            {/* Lista */ }

            <section className="usuarios-lista">

                {

                    usuariosFiltrados.length === 0

                        ? (

                            <div className="usuarios-vacio">

                                <User size={ 55 } />

                                <h2>
                                    No se encontraron usuarios
                                </h2>

                                <p>
                                    Prueba cambiando la búsqueda o el filtro.
                                </p>

                            </div>

                        )

                        : (

                            usuariosFiltrados.map( ( item ) =>

                                <article

                                    className="usuario-card"

                                    key={ item.id }

                                >

                                    <div className="usuario-info">

                                        <div className="usuario-icono">

                                            <User size={ 22 } />

                                        </div>


                                        <div className="usuario-datos">

                                            <div className="usuario-nombre">

                                                <strong>
                                                    { item.nombre }
                                                </strong>

                                                <span
                                                    className={ `usuario-rol rol-${ item.rol
                                                        ?.toLowerCase()
                                                        .replaceAll( " ", "-" ) }` }
                                                >

                                                    <ShieldCheck size={ 13 } />

                                                    {
                                                        item.rol === "administrador"
                                                            ? "Administrador"
                                                            : "Usuario"
                                                    }

                                                </span>

                                            </div>

                                            {
                                                usuario?.id === item.id && (

                                                    <div className="usuario-subtitulo">
                                                        Este es tu usuario
                                                    </div>

                                                )
                                            }


                                            <div className="usuario-contacto">

                                                <span>

                                                    <Mail size={ 14 } />

                                                    { item.correo }

                                                </span>


                                                {

                                                    item.telefono &&

                                                    <span>

                                                        <Phone size={ 14 } />

                                                        { item.telefono }

                                                    </span>

                                                }


                                                {

                                                    item.ciudad &&

                                                    <span>

                                                        <MapPin size={ 14 } />

                                                        { item.ciudad }

                                                    </span>

                                                }


                                                {

                                                    item.direccion &&

                                                    <span>

                                                        <MapPin size={ 14 } />

                                                        { item.direccion }

                                                    </span>

                                                }

                                            </div>

                                        </div>

                                    </div>


                                    <div className="usuario-acciones">

                                        <label
                                            htmlFor={ `rol-${ item.id }` }
                                        >

                                            Rol

                                        </label>


                                        <select

                                            id={ `rol-${ item.id }` }

                                            value={
                                                item.rol || "usuario"
                                            }

                                            disabled={
                                                usuario?.id === item.id
                                            }

                                            onChange={ e =>

                                                cambiarRol(

                                                    item.id,

                                                    e.target.value

                                                )

                                            }

                                        >

                                            <option value="usuario">
                                                Usuario
                                            </option>

                                            <option value="administrador">
                                                Administrador
                                            </option>

                                        </select>


                                        {

                                            usuario?.id === item.id &&

                                            <small className="usuario-actual">
                                                No puedes cambiar tu propio rol
                                            </small>

                                        }

                                    </div>

                                </article>

                            )

                        )

                }

            </section>

        </main>

    );
}

export default UsuariosAdmin;