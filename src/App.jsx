import "./App.css";

import { useContext } from "react";

import
{
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import CartContext from "./context/CartContext";

import AuthContext from "./context/AuthContext";

import Navbar from "./components/Navbar/Navbar";

import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";

import Catalog from "./pages/Catalog/Catalog";

import Contact from "./pages/Contact/Contact";

import BookDetail from "./pages/BookDetail/BookDetail";

import Cart from "./pages/Cart/Cart";

import Login from "./pages/Login/Login";

import Register from "./pages/Register/Register";

import Profile from "./pages/Profile/Profile";

import Orders from "./pages/Orders/Orders";

import Checkout from "./pages/Checkout/Checkout";

import Admin from "./pages/admin/Admin";

import Dashboard from "./pages/admin/Dashboard";

import LibrosAdmin from "./pages/admin/LibrosAdmin";

import PedidosAdmin from "./pages/admin/PedidosAdmin";

import UsuariosAdmin from "./pages/admin/UsuariosAdmin";

import VentasAdmin from "./pages/admin/VentasAdmin";

import Project from "./pages/project/Project";





// Protege rutas que necesitan iniciar sesión.
function RutaProtegida( { children } )
{

    const { usuario } = useContext( AuthContext );


    if ( !usuario )
    {

        return (

            <Navigate

                to="/login"

                replace

            />

        );

    }


    return children;

}



// Protege únicamente las rutas administrativas.
function RutaAdmin( { children } )
{

    const { usuario } = useContext( AuthContext );


    if ( !usuario )
    {

        return (

            <Navigate

                to="/login"

                replace

            />

        );

    }


    if ( usuario.rol !== "admin" )
    {

        return (

            <Navigate

                to="/"

                replace

            />

        );

    }


    return children;

}



// Evita que un usuario logueado vuelva
// a entrar a login o registro.
function RutaPublicaAuth( { children } )
{

    const { usuario } = useContext( AuthContext );


    if ( usuario )
    {

        return (

            <Navigate

                to="/"

                replace

            />

        );

    }


    return children;

}



function App()
{

    const { showMessage } = useContext( CartContext );


    return (

        <BrowserRouter>

            <Navbar />


            {
                showMessage && (

                    <div className="cart-toast">

                        ✔ Libro agregado al carrito

                    </div>

                )
            }



            <Routes>


                {/* Página principal */ }

                <Route

                    path="/"

                    element={ <Home /> }

                />



                {/* Catálogo */ }

                <Route

                    path="/catalogo"

                    element={ <Catalog /> }

                />

                {/* Contacto */ }
                <Route
                    path="/contacto"
                    element={ <Contact /> }
                />

                {/* Proyecto formativo */ }
                <Route
                    path="/proyecto"
                    element={ <Project /> }
                />


                {/* Detalle del libro */ }

                <Route

                    path="/libro/:id"

                    element={ <BookDetail /> }

                />



                {/* Carrito */ }

                <Route

                    path="/carrito"

                    element={ <Cart /> }

                />



                {/* Login */ }

                <Route

                    path="/login"

                    element={

                        <RutaPublicaAuth>

                            <Login />

                        </RutaPublicaAuth>

                    }

                />



                {/* Registro */ }

                <Route

                    path="/registro"

                    element={

                        <RutaPublicaAuth>

                            <Register />

                        </RutaPublicaAuth>

                    }

                />



                {/* Perfil */ }

                <Route

                    path="/perfil"

                    element={

                        <RutaProtegida>

                            <Profile />

                        </RutaProtegida>

                    }

                />



                {/* Pedidos */ }

                <Route

                    path="/pedidos"

                    element={

                        <RutaProtegida>

                            <Orders />

                        </RutaProtegida>

                    }

                />



                {/* Checkout */ }

                <Route

                    path="/checkout"

                    element={

                        <RutaProtegida>

                            <Checkout />

                        </RutaProtegida>

                    }

                />



                {/* Panel administrativo */ }

                <Route

                    path="/admin"

                    element={

                        <RutaAdmin>

                            <Admin />

                        </RutaAdmin>

                    }

                >


                    <Route

                        index

                        element={ <Dashboard /> }

                    />


                    <Route

                        path="libros"

                        element={ <LibrosAdmin /> }

                    />


                    <Route

                        path="pedidos"

                        element={ <PedidosAdmin /> }

                    />


                    <Route

                        path="usuarios"

                        element={ <UsuariosAdmin /> }

                    />


                    <Route

                        path="ventas"

                        element={ <VentasAdmin /> }

                    />




                </Route>



            </Routes>


            <Footer />

        </BrowserRouter>

    );

}


export default App;