import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../context/AuthContext";


// Impide que un usuario autenticado vuelva a entrar
// a las páginas de login y registro.
function PublicOnlyRoute()
{

    const { usuario } = useContext( AuthContext );


    // Si ya inició sesión, lo enviamos al inicio.
    if ( usuario )
    {

        return <Navigate to="/" replace />;

    }


    // Si no ha iniciado sesión, permite acceder.
    return <Outlet />;

}


export default PublicOnlyRoute;