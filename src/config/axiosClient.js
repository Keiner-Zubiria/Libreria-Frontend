import axios from "axios";

import { API_URL } from "./api";


// Cliente de axios con la URL base del backend.
const cliente = axios.create( {
    baseURL: API_URL
} );


// Agrega el token de acceso a cada petición si existe sesión.
cliente.interceptors.request.use( ( config ) =>
{
    const token = localStorage.getItem( "tokenActivo" );

    if ( token )
    {
        config.headers.Authorization = `Bearer ${ token }`;
    }

    return config;
} );


// Si el token expira, cierra la sesión y vuelve al login.
cliente.interceptors.response.use(
    ( response ) => response,
    ( error ) =>
    {
        if ( error.response && error.response.status === 401 )
        {
            localStorage.removeItem( "usuarioActivo" );
            localStorage.removeItem( "tokenActivo" );

            if ( !window.location.pathname.startsWith( "/login" ) )
            {
                window.location.href = "/login";
            }
        }

        return Promise.reject( error );
    }
);


export default cliente;
