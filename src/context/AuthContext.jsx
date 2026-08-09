import { createContext, useState } from "react";

// Contexto global de autenticación.
const AuthContext = createContext();


function AuthProvider( { children } )
{

    // Recupera la sesión guardada al cargar la aplicación.
    const [ usuario, setUsuario ] = useState( () =>
    {

        const usuarioGuardado =

            localStorage.getItem( "usuarioActivo" );


        return usuarioGuardado

            ? JSON.parse( usuarioGuardado )

            : null;

    } );



    // Crea automáticamente la cuenta de administrador.
    const crearAdministrador = () =>
    {

        const usuarios = JSON.parse(

            localStorage.getItem( "usuarios" )

        ) || [];


        const existeAdmin = usuarios.some(

            ( usuario ) =>

                usuario.rol === "admin"

        );


        if ( !existeAdmin )
        {

            const administrador = {

                nombre: "Administrador",

                correo: "admin@gmail.com",

                password: "admin",

                rol: "admin"

            };


            usuarios.push( administrador );


            localStorage.setItem(

                "usuarios",

                JSON.stringify( usuarios )

            );

        }

    };


    // Crea la cuenta admin al iniciar el contexto.
    crearAdministrador();



    // Inicia sesión con un usuario.
    const login = ( usuario ) =>
    {

        const usuarioSesion = {

            ...usuario,

            // Si no tiene rol, será usuario normal.
            rol: usuario.rol || "usuario"

        };


        localStorage.setItem(

            "usuarioActivo",

            JSON.stringify( usuarioSesion )

        );


        setUsuario( usuarioSesion );

    };



    // Actualiza los datos del usuario actualmente conectado.
    const updateUser = ( datosActualizados ) =>
    {

        const usuarioActualizado = {

            ...usuario,

            ...datosActualizados

        };


        localStorage.setItem(

            "usuarioActivo",

            JSON.stringify( usuarioActualizado )

        );


        setUsuario( usuarioActualizado );

    };



    // Cierra la sesión.
    const logout = () =>
    {

        localStorage.removeItem( "usuarioActivo" );


        setUsuario( null );

    };



    return (

        <AuthContext.Provider

            value={

                {

                    usuario,

                    login,

                    updateUser,

                    logout

                }

            }

        >

            { children }

        </AuthContext.Provider>

    );

}


export { AuthProvider };

export default AuthContext;