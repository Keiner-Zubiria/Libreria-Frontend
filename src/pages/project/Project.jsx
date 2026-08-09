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
                        El proyecto busca ofrecer una plataforma para
                        consultar y adquirir libros físicos y digitales,
                        incorporando funcionalidades de usuarios, compras
                        y administración.
                    </p>
                </div>

                <div className="project-section">
                    <h2>Objetivo</h2>
                    <p>
                        Desarrollar una plataforma web para una librería que
                        permita consultar libros, conocer sus características,
                        agregarlos al carrito y realizar el proceso de compra
                        de manera sencilla.
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
                            <span>Actualización del stock</span>
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
                            <span>Gestión administrativa de pedidos</span>
                            <strong className="status-building">
                                En construcción
                            </strong>
                        </li>

                        <li>
                            <span>Gestión administrativa de usuarios</span>
                            <strong className="status-building">
                                En construcción
                            </strong>
                        </li>

                        <li>
                            <span>Gestión administrativa de ventas</span>
                            <strong className="status-building">
                                En construcción
                            </strong>
                        </li>
                    </ul>
                </div>

                <div className="project-section">
                    <h2>Seguridad y control de acceso</h2>

                    <p>
                        La aplicación cuenta con protección de rutas para
                        controlar el acceso a las diferentes funciones según
                        el tipo de usuario.
                    </p>

                    <ul className="security-list">
                        <li>Protección de rutas que requieren autenticación.</li>
                        <li>Control de acceso al panel administrativo.</li>
                        <li>Validación del rol de administrador.</li>
                        <li>Restricción de acceso a usuarios no autorizados.</li>
                        <li>Control de acceso para usuarios autenticados.</li>
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
                                realizar compras y consultar sus pedidos.
                            </p>
                        </article>

                        <article className="project-card">
                            <h3>Administrador</h3>

                            <p>
                                Cuenta con acceso al panel administrativo y
                                actualmente puede gestionar los libros
                                mediante las operaciones de creación,
                                consulta, actualización y eliminación.
                            </p>

                            <span className="project-card-status">
                                Otras funciones administrativas en construcción
                            </span>
                        </article>
                    </div>
                </div>

                <div className="project-section">
                    <h2>Tecnologías utilizadas</h2>

                    <div className="technology-list">
                        <span>React</span>
                        <span>React Router</span>
                        <span>JavaScript</span>
                        <span>CSS</span>
                        <span>LocalStorage</span>
                        <span>Lucide React</span>
                    </div>
                </div>

                <div className="project-section">
                    <h2>Estado actual</h2>

                    <p>
                        Actualmente el proyecto funciona de manera local,
                        utilizando <strong>LocalStorage</strong> para manejar
                        la información y poder probar las diferentes
                        funcionalidades.
                    </p>

                    <p>
                        En una siguiente etapa se integrará el backend y la
                        base de datos, reemplazando progresivamente el
                        almacenamiento local por una solución centralizada.
                    </p>
                </div>

                <div className="project-section project-final">
                    <h2>Estado del proyecto</h2>

                    <p>
                        Letras Mágicas cuenta actualmente con las principales
                        funcionalidades de navegación, catálogo, usuarios,
                        carrito, compras y administración de libros.
                    </p>

                    <p>
                        Las demás herramientas administrativas se encuentran
                        <strong> en construcción </strong>
                        y serán incorporadas progresivamente al proyecto.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Project;