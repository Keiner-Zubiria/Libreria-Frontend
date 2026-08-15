import "./Register.css";

import {
    useState,
    useContext,
    useEffect
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";

import AuthContext from "../../context/AuthContext";
import AlertContext from "../../context/AlertContext";
import { API_URL } from "../../config/api";


// Página de registro de usuarios.
function Register()
{
    const navigate = useNavigate();

    const { usuario } = useContext( AuthContext );
    const { mostrarMensaje } = useContext( AlertContext );

    const [ nombre, setNombre ] = useState( "" );
    const [ correo, setCorreo ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );

    const [ mostrarPassword, setMostrarPassword ] = useState( false );
    const [ mostrarConfirmacion, setMostrarConfirmacion ] =
        useState( false );

    const passwordSegura =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    useEffect( () =>
    {
        if ( usuario )
        {
            navigate( "/", { replace: true } );
        }
    }, [ usuario, navigate ] );

    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();

        if (
            !nombre.trim() ||
            !correo.trim() ||
            !password ||
            !confirmPassword
        )
        {
            mostrarMensaje(
                "Completa todos los campos.",
                "warning"
            );

            return;
        }

        if ( password !== confirmPassword )
        {
            mostrarMensaje(
                "Las contraseñas no coinciden.",
                "warning"
            );

            return;
        }

        if ( !passwordSegura.test( password ) )
        {
            mostrarMensaje(
                "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
                "warning"
            );

            return;
        }

        try
        {
            const nuevoUsuario = {
                nombre: nombre.trim(),
                correo: correo.trim(),
                password,
                rol: "usuario"
            };

            const response = await fetch(
                `${API_URL}/usuarios/registro`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( nuevoUsuario )
                }
            );

            const mensaje = await response.text();

            if ( !response.ok )
            {
                throw new Error( mensaje );
            }

            mostrarMensaje(
                mensaje,
                "success"
            );

            setTimeout( () =>
            {
                navigate( "/login" );
            }, 1500 );
        }
        catch ( error )
        {
            console.error( error );

            mostrarMensaje(
                error.message || "No se pudo crear la cuenta.",
                "error"
            );
        }
    };

    return (

        <main className="login-page">

            <section className="login-card">

                <h1>
                    Letras Mágicas
                </h1>

                <h2>
                    Crear cuenta
                </h2>

                <form
                    className="login-form"
                    onSubmit={ handleSubmit }
                >

                    <div className="input-group">

                        <User size={ 20 } />

                        <input
                            type="text"
                            placeholder="Nombre completo"
                            value={ nombre }
                            onChange={ ( e ) =>
                                setNombre( e.target.value )
                            }
                            required
                        />

                    </div>

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

                    <div className="input-group password-group">

                        <Lock size={ 20 } />

                        <input
                            type={
                                mostrarPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Contraseña"
                            value={ password }
                            minLength={ 8 }
                            onChange={ ( e ) =>
                                setPassword( e.target.value )
                            }
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={ () =>
                                setMostrarPassword( !mostrarPassword )
                            }
                            aria-label={
                                mostrarPassword
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }
                        >
                            {mostrarPassword
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
                            value={ confirmPassword }
                            minLength={ 8 }
                            onChange={ ( e ) =>
                                setConfirmPassword( e.target.value )
                            }
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={ () =>
                                setMostrarConfirmacion(
                                    !mostrarConfirmacion
                                )
                            }
                            aria-label={
                                mostrarConfirmacion
                                    ? "Ocultar confirmación"
                                    : "Mostrar confirmación"
                            }
                        >
                            {mostrarConfirmacion
                                ? <EyeOff size={ 20 } />
                                : <Eye size={ 20 } />
                            }
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Registrarse
                    </button>

                </form>

                <p className="login-footer">

                    ¿Ya tienes una cuenta?{" "}

                    <Link to="/login">
                        Iniciar sesión
                    </Link>

                </p>

            </section>

        </main>
    );
}

export default Register;