import "./App.css";

import { useContext } from "react";

import
{
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


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

import MisLibros from "./pages/MisLibros/MisLibros";

import Checkout from "./pages/Checkout/Checkout";

import Admin from "./pages/admin/Admin";

import Dashboard from "./pages/admin/Dashboard";

import LibrosAdmin from "./pages/admin/LibrosAdmin";

import PedidosAdmin from "./pages/admin/PedidosAdmin";

import UsuariosAdmin from "./pages/admin/UsuariosAdmin";

import CategoriasAdmin from "./pages/admin/CategoriasAdmin";

import Project from "./pages/project/Project";

import Confirmacion from "./pages/Confirmacion/Confirmacion";

import Recuperar from "./pages/Recuperar/Recuperar";

import Alert from "./components/Alert/Alert";





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


    if ( usuario.rol !== "administrador" )
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

    return (

        <BrowserRouter>

            <Navbar />

            <Alert />

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

                {/* Recuperar contraseña */ }
                <Route
                    path="/recuperar"
                    element={
                        <RutaPublicaAuth>
                            <Recuperar />
                        </RutaPublicaAuth>
                    }
                />

                {/* Confirmación de compra */ }
                <Route
                    path="/confirmacion/:id"
                    element={
                        <RutaProtegida>
                            <Confirmacion />
                        </RutaProtegida>
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

                {/* Mis libros */ }
                <Route
                    path="/mis-libros"
                    element={
                        <RutaProtegida>
                            <MisLibros />
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
                        path="categorias"
                        element={ <CategoriasAdmin /> }
                    />

                </Route>

            </Routes>

            <Footer />

        </BrowserRouter>

    );

}


export default App;