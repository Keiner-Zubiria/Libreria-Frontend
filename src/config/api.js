export const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8081";

export const UPLOADS_URL =
    `${API_URL}/uploads`;

export function imagenUrl( imagen )
{
    if ( !imagen ) return null;
    if ( imagen.startsWith( "http" ) ) return imagen;
    return `${ UPLOADS_URL }/${ imagen }`;
}


// fetch con el token de acceso agregado automáticamente.
export const authFetch = async ( url, opciones = {} ) =>
{
    const token = localStorage.getItem( "tokenActivo" );

    const respuesta = await fetch(
        url,
        {
            ...opciones,
            headers: {
                ...( opciones.headers || {} ),
                ...( token
                    ? { Authorization: `Bearer ${ token }` }
                    : {} )
            }
        }
    );

    // Si el token expira, cierra la sesión y vuelve al login.
    if ( respuesta.status === 401 )
    {
        localStorage.removeItem( "usuarioActivo" );
        localStorage.removeItem( "tokenActivo" );

        if ( !window.location.pathname.startsWith( "/login" ) )
        {
            window.location.href = "/login";
        }
    }

    return respuesta;
};