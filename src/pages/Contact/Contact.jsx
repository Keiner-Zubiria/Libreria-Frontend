import "./Contact.css";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send
} from "lucide-react";
import { useState } from "react";

function Contact()
{
    const [enviado, setEnviado] = useState(false);

    const enviarMensaje = (e) =>
    {
        e.preventDefault();
        setEnviado(true);
        e.target.reset();
    };

    return (
        <main className="contact-page">

            <section className="contact-header">
                <h1>Contáctanos</h1>
                <p>
                    ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
                </p>
            </section>

            <section className="contact-container">

                <div className="contact-info">

                    <h2>Información de contacto</h2>

                    <p className="contact-description">
                        Si necesitas información sobre nuestros libros,
                        pedidos o cualquier otro servicio de Letras Mágicas,
                        puedes comunicarte con nosotros.
                    </p>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <Phone size={21} />
                        </div>
                        <div>
                            <strong>Teléfono</strong>
                            <span>+57 300 000 0000</span>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <Mail size={21} />
                        </div>
                        <div>
                            <strong>Correo electrónico</strong>
                            <span>contacto@letrasmagicas.com</span>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <MapPin size={21} />
                        </div>
                        <div>
                            <strong>Ubicación</strong>
                            <span>Sincelejo, Sucre, Colombia</span>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <Clock size={21} />
                        </div>
                        <div>
                            <strong>Horario de atención</strong>
                            <span>Lunes a sábado, 8:00 a. m. – 6:00 p. m.</span>
                        </div>
                    </div>

                </div>

                <div className="contact-form-container">

                    <h2>Envíanos un mensaje</h2>

                    <form
                        className="contact-form"
                        onSubmit={enviarMensaje}
                    >

                        <div className="contact-field">
                            <label>Nombre completo</label>
                            <input
                                type="text"
                                placeholder="Escribe tu nombre"
                                required
                            />
                        </div>

                        <div className="contact-field">
                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>

                        <div className="contact-field">
                            <label>Asunto</label>
                            <input
                                type="text"
                                placeholder="¿En qué podemos ayudarte?"
                                required
                            />
                        </div>

                        <div className="contact-field">
                            <label>Mensaje</label>
                            <textarea
                                placeholder="Escribe tu mensaje..."
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="contact-button"
                        >
                            <Send size={18} />
                            Enviar mensaje
                        </button>

                        {enviado && (
                            <p className="contact-success">
                                ✓ ¡Mensaje enviado correctamente!
                            </p>
                        )}

                    </form>

                </div>

            </section>

        </main>
    );
}

export default Contact;