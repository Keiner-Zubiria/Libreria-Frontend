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
    Lock
} from "lucide-react";

import AuthContext from "../../context/AuthContext";


// Página de registro de usuarios.
function Register()
{

    const navigate = useNavigate();

    const { usuario } = useContext( AuthContext );


    const [ nombre, setNombre ] = useState( "" );

    const [ correo, setCorreo ] = useState( "" );

    const [ password, setPassword ] = useState( "" );

    const [ confirmPassword, setConfirmPassword ] = useState( "" );



    // Si ya existe una sesión, no permite entrar al registro.
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



        if (

            !nombre ||

            !correo ||

            !password ||

            !confirmPassword

        )
        {

            alert(

                "Completa todos los campos."

            );

            return;

        }



        if (

            password !== confirmPassword

        )
        {

            alert(

                "Las contraseñas no coinciden."

            );

            return;

        }



        const usuarios = JSON.parse(

            localStorage.getItem( "usuarios" )

        ) || [];



        const existe = usuarios.find(

            ( usuario ) =>

                usuario.correo === correo

        );



        if ( existe )
        {

            alert(

                "Ese correo ya está registrado."

            );

            return;

        }



        // Todas las cuentas creadas desde
        // el registro serán usuarios normales.
        const nuevoUsuario = {

            nombre,

            correo,

            password,

            rol: "usuario"

        };



        usuarios.push( nuevoUsuario );



        localStorage.setItem(

            "usuarios",

            JSON.stringify( usuarios )

        );



        alert(

            "Cuenta creada correctamente."

        );



        navigate( "/login" );

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

                                setNombre(

                                    e.target.value

                                )

                            }

                        />

                    </div>



                    <div className="input-group">

                        <Mail size={ 20 } />


                        <input

                            type="email"

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



                    <div className="input-group">

                        <Lock size={ 20 } />


                        <input

                            type="password"

                            placeholder="Confirmar contraseña"

                            value={ confirmPassword }

                            onChange={ ( e ) =>

                                setConfirmPassword(

                                    e.target.value

                                )

                            }

                        />

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