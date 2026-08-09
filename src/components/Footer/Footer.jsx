import "./Footer.css";
import {
    Mail,
    Phone,
    MapPin
} from "lucide-react";

// Componente encargado de mostrar la información adicional y datos de contacto del sitio.
function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Información general de la librería */}
                <div className="footer-section">

                    <h3>
                        Letras Mágicas
                    </h3>

                    <p>
                        Una librería creada para conectar
                        lectores con grandes historias.
                    </p>

                </div>


                {/* Sección de navegación rápida del sitio */}
                <div className="footer-section">

                    <h4>
                        Enlaces
                    </h4>

                    <a href="http://localhost:5173/">
                        Inicio
                    </a>

                    <a href="http://localhost:5173/catalogo">
                        Catálogo
                    </a>

                    <a href="#">
                        Contacto
                    </a>

                </div>


                {/* Datos de contacto acompañados de iconos */}
                <div className="footer-section">

                    <h4>
                        Contacto
                    </h4>

                    <p>
                        <Mail size={18}/>
                        contacto@letrasmagicas.com
                    </p>

                    <p>
                        <Phone size={18}/>
                        +57 300 000 0000
                    </p>

                    <p>
                        <MapPin size={18}/>
                        Sincelejo, Sucre, Colombia
                    </p>

                </div>

            </div>


            {/* Información de derechos de autor */}
            <div className="footer-bottom">

                <p>
                    © 2026 Letras Mágicas. Todos los derechos reservados.
                </p>

            </div>

        </footer>
    );
}

export default Footer;