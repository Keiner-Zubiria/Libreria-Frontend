import "./Login.css";

import { useState, useContext, useEffect } from "react";

import
{
    Link,
    useNavigate
} from "react-router-dom";

import
{
    Mail,
    Lock
} from "lucide-react";

import AuthContext from "../../context/AuthContext";


// Página de inicio de sesión.
function Login()
{

    const navigate = useNavigate();

    const { usuario, login } = useContext( AuthContext );


    const [ correo, setCorreo ] = useState( "" );

    const [ password, setPassword ] = useState( "" );



    // Si ya existe una sesión, no permite entrar al login.
    useEffect( () =>
    {

        if ( usuario )
        {

            navigate( "/", { replace: true } );

        }

    }, [ usuario, navigate ] );



    const handleSubmit = ( e ) =>
    {

        e.preventDefault();


        if ( !correo || !password )
        {

            alert(

                "Completa todos los campos."

            );

            return;

        }



        // Cuenta de administrador de prueba.
        if (
            correo === "admin@gmail.com" &&
            password === "admin"
        )
        {
            const administrador = {

                nombre: "Administrador",

                correo: "admin@gmail.com",

                password: "admin",

                rol: "admin"

            };


            login( administrador );


            alert(

                "Bienvenido Administrador."

            );


            navigate( "/admin" );


            return;

        }



        // Recupera los usuarios registrados.
        const usuarios = JSON.parse(

            localStorage.getItem( "usuarios" )

        ) || [];



        // Busca el usuario por correo.
        const usuarioEncontrado = usuarios.find(

            ( u ) =>

                u.correo === correo

        );



        if ( !usuarioEncontrado )
        {

            alert(

                "No existe una cuenta con ese correo."

            );

            return;

        }



        if (

            usuarioEncontrado.password !== password

        )
        {

            alert(

                "Contraseña incorrecta."

            );

            return;

        }



        // Si una cuenta antigua no tiene rol,
        // se considera usuario normal.
        const usuarioSesion = {

            ...usuarioEncontrado,

            rol:

                usuarioEncontrado.rol ||

                "usuario"

        };



        // Inicia la sesión mediante AuthContext.
        login( usuarioSesion );



        alert(

            `Bienvenido ${ usuarioSesion.nombre }.`

        );



        navigate( "/" );

    };



    return (

        <main className="login-page">

            <section className="login-card">


                <h1>

                    Letras Mágicas

                </h1>


                <h2>

                    Inicia sesión con cuenta de prueba

                </h2>


                <h2> 
                    
                    admin@gmail.com

                </h2>


                <h2>
                    
                    admin
                    
                </h2>


                <form

                    className="login-form"

                    onSubmit={ handleSubmit }

                >


                    <div className="input-group">

                        <Mail size={ 20 } />


                        <input

                            type="text"

                            placeholder="Correo electrónico"

                            value={ correo }

                            onChange={ ( e ) =>

                                setCorreo(

                                    e.target.value

                                )

                            }

                        />

                    </div>



                    <div className="input-group">

                        <Lock size={ 20 } />


                        <input

                            type="password"

                            placeholder="Contraseña"

                            value={ password }

                            onChange={ ( e ) =>

                                setPassword(

                                    e.target.value

                                )

                            }

                        />

                    </div>



                    <button

                        type="submit"

                        className="login-button"

                    >

                        Iniciar sesión

                    </button>


                </form>



                <p className="login-footer">

                    ¿No tienes cuenta?{ " " }


                    <Link to="/registro">

                        Crear cuenta

                    </Link>

                </p>


            </section>

        </main>

    );

}


export default Login;