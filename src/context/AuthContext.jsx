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


    // Guarda el token de acceso recibido del backend.
    const [ token, setToken ] = useState( () =>

        localStorage.getItem( "tokenActivo" ) || null

    );



    // Inicia sesión con el token y el usuario recibidos del backend.
    const login = ( token, usuario ) =>
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

        localStorage.setItem(

            "tokenActivo",

            token

        );


        setUsuario( usuarioSesion );

        setToken( token );

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

        localStorage.removeItem( "tokenActivo" );


        setUsuario( null );

        setToken( null );

    };



    return (

        <AuthContext.Provider

            value={

                {

                    usuario,

                    token,

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