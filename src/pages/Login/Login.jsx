import "./Login.css";

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
    Mail,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";

import AuthContext from "../../context/AuthContext";
import AlertContext from "../../context/AlertContext.jsx";
import { API_URL } from "../../config/api";


// Página de inicio de sesión.
function Login()
{
    const navigate = useNavigate();

    const { usuario, login } = useContext( AuthContext );
    const { mostrarMensaje } = useContext( AlertContext );

    const [ correo, setCorreo ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ mostrarPassword, setMostrarPassword ] = useState( false );

    // Si ya existe una sesión, no permite entrar al login.
    useEffect( () =>
    {
        if ( usuario )
        {
            navigate( "/", { replace: true } );
        }
    }, [ usuario, navigate ] );

    // Inicia sesión mediante la base de datos.
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();

        if ( !correo || !password )
        {
            mostrarMensaje(
                "Completa todos los campos.",
                "warning"
            );

            return;
        }

        try
        {
            const response = await fetch(
                `${API_URL}/usuarios/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            correo,
                            password
                        }
                    )
                }
            );

            if ( !response.ok )
            {
                const mensaje = await response.text();

                mostrarMensaje(
                    mensaje,
                    "error"
                );

                return;
            }

            const respuesta = await response.json();

            login(
                respuesta.token,
                respuesta.usuario
            );

            mostrarMensaje(
                `Bienvenido ${ respuesta.usuario.nombre }.`,
                "success"
            );

            if ( respuesta.usuario.rol === "administrador" )
            {
                navigate( "/admin" );
            }
            else
            {
                navigate( "/" );
            }
        }
        catch ( error )
        {
            console.error( error );

            mostrarMensaje(
                "No se pudo conectar con el servidor.",
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
                    Login
                </h2>

                <form
                    className="login-form"
                    onSubmit={ handleSubmit }
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

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Iniciar sesión
                    </button>

                </form>

                <p className="login-recuperar">

                    <Link to="/recuperar">
                        ¿Olvidaste tu contraseña?
                    </Link>

                </p>

                <p className="login-footer">

                    ¿No tienes cuenta?{" "}

                    <Link to="/registro">
                        Crear cuenta
                    </Link>

                </p>

            </section>

        </main>
    );
}

export default Login;