import "./Footer.css";

import {
    Mail,
    Phone,
    MapPin
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer()
{
    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">

                    <h3>
                        Letras Mágicas
                    </h3>

                    <p>
                        Una librería creada para conectar
                        lectores con grandes historias.
                    </p>

                </div>

                <div className="footer-section">

                    <h4>
                        Enlaces
                    </h4>

                    <Link to="/">
                        Inicio
                    </Link>

                    <Link to="/catalogo">
                        Catálogo
                    </Link>

                    <Link to="/contacto">
                        Contacto
                    </Link>

                </div>

                <div className="footer-section">

                    <h4>
                        Contacto
                    </h4>

                    <p>
                        <Mail size={ 18 } />
                        contacto@letrasmagicas.com
                    </p>

                    <p>
                        <Phone size={ 18 } />
                        +57 300 000 0000
                    </p>

                    <p>
                        <MapPin size={ 18 } />
                        Sincelejo, Sucre, Colombia
                    </p>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © 2026 Letras Mágicas. Todos los derechos reservados.
                </p>

            </div>

        </footer>
    );
}

export default Footer;