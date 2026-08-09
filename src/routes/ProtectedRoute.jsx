import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../context/AuthContext";


// Protege las rutas que requieren una sesión iniciada.
function ProtectedRoute()
{

    const { usuario } = useContext( AuthContext );


    // Si no hay usuario, envía al login.
    if ( !usuario )
    {

        return <Navigate to="/login" replace />;

    }


    // Si hay usuario, permite acceder a la ruta.
    return <Outlet />;

}


export default ProtectedRoute;