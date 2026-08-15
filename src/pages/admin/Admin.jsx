import "./Admin.css";

import { Outlet, NavLink } from "react-router-dom";

import
{
    BookOpen,
    Package,
    Users,
    LayoutDashboard,
    Tag
} from "lucide-react";


// Página principal del panel administrativo.
function Admin()
{

    return (

        <main className="admin-page">

            <section className="admin-layout">


                {/* Menú lateral */}
                <aside className="admin-sidebar">


                    <div className="admin-brand">

                        <BookOpen size={28} />

                        <h2>
                            Letras Mágicas
                        </h2>

                    </div>



                    <nav className="admin-menu">


                        <NavLink
                            to="/admin"
                            end
                        >

                            <LayoutDashboard size={20} />

                            Modulos

                        </NavLink>

 
                        <NavLink
                            to="/admin/categorias"
                        >

                            <Tag size={20} />

                            Categorias

                        </NavLink>



                        <NavLink
                            to="/admin/libros"
                        >

                            <BookOpen size={20} />

                            Libros

                        </NavLink>



                        <NavLink
                            to="/admin/pedidos"
                        >

                            <Package size={20} />

                            Pedidos

                        </NavLink>



                        <NavLink
                            to="/admin/usuarios"
                        >

                            <Users size={20} />

                            Usuarios

                        </NavLink>



                    </nav>


                </aside>



                {/* Contenido dinámico */}
                <section className="admin-content">


                    <Outlet />


                </section>


            </section>


        </main>

    );

}


export default Admin;