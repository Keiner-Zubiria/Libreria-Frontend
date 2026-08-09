import "./Dashboard.css";

import
{
    BookOpen,
    Package,
    Users,
    DollarSign
} from "lucide-react";

import { Link } from "react-router-dom";


// Página principal del panel administrativo.
function Dashboard()
{

    return (

        <div className="dashboard">


            {/* Encabezado del dashboard */}
            <div className="admin-header">

                <h1>
                    Panel administrativo
                </h1>

                <p>
                    Administra los diferentes módulos de la librería
                    desde este panel de control.
                </p>

            </div>



            {/* Accesos rápidos */}
            <div className="admin-cards">


                <Link
                    to="/admin/libros"
                    className="admin-card"
                >

                    <BookOpen size={32}/>

                    <div>

                        <h2>
                            Libros
                        </h2>

                        <span>
                            Gestionar catálogo
                        </span>

                        <p>
                            Agrega, edita, elimina libros y controla
                            precios y stock disponibles.
                        </p>

                    </div>

                </Link>





                <Link
                    to="/admin/pedidos"
                    className="admin-card"
                >

                    <Package size={32}/>

                    <div>

                        <h2>
                            Pedidos
                        </h2>

                        <span>
                            Revisar compras
                        </span>

                        <p>
                            Consulta pedidos realizados y administra
                            el estado de cada compra.
                        </p>

                    </div>

                </Link>





                <Link
                    to="/admin/usuarios"
                    className="admin-card"
                >

                    <Users size={32}/>

                    <div>

                        <h2>
                            Usuarios
                        </h2>

                        <span>
                            Administrar clientes
                        </span>

                        <p>
                            Consulta la información de usuarios
                            registrados en la plataforma.
                        </p>

                    </div>

                </Link>





                <Link
                    to="/admin/ventas"
                    className="admin-card"
                >

                    <DollarSign size={32}/>

                    <div>

                        <h2>
                            Ventas
                        </h2>

                        <span>
                            Ver ingresos
                        </span>

                        <p>
                            Revisa información sobre ventas
                            y movimientos de la librería.
                        </p>

                    </div>

                </Link>


            </div>


        </div>

    );

}


export default Dashboard;