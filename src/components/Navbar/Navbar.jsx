import
    {
        ShoppingCart,
        User,
        BookOpen,
        LogOut,
        UserCircle,
        Package,
        Shield,
        BookMarked,
        Sun,
        Moon
    } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";

import "./Navbar.css";

function Navbar()
{
    const { cart } = useContext( CartContext );
    const { usuario, logout } = useContext( AuthContext );
    const { tema, toggleTema } = useContext( ThemeContext );

    const navigate = useNavigate();

    const [ menuOpen, setMenuOpen ] = useState( false );
    const [ userMenuOpen, setUserMenuOpen ] = useState( false );

    const cartCount = cart.length;

    const nombreCorto = usuario?.nombre
        ?.trim()
        .split( /\s+/ )[ 0 ] || "Usuario";

    const cerrarMenu = () =>
    {
        setMenuOpen( false );
        setUserMenuOpen( false );
    };

    const cerrarSesion = () =>
    {
        logout();
        cerrarMenu();
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

                <nav className={ menuOpen ? "menu active" : "menu" }>

                    <Link to="/" onClick={ cerrarMenu }>
                        Inicio
                    </Link>

                    <Link to="/catalogo" onClick={ cerrarMenu }>
                        Catálogo
                    </Link>

                    <Link to="/contacto" onClick={ cerrarMenu }>
                        Contacto
                    </Link>

                    <span className="menu-separator"></span>

                    <Link
                        to="/proyecto"
                        className="project-link"
                        onClick={ cerrarMenu }
                    >
                        Proyecto ADSO INFO
                    </Link>

                    { usuario && (

                        <div className="mobile-user-options">

                            <div className="dropdown-divider"></div>

                            <div className="mobile-user-header">

                                { usuario.rol === "administrador"
                                    ? <Shield size={ 22 } />
                                    : <UserCircle size={ 22 } />
                                }

                                <strong>
                                    { usuario.nombre }
                                </strong>

                            </div>

                            { usuario.rol === "administrador" ? (

                                <Link to="/admin" onClick={ cerrarMenu }>
                                    <Shield size={ 18 } />
                                    Panel administrativo
                                </Link>

                            ) : (

                                <>
                                    <Link to="/perfil" onClick={ cerrarMenu }>
                                        <UserCircle size={ 18 } />
                                        Mi perfil
                                    </Link>

                                    <Link to="/pedidos" onClick={ cerrarMenu }>
                                        <Package size={ 18 } />
                                        Mis pedidos
                                    </Link>

                                    <Link to="/mis-libros" onClick={ cerrarMenu }>
                                        <BookMarked size={ 18 } />
                                        Mis libros
                                    </Link>
                                </>

                            ) }

                            <button
                                className="logout-button"
                                onClick={ cerrarSesion }
                            >
                                <LogOut size={ 18 } />
                                Cerrar sesión
                            </button>

                        </div>

                    ) }

                </nav>

                <button
                    className="menu-toggle"
                    onClick={ () => setMenuOpen( !menuOpen ) }
                    aria-label="Abrir menú"
                >
                    ☰
                </button>

                <div className="actions">

                    {/* Botón para cambiar entre tema claro y oscuro. */}
                    <button
                        className="theme-toggle"
                        onClick={ toggleTema }
                        aria-label={
                            tema === "oscuro"
                                ? "Cambiar a tema claro"
                                : "Cambiar a tema oscuro"
                        }
                        title={
                            tema === "oscuro"
                                ? "Tema claro"
                                : "Tema oscuro"
                        }
                    >
                        { tema === "oscuro"
                            ? <Sun size={ 20 } />
                            : <Moon size={ 20 } />
                        }
                    </button>

                    { usuario ? (

                        <div className="user-menu">

                            <button
                                className="user-button"
                                onClick={ () =>
                                    setUserMenuOpen( !userMenuOpen )
                                }
                            >
                                <User size={ 21 } />

                                <span>
                                    Hola, { nombreCorto }
                                </span>
                            </button>

                            { userMenuOpen && (

                                <div className="user-dropdown">

                                    <div className="user-dropdown-header">

                                        { usuario.rol === "administrador"
                                            ? <Shield size={ 22 } />
                                            : <UserCircle size={ 22 } />
                                        }

                                        <strong>
                                            { usuario.nombre }
                                        </strong>

                                    </div>

                                    <div className="dropdown-divider"></div>

                                    { usuario.rol === "administrador" ? (

                                        <Link
                                            to="/admin"
                                            onClick={ cerrarMenu }
                                        >
                                            <Shield size={ 18 } />
                                            Panel administrativo
                                        </Link>

                                    ) : (

                                        <>
                                            <Link
                                                to="/perfil"
                                                onClick={ cerrarMenu }
                                            >
                                                <UserCircle size={ 18 } />
                                                Mi perfil
                                            </Link>

                                            <Link
                                                to="/pedidos"
                                                onClick={ cerrarMenu }
                                            >
                                                <Package size={ 18 } />
                                                Mis pedidos
                                            </Link>

                                            <Link
                                                to="/mis-libros"
                                                onClick={ cerrarMenu }
                                            >
                                                <BookMarked size={ 18 } />
                                                Mis libros
                                            </Link>
                                        </>

                                    ) }

                                    <div className="dropdown-divider"></div>

                                    <button
                                        className="logout-button"
                                        onClick={ cerrarSesion }
                                    >
                                        <LogOut size={ 18 } />
                                        Cerrar sesión
                                    </button>

                                </div>

                            ) }

                        </div>

                    ) : (

                        <Link to="/login">

                            <button className="icon-button">
                                <User size={ 22 } />
                            </button>

                        </Link>

                    ) }

                    <Link to="/carrito">

                        <button className="icon-button cart-icon">

                            <ShoppingCart size={ 22 } />

                            { cartCount > 0 && (
                                <span className="cart-count">
                                    { cartCount }
                                </span>
                            ) }

                        </button>

                    </Link>

                </div>

            </div>

        </header>

    );
}

export default Navbar;