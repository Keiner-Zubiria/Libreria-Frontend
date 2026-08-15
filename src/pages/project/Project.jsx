import "./Project.css";

function Project()
{
    return (
        <main className="project-page">
            <section className="project-header">
                <h1>Proyecto Formativo</h1>
                <p>
                    Letras Mágicas - Librería virtual
                </p>
            </section>

            <section className="project-content">
                <div className="project-section">
                    <h2>Descripción del proyecto</h2>
                    <p>
                        Letras Mágicas es una aplicación web desarrollada
                        como proyecto formativo del programa Tecnólogo en
                        Análisis y Desarrollo de Software del SENA.
                    </p>
                    <p>
                        El proyecto ofrece una plataforma para consultar y
                        adquirir libros físicos y digitales, incorporando
                        funcionalidades de usuarios, compras, administración
                        y autenticación segura mediante tokens JWT.
                    </p>
                </div>

                <div className="project-section">
                    <h2>Objetivo</h2>
                    <p>
                        Desarrollar una plataforma web para una librería que
                        permita consultar libros, conocer sus características,
                        agregarlos al carrito y realizar el proceso de compra
                        de manera sencilla, con un panel administrativo para
                        la gestión de libros, categorías, pedidos y usuarios.
                    </p>
                </div>

                <div className="project-section">
                    <h2>Funcionalidades principales</h2>

                    <ul className="project-list">
                        <li>
                            <span>Registro e inicio de sesión</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Catálogo de libros</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Búsqueda y filtrado de libros</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Detalle de los libros</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Carrito de compras</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Proceso de compra</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Pago simulado con tarjeta, PSE y contraentrega</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Confirmación de compra</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Descarga de libros digitales comprados</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Recuperación de contraseña</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Consulta de pedidos del usuario</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Perfil de usuario</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Actualización del stock</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Modo oscuro</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Panel administrativo</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Gestión de libros mediante CRUD</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Gestión de categorías</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Gestión administrativa de pedidos</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>

                        <li>
                            <span>Gestión administrativa de usuarios</span>
                            <strong className="status-implemented">
                                Implementado
                            </strong>
                        </li>
                    </ul>
                </div>

                <div className="project-section">
                    <h2>Seguridad y control de acceso</h2>

                    <p>
                        La aplicación cuenta con autenticación segura
                        mediante tokens JWT y protección de rutas tanto en el
                        frontend como en los servicios del backend.
                    </p>

                    <ul className="security-list">
                        <li>Autenticación con tokens JWT.</li>
                        <li>Contraseñas cifradas con BCrypt.</li>
                        <li>Protección de rutas que requieren autenticación.</li>
                        <li>Protección de los servicios del backend con Spring Security.</li>
                        <li>Control de acceso al panel administrativo.</li>
                        <li>Validación del rol de administrador.</li>
                        <li>Restricción de acceso a usuarios no autorizados.</li>
                        <li>Validaciones de los datos enviados desde el frontend.</li>
                        <li>Recuperación de contraseña mediante código temporal.</li>
                        <li>Descarga de libros digitales solo para quienes los compraron.</li>
                    </ul>
                </div>

                <div className="project-section">
                    <h2>Tipos de usuario</h2>

                    <div className="project-cards">
                        <article className="project-card">
                            <h3>Cliente</h3>

                            <p>
                                Puede registrarse, iniciar sesión, consultar
                                el catálogo, agregar libros al carrito,
                                realizar compras, consultar sus pedidos y
                                administrar su perfil.
                            </p>
                        </article>

                        <article className="project-card">
                            <h3>Administrador</h3>

                            <p>
                                Cuenta con acceso al panel administrativo y
                                puede gestionar los libros, las categorías,
                                los pedidos y los usuarios de la plataforma.
                            </p>
                        </article>
                    </div>
                </div>

                <div className="project-section">
                    <h2>Tecnologías utilizadas</h2>

                    <div className="technology-group">
                        <h3>Frontend</h3>

                        <div className="technology-list">
                            <span>React</span>
                            <span>Vite</span>
                            <span>React Router</span>
                            <span>JavaScript</span>
                            <span>CSS</span>
                            <span>Axios</span>
                            <span>React Context</span>
                            <span>Lucide React</span>
                        </div>
                    </div>

                    <div className="technology-group">
                        <h3>Backend</h3>

                        <div className="technology-list">
                            <span>Java</span>
                            <span>Spring Boot</span>
                            <span>Spring Security</span>
                            <span>JWT</span>
                            <span>MySQL</span>
                            <span>Maven</span>
                        </div>
                    </div>
                </div>

                <div className="project-section">
                    <h2>Estado actual</h2>

                    <p>
                        El proyecto funciona como una aplicación completa:
                        el frontend está desarrollado con React y se conecta
                        con un backend construido con Spring Boot, el cual
                        administra la información en una base de datos MySQL.
                    </p>

                    <p>
                        La autenticación se maneja con tokens JWT y las
                        contraseñas se almacenan cifradas. El panel
                        administrativo permite gestionar los libros, las
                        categorías, los pedidos y los usuarios.
                    </p>
                </div>

                <div className="project-section project-final">
                    <h2>Estado del proyecto</h2>

                    <p>
                        Letras Mágicas cuenta con las principales
                        funcionalidades de navegación, catálogo, usuarios,
                        carrito, compras y el panel administrativo completo.
                    </p>

                    <p>
                        El proyecto se encuentra
                        <strong> operativo </strong>
                        y seguirá incorporando mejoras de manera progresiva.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Project;
