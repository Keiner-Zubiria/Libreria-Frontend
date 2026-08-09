import "./Hero.css";

import
    {
        ArrowRight,
        BookOpen,
        Truck,
        ShieldCheck
    } from "lucide-react";

import { Link } from "react-router-dom";


// Componente principal de la sección inicial de la página.
// Presenta la propuesta principal de la librería y un llamado a la acción.
function Hero()
{
    return (
        <section className="hero">


            <div className="hero-content">


                <h1>
                    Descubre historias que{ " " }
                    <span>cobran vida</span>
                </h1>



                <p>

                    Explora nuestra colección de libros físicos y digitales.
                    Encuentra nuevas aventuras, conocimientos y experiencias
                    en un solo lugar.

                </p>




                <Link

                    to="/catalogo"

                    className="hero-button"

                >

                    Explorar catálogo

                    <ArrowRight size={ 20 } />

                </Link>



                <div className="hero-benefits">


                    <div className="benefit-item">

                        <BookOpen size={ 28 } />


                        <div>

                            <strong>
                                Miles de libros
                            </strong>


                            <span>
                                Físicos y digitales
                            </span>

                        </div>

                    </div>





                    <div className="benefit-item">

                        <Truck size={ 28 } />


                        <div>

                            <strong>
                                Envíos rápidos
                            </strong>


                            <span>
                                A todo el país
                            </span>

                        </div>

                    </div>





                    <div className="benefit-item">

                        <ShieldCheck size={ 28 } />


                        <div>

                            <strong>
                                Compra segura
                            </strong>


                            <span>
                                Pagos protegidos
                            </span>

                        </div>

                    </div>


                </div>


            </div>





            <div className="hero-image">


                <img

                    src="/images/hero-books.png"

                    alt="Libros físicos y digitales"

                />


            </div>


        </section>
    );
}


export default Hero;