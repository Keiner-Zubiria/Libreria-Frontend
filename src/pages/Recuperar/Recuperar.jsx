import "../Login/Login.css";
import "./Recuperar.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import {
    Mail,
    Lock,
    KeyRound,
    Eye,
    EyeOff
} from "lucide-react";

import AlertContext from "../../context/AlertContext";
import { useContext } from "react";
import { API_URL } from "../../config/api";


// Página para recuperar la contraseña olvidada.
function Recuperar()
{

    const { mostrarMensaje } = useContext( AlertContext );

    // Paso 1: pedir el código. Paso 2: ingresar código y nueva contraseña.
    const [ paso, setPaso ] = useState( 1 );

    const [ correo, setCorreo ] = useState( "" );

    const [ codigo, setCodigo ] = useState( "" );

    const [ nuevaPassword, setNuevaPassword ] = useState( "" );

    const [ confirmarPassword, setConfirmarPassword ] = useState( "" );

    const [ mostrarPassword, setMostrarPassword ] = useState( false );

    const [ mostrarConfirmacion, setMostrarConfirmacion ] = useState( false );

    const [ cargando, setCargando ] = useState( false );

    // Código generado por el backend (se muestra porque no hay SMTP).
    const [ codigoGenerado, setCodigoGenerado ] = useState( "" );


    // Solicita el código de recuperación al backend.
    const solicitarCodigo = async ( e ) =>
    {

        e.preventDefault();

        if ( !correo )
        {

            mostrarMensaje(
                "Ingresa tu correo electrónico.",
                "warning"
            );

            return;

        }

        setCargando( true );

        try
        {

            const response = await fetch(
                `${API_URL}/usuarios/recuperar`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( { correo } )
                }
            );

            const datos = await response.json();

            if ( !response.ok )
            {

                mostrarMensaje(
                    datos.mensaje || "No se pudo enviar el código.",
                    "error"
                );

                return;

            }

            // En este proyecto el código se muestra aquí porque
            // el envío por correo requiere un servicio SMTP.
            if ( datos.codigo )
            {

                setCodigoGenerado( datos.codigo );

            }

            mostrarMensaje(
                "Revisa el código que se generó para continuar.",
                "success"
            );

            setPaso( 2 );

        }
        catch ( error )
        {

            console.error( error );

            mostrarMensaje(
                "No se pudo conectar con el servidor.",
                "error"
            );

        }
        finally
        {

            setCargando( false );

        }

    };


    // Restablece la contraseña con el código y la nueva clave.
    const restablecer = async ( e ) =>
    {

        e.preventDefault();

        if ( !codigo )
        {

            mostrarMensaje(
                "Ingresa el código de recuperación.",
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

        setCargando( true );

        try
        {

            const response = await fetch(
                `${API_URL}/usuarios/restablecer`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( {
                        correo,
                        codigo,
                        nuevaPassword
                    } )
                }
            );

            const mensaje = await response.text();

            if ( !response.ok )
            {

                mostrarMensaje(
                    mensaje,
                    "error"
                );

                return;

            }

            mostrarMensaje(
                "Contraseña restablecida. Ya puedes iniciar sesión.",
                "success"
            );

            setTimeout( () =>
            {

                window.location.href = "/login";

            }, 1500 );

        }
        catch ( error )
        {

            console.error( error );

            mostrarMensaje(
                "No se pudo conectar con el servidor.",
                "error"
            );

        }
        finally
        {

            setCargando( false );

        }

    };


    return (

        <main className="login-page">

            <section className="login-card">

                <h1>

                    Letras Mágicas

                </h1>

                <h2>

                    Recuperar contraseña

                </h2>

                <p className="recuperar-intro">

                    {

                        paso === 1

                            ? "Ingresa tu correo y te ayudaremos a recuperar tu cuenta."

                            : `Ingresa el código enviado y define una nueva contraseña.`

                    }

                </p>

                {

                    paso === 1 && (

                        <form

                            className="login-form"

                            onSubmit={ solicitarCodigo }

                        >

                            <div className="input-group">

                                <Mail size={ 20 } />

                                <input

                                    type="email"

                                    placeholder="Correo electrónico"

                                    value={ correo }

                                    onChange={ ( e ) =>

                                        setCorreo( e.target.value )

                                    }

                                    required

                                />

                            </div>

                            <button

                                type="submit"

                                className="login-button"

                                disabled={ cargando }

                            >

                                {

                                    cargando

                                        ? "Enviando..."

                                        : "Enviar código"

                                }

                            </button>

                        </form>

                    )
                }


                {

                    paso === 2 && (

                        <form

                            className="login-form"

                            onSubmit={ restablecer }

                        >

                            {/* Código generado */ }
                            <div className="recuperar-codigo-info">

                                <KeyRound size={ 18 } />

                                <span>

                                    Revisa el correo ingresado:
                                </span>

                                <strong>

                                    { correo }

                                </strong>

                            </div>

                            {

                                codigoGenerado && (

                                    <div className="recuperar-codigo-generado">

                                        <span>

                                            Código de prueba

                                        </span>

                                        <strong>

                                            { codigoGenerado }

                                        </strong>

                                    </div>

                                )

                            }

                            <div className="input-group">

                                <KeyRound size={ 20 } />

                                <input

                                    type="text"

                                    inputMode="numeric"

                                    placeholder="Código de recuperación"

                                    value={ codigo }

                                    onChange={ ( e ) =>

                                        setCodigo( e.target.value )

                                    }

                                    required

                                />

                            </div>

                            <div className="input-group password-group">

                                <Lock size={ 20 } />

                                <input

                                    type={

                                        mostrarPassword

                                            ? "text"

                                            : "password"

                                    }

                                    placeholder="Nueva contraseña"

                                    value={ nuevaPassword }

                                    onChange={ ( e ) =>

                                        setNuevaPassword( e.target.value )

                                    }

                                    required

                                />

                                <button

                                    type="button"

                                    className="password-toggle"

                                    onClick={ () =>

                                        setMostrarPassword( !mostrarPassword )

                                    }

                                    aria-label="Mostrar u ocultar contraseña"

                                >

                                    {

                                        mostrarPassword

                                            ? <EyeOff size={ 20 } />

                                            : <Eye size={ 20 } />

                                    }

                                </button>

                            </div>

                            <div className="input-group password-group">

                                <Lock size={ 20 } />

                                <input

                                    type={

                                        mostrarConfirmacion

                                            ? "text"

                                            : "password"

                                    }

                                    placeholder="Confirmar contraseña"

                                    value={ confirmarPassword }

                                    onChange={ ( e ) =>

                                        setConfirmarPassword( e.target.value )

                                    }

                                    required

                                />

                                <button

                                    type="button"

                                    className="password-toggle"

                                    onClick={ () =>

                                        setMostrarConfirmacion( !mostrarConfirmacion )

                                    }

                                    aria-label="Mostrar u ocultar confirmación"

                                >

                                    {

                                        mostrarConfirmacion

                                            ? <EyeOff size={ 20 } />

                                            : <Eye size={ 20 } />

                                    }

                                </button>

                            </div>

                            <button

                                type="submit"

                                className="login-button"

                                disabled={ cargando }

                            >

                                {

                                    cargando

                                        ? "Restableciendo..."

                                        : "Restablecer contraseña"

                                }

                            </button>

                        </form>

                    )
                }

                <p className="login-footer">

                    <Link to="/login">

                        Volver al inicio de sesión

                    </Link>

                </p>

            </section>

        </main>

    );

}


export default Recuperar;
