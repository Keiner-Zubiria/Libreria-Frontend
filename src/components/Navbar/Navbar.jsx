import
    {
        ShoppingCart,
        User,
        BookOpen,
        LogOut,
        UserCircle,
        Package,
        Shield
    } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";

import "./Navbar.css";

function Navbar()
{

    const { cart } = useContext( CartContext );

    const { usuario, logout } = useContext( AuthContext );

    const navigate = useNavigate();

    const [ menuOpen, setMenuOpen ] = useState( false );

    const userMenuRef = useRef( null );

    const cartCount = cart.length;

    useEffect( () =>
    {

        const handleClickOutside = ( event ) =>
        {

            if (
                userMenuRef.current &&
                !userMenuRef.current.contains( event.target )
            )
            {

                setMenuOpen( false );

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
        {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, [] );

    const cerrarSesion = () =>
    {

        logout();

        setMenuOpen( false );

        navigate( "/" );

    };

    return (

        <header className="navbar">

            <div className="navbar-container">

                <div className="logo">

                    <BookOpen size={ 30 } />

                    <h2>

                        Letras Mágicas

                    </h2>

                </div>

                <nav className="menu">
                    <Link to="/">
                        Inicio
                    </Link>
                    <Link to="/catalogo">
                        Catálogo
                    </Link>
                    <Link to="/contacto">
                        Contacto
                    </Link>
                    <span className="menu-separator"></span>
                    <Link
                        to="/proyecto"
                        className="project-link"
                    >
                        Proyecto ADSO INFO
                    </Link>
                </nav>

                <div className="actions">

                    {

                        usuario ? (

                            <div
                                className="user-menu"
                                ref={ userMenuRef }
                            >

                                <button
                                    className="user-button"
                                    onClick={ () =>
                                        setMenuOpen( !menuOpen )
                                    }
                                >

                                    <User size={ 21 } />

                                    <span>

                                        Hola, { usuario.nombre }

                                    </span>

                                </button>

                                {

                                    menuOpen && (

                                        <div className="user-dropdown">

                                            <div className="user-dropdown-header">

                                                {

                                                    usuario.rol === "admin"

                                                        ? <Shield size={ 22 } />

                                                        : <UserCircle size={ 22 } />

                                                }

                                                <div>

                                                    <strong>

                                                        { usuario.nombre }

                                                    </strong>

                                                </div>

                                            </div>

                                            <div className="dropdown-divider"></div>

                                            {

                                                usuario.rol === "admin"

                                                    ? (

                                                        <Link
                                                            to="/admin"
                                                            onClick={ () =>
                                                                setMenuOpen( false )
                                                            }
                                                        >

                                                            <Shield size={ 18 } />

                                                            Panel administrativo

                                                        </Link>

                                                    )

                                                    : (

                                                        <>

                                                            <Link
                                                                to="/perfil"
                                                                onClick={ () =>
                                                                    setMenuOpen( false )
                                                                }
                                                            >

                                                                <UserCircle size={ 18 } />

                                                                Mi perfil

                                                            </Link>

                                                            <Link
                                                                to="/pedidos"
                                                                onClick={ () =>
                                                                    setMenuOpen( false )
                                                                }
                                                            >

                                                                <Package size={ 18 } />

                                                                Mis pedidos

                                                            </Link>

                                                        </>

                                                    )

                                            }

                                            <div className="dropdown-divider"></div>

                                            <button
                                                className="logout-button"
                                                onClick={ cerrarSesion }
                                            >

                                                <LogOut size={ 18 } />

                                                Cerrar sesión

                                            </button>

                                        </div>

                                    )

                                }

                            </div>

                        )

                            :

                            (

                                <Link to="/login">

                                    <button className="icon-button">

                                        <User size={ 22 } />

                                    </button>

                                </Link>

                            )

                    }

                    <Link to="/carrito">

                        <button className="icon-button cart-icon">

                            <ShoppingCart size={ 22 } />

                            {

                                cartCount > 0 && (

                                    <span className="cart-count">

                                        { cartCount }

                                    </span>

                                )

                            }

                        </button>

                    </Link>

                </div>

            </div>

        </header>

    );

}

export default Navbar;