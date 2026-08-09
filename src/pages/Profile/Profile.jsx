import "./Profile.css";

import { useContext, useState } from "react";
import {
    UserCircle,
    Mail,
    Lock,
    LogOut,
    Pencil,
    Save,
    X
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";


// Página de perfil del usuario.
function Profile() {

    const {
        usuario,
        logout,
        updateUser
    } = useContext(AuthContext);

    const navigate = useNavigate();


    const [editando, setEditando] = useState(false);

    const [nombre, setNombre] = useState(
        usuario?.nombre || ""
    );

    const [correo, setCorreo] = useState(
        usuario?.correo || ""
    );

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");


    // Cerrar sesión.
    const cerrarSesion = () => {

        logout();

        navigate("/");

    };


    // Activar edición.
    const comenzarEdicion = () => {

        setNombre(usuario.nombre);

        setCorreo(usuario.correo);

        setPassword("");

        setConfirmPassword("");

        setEditando(true);

    };


    // Cancelar edición.
    const cancelarEdicion = () => {

        setNombre(usuario.nombre);

        setCorreo(usuario.correo);

        setPassword("");

        setConfirmPassword("");

        setEditando(false);

    };


    // Guardar cambios.
    const guardarCambios = () => {

        if (!nombre.trim() || !correo.trim()) {

            alert("El nombre y el correo son obligatorios.");

            return;

        }


        if (
            password &&
            password !== confirmPassword
        ) {

            alert("Las contraseñas no coinciden.");

            return;

        }


        const usuarios = JSON.parse(

            localStorage.getItem("usuarios")

        ) || [];


        const usuarioActualizado = {

            nombre: nombre.trim(),

            correo: correo.trim(),

            ...(password
                ? { password }
                : {}
            )

        };


        const usuariosActualizados = usuarios.map(

            (item) =>

                item.correo === usuario.correo

                    ? usuarioActualizado

                    : item

        );


        localStorage.setItem(

            "usuarios",

            JSON.stringify(usuariosActualizados)

        );


        localStorage.setItem(

            "usuarioActivo",

            JSON.stringify({

                nombre: usuarioActualizado.nombre,

                correo: usuarioActualizado.correo

            })

        );


        // Actualiza el usuario dentro del AuthContext.
        updateUser({

            nombre: usuarioActualizado.nombre,

            correo: usuarioActualizado.correo

        });


        setPassword("");

        setConfirmPassword("");

        setEditando(false);

        alert("Perfil actualizado correctamente.");

    };


    // Si no hay usuario iniciado.
    if (!usuario) {

        return (

            <main className="profile-page">

                <section className="profile-card">

                    <UserCircle size={60} />

                    <h1>
                        No has iniciado sesión
                    </h1>

                    <p>
                        Inicia sesión para acceder a tu perfil.
                    </p>

                    <button
                        className="profile-button"
                        onClick={() => navigate("/login")}
                    >

                        Iniciar sesión

                    </button>

                </section>

            </main>

        );

    }


    return (

        <main className="profile-page">

            <section className="profile-card">


                {/* Encabezado */}
                <div className="profile-header">

                    <UserCircle size={70} />

                    <div>

                        <h1>
                            Mi perfil
                        </h1>

                        <p>
                            Información de tu cuenta
                        </p>

                    </div>

                </div>



                {

                    !editando ? (

                        <>


                            {/* Información del usuario */}
                            <div className="profile-info">


                                {/* Nombre */}
                                <div className="profile-field">

                                    <UserCircle size={22} />

                                    <div>

                                        <span>
                                            Nombre
                                        </span>

                                        <strong>
                                            {usuario.nombre}
                                        </strong>

                                    </div>

                                </div>



                                {/* Correo */}
                                <div className="profile-field">

                                    <Mail size={22} />

                                    <div>

                                        <span>
                                            Correo electrónico
                                        </span>

                                        <strong>
                                            {usuario.correo}
                                        </strong>

                                    </div>

                                </div>



                                {/* Contraseña */}
                                <div className="profile-field">

                                    <Lock size={22} />

                                    <div>

                                        <span>
                                            Contraseña
                                        </span>

                                        <strong>
                                            ••••••••
                                        </strong>

                                    </div>

                                </div>


                            </div>



                            {/* Botones */}
                            <div className="profile-actions">

                                <button
                                    className="edit-profile-button"
                                    onClick={comenzarEdicion}
                                >

                                    <Pencil size={18} />

                                    Editar perfil

                                </button>


                                <button
                                    className="logout-profile-button"
                                    onClick={cerrarSesion}
                                >

                                    <LogOut size={18} />

                                    Cerrar sesión

                                </button>

                            </div>


                        </>

                    ) : (


                        /* Formulario de edición */
                        <div className="profile-edit">


                            <div className="profile-input">

                                <UserCircle size={20} />

                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) =>
                                        setNombre(e.target.value)
                                    }
                                    placeholder="Nombre completo"
                                />

                            </div>



                            <div className="profile-input">

                                <Mail size={20} />

                                <input
                                    type="email"
                                    value={correo}
                                    onChange={(e) =>
                                        setCorreo(e.target.value)
                                    }
                                    placeholder="Correo electrónico"
                                />

                            </div>



                            <div className="profile-input">

                                <Lock size={20} />

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Nueva contraseña"
                                />

                            </div>



                            <div className="profile-input">

                                <Lock size={20} />

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Confirmar nueva contraseña"
                                />

                            </div>



                            <div className="profile-actions">


                                <button
                                    className="save-profile-button"
                                    onClick={guardarCambios}
                                >

                                    <Save size={18} />

                                    Guardar cambios

                                </button>


                                <button
                                    className="cancel-profile-button"
                                    onClick={cancelarEdicion}
                                >

                                    <X size={18} />

                                    Cancelar

                                </button>


                            </div>


                        </div>

                    )

                }


            </section>

        </main>

    );

}


export default Profile;