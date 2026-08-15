import "./Profile.css";

import { useContext, useState } from "react";

import {
    UserCircle,
    Mail,
    Lock,
    LogOut,
    Save,
    Trash2,
    Eye,
    EyeOff
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import AlertContext from "../../context/AlertContext";
import { API_URL, authFetch } from "../../config/api";

function Profile()
{
    const {
        usuario,
        logout,
        updateUser
    } = useContext( AuthContext );

    const { mostrarMensaje } =
        useContext( AlertContext );

    const navigate = useNavigate();

    const [ nombre, setNombre ] =
        useState( usuario?.nombre || "" );

    const [ correo, setCorreo ] =
        useState( usuario?.correo || "" );

    const [ passwordActual, setPasswordActual ] =
        useState( "" );

    const [ nuevaPassword, setNuevaPassword ] =
        useState( "" );

    const [ confirmarPassword, setConfirmarPassword ] =
        useState( "" );

    const [ mostrarActual, setMostrarActual ] =
        useState( false );

    const [ mostrarNueva, setMostrarNueva ] =
        useState( false );

    const [ mostrarConfirmacion, setMostrarConfirmacion ] =
        useState( false );

    const [ borrandoCuenta, setBorrandoCuenta ] =
        useState( false );

    const actualizarPerfil = async ( datos, mensaje ) =>
    {
        try
        {
            const respuesta = await authFetch(
                `${API_URL}/usuarios/${ usuario.id }`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( datos )
                }
            );

            const texto = await respuesta.text();

            let resultado;

            try
            {
                resultado = JSON.parse( texto );
            }
            catch
            {
                resultado = texto;
            }

            if ( !respuesta.ok )
            {
                mostrarMensaje(
                    typeof resultado === "string"
                        ? resultado
                        : resultado.message,
                    "error"
                );

                return false;
            }

            updateUser( resultado );

            mostrarMensaje(
                mensaje,
                "success"
            );

            return true;
        }
        catch ( error )
        {
            console.error( error );

            mostrarMensaje(
                "No fue posible actualizar el perfil.",
                "error"
            );

            return false;
        }
    };

    const guardarNombre = async () =>
    {
        if ( !nombre.trim() )
        {
            mostrarMensaje(
                "El nombre es obligatorio.",
                "warning"
            );

            return;
        }

        await actualizarPerfil(
            {
                nombre: nombre.trim(),
                correo: usuario.correo
            },
            "Nombre actualizado correctamente."
        );
    };

    const guardarCorreo = async () =>
    {
        if ( !correo.trim() )
        {
            mostrarMensaje(
                "El correo es obligatorio.",
                "warning"
            );

            return;
        }

        if ( !passwordActual.trim() )
        {
            mostrarMensaje(
                "Escribe tu contraseña actual para cambiar el correo.",
                "warning"
            );

            return;
        }

        const actualizado = await actualizarPerfil(
            {
                nombre: usuario.nombre,
                correo: correo.trim(),
                passwordActual
            },
            "Correo actualizado correctamente."
        );

        if ( actualizado )
        {
            setPasswordActual( "" );
        }
    };

    const cambiarPassword = async () =>
    {
        if ( !passwordActual.trim() )
        {
            mostrarMensaje(
                "Escribe tu contraseña actual.",
                "warning"
            );

            return;
        }

        if ( !nuevaPassword || !confirmarPassword )
        {
            mostrarMensaje(
                "Completa los campos de la nueva contraseña.",
                "warning"
            );

            return;
        }

        if ( nuevaPassword !== confirmarPassword )
        {
            mostrarMensaje(
                "Las contraseñas no coinciden.",
                "warning"
            );

            return;
        }

        const actualizado = await actualizarPerfil(
            {
                nombre: usuario.nombre,
                correo: usuario.correo,
                passwordActual,
                nuevaPassword,
                confirmarPassword
            },
            "Contraseña actualizada correctamente."
        );

        if ( actualizado )
        {
            setPasswordActual( "" );
            setNuevaPassword( "" );
            setConfirmarPassword( "" );
        }
    };

    const cerrarSesion = () =>
    {
        logout();
        navigate( "/" );
    };

    const borrarCuenta = async () =>
    {
        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
        );

        if ( !confirmar )
        {
            return;
        }

        const password = window.prompt(
            "Escribe tu contraseña actual para confirmar:"
        );

        if ( !password )
        {
            return;
        }

        setBorrandoCuenta( true );

        try
        {
            const respuesta = await authFetch(
                `${API_URL}/usuarios/${ usuario.id }?password=${ encodeURIComponent( password ) }`,
                {
                    method: "DELETE"
                }
            );

            const mensaje = await respuesta.text();

            if ( !respuesta.ok )
            {
                mostrarMensaje(
                    mensaje,
                    "error"
                );

                return;
            }

            logout();
            navigate( "/" );

            mostrarMensaje(
                "Tu cuenta fue eliminada correctamente.",
                "success"
            );
        }
        catch ( error )
        {
            console.error( error );

            mostrarMensaje(
                "No fue posible eliminar la cuenta.",
                "error"
            );
        }
        finally
        {
            setBorrandoCuenta( false );
        }
    };

    if ( !usuario )
    {
        return (

            <main className="profile-page">

                <section className="profile-card profile-empty">

                    <UserCircle size={ 64 } />

                    <h1>
                        No has iniciado sesión
                    </h1>

                    <p>
                        Inicia sesión para acceder a tu perfil.
                    </p>

                    <button
                        className="profile-button"
                        onClick={ () => navigate( "/login" ) }
                    >
                        Iniciar sesión
                    </button>

                </section>

            </main>
        );
    }

    return (

        <main className="profile-page">

            <section className="profile-card">

                <div className="profile-header">

                    <UserCircle size={ 76 } />

                    <div>
                        <span className="profile-label">
                            Cuenta personal
                        </span>

                        <h1>
                            Mi perfil
                        </h1>

                        <p>
                            Administra tu información y seguridad.
                        </p>
                    </div>

                </div>

                <section className="profile-section">

                    <div className="section-title">
                        <UserCircle size={ 20 } />

                        <div>
                            <h2>
                                Información personal
                            </h2>

                            <p>
                                Puedes actualizar cada dato por separado.
                            </p>
                        </div>
                    </div>

                    <div className="profile-field-card">

                        <div className="profile-field-content">

                            <UserCircle size={ 22 } />

                            <div>
                                <span>
                                    Nombre
                                </span>

                                <strong>
                                    {usuario.nombre}
                                </strong>
                            </div>

                        </div>

                        <div className="profile-edit-row">

                            <input
                                type="text"
                                value={ nombre }
                                onChange={ ( e ) =>
                                    setNombre( e.target.value )
                                }
                                placeholder="Nuevo nombre"
                            />

                            <button
                                className="save-small-button"
                                onClick={ guardarNombre }
                            >
                                <Save size={ 17 } />
                                Guardar
                            </button>

                        </div>

                    </div>

                    <div className="profile-field-card">

                        <div className="profile-field-content">

                            <Mail size={ 22 } />

                            <div>
                                <span>
                                    Correo electrónico
                                </span>

                                <strong>
                                    {usuario.correo}
                                </strong>
                            </div>

                        </div>

                        <div className="profile-edit-row">

                            <input
                                type="email"
                                value={ correo }
                                onChange={ ( e ) =>
                                    setCorreo( e.target.value )
                                }
                                placeholder="Nuevo correo"
                            />

                            <button
                                className="save-small-button"
                                onClick={ guardarCorreo }
                            >
                                <Save size={ 17 } />
                                Guardar
                            </button>

                        </div>

                        <div className="profile-password-row">

                            <Lock size={ 20 } />

                            <input
                                type={
                                    mostrarActual
                                        ? "text"
                                        : "password"
                                }
                                value={ passwordActual }
                                onChange={ ( e ) =>
                                    setPasswordActual( e.target.value )
                                }
                                placeholder="Contraseña actual"
                            />

                            <button
                                type="button"
                                className="eye-button"
                                onClick={ () =>
                                    setMostrarActual( !mostrarActual )
                                }
                            >
                                {mostrarActual
                                    ? <EyeOff size={ 18 } />
                                    : <Eye size={ 18 } />
                                }
                            </button>

                        </div>

                    </div>

                </section>

                <section className="profile-section security-section">

                    <div className="section-title">
                        <Lock size={ 20 } />

                        <div>
                            <h2>
                                Seguridad
                            </h2>

                            <p>
                                Cambia tu contraseña cuando lo necesites.
                            </p>
                        </div>
                    </div>

                    <div className="profile-password-row">

                        <Lock size={ 20 } />

                        <input
                            type={
                                mostrarNueva
                                    ? "text"
                                    : "password"
                            }
                            value={ nuevaPassword }
                            onChange={ ( e ) =>
                                setNuevaPassword( e.target.value )
                            }
                            placeholder="Nueva contraseña"
                        />

                        <button
                            type="button"
                            className="eye-button"
                            onClick={ () =>
                                setMostrarNueva( !mostrarNueva )
                            }
                        >
                            {mostrarNueva
                                ? <EyeOff size={ 18 } />
                                : <Eye size={ 18 } />
                            }
                        </button>

                    </div>

                    <div className="profile-password-row">

                        <Lock size={ 20 } />

                        <input
                            type={
                                mostrarConfirmacion
                                    ? "text"
                                    : "password"
                            }
                            value={ confirmarPassword }
                            onChange={ ( e ) =>
                                setConfirmarPassword( e.target.value )
                            }
                            placeholder="Confirmar nueva contraseña"
                        />

                        <button
                            type="button"
                            className="eye-button"
                            onClick={ () =>
                                setMostrarConfirmacion(
                                    !mostrarConfirmacion
                                )
                            }
                        >
                            {mostrarConfirmacion
                                ? <EyeOff size={ 18 } />
                                : <Eye size={ 18 } />
                            }
                        </button>

                    </div>

                    <div className="security-actions">

                        <div className="current-password-row">

                            <Lock size={ 20 } />

                            <input
                                type="password"
                                value={ passwordActual }
                                onChange={ ( e ) =>
                                    setPasswordActual( e.target.value )
                                }
                                placeholder="Contraseña actual"
                            />

                        </div>

                        <button
                            className="save-password-button"
                            onClick={ cambiarPassword }
                        >
                            <Save size={ 17 } />
                            Cambiar contraseña
                        </button>

                    </div>

                </section>

                <section className="profile-danger-zone">

                    <div>
                        <h2>
                            Zona de cuenta
                        </h2>

                        <p>
                            Estas acciones afectan permanentemente tu cuenta.
                        </p>
                    </div>

                    <div className="profile-danger-actions">

                        <button
                            className="logout-profile-button"
                            onClick={ cerrarSesion }
                        >
                            <LogOut size={ 18 } />
                            Cerrar sesión
                        </button>

                        <button
                            className="delete-profile-button"
                            onClick={ borrarCuenta }
                            disabled={ borrandoCuenta }
                        >
                            <Trash2 size={ 18 } />
                            {borrandoCuenta
                                ? "Eliminando..."
                                : "Borrar cuenta"
                            }
                        </button>

                    </div>

                </section>

            </section>

        </main>
    );
}

export default Profile;