import "./Checkout.css";

import { useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import
{
    MapPin,
    Phone,
    CreditCard,
    Package,
    Monitor,
    ShoppingBag
} from "lucide-react";

import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";


// Página para finalizar una compra.
function Checkout()
{

    const navigate = useNavigate();

    const location = useLocation();

    const { cart, clearCart } = useContext( CartContext );

    const { usuario } = useContext( AuthContext );


    // Datos que llegan desde "Comprar ahora".
    const compraDirecta = location.state?.producto;


    // Productos que se comprarán.
    const productos = useMemo( () =>
    {

        if ( compraDirecta )
        {

            return [

                {

                    ...compraDirecta,

                    quantity: compraDirecta.quantity || 1

                }

            ];

        }

        return cart;

    }, [ compraDirecta, cart ] );


    // Verifica si existe algún producto virtual.
    const contieneVirtual = productos.some(

        ( item ) => item.formato === "Virtual"

    );


    // Verifica si existe algún producto físico.
    const contieneFisico = productos.some(

        ( item ) => item.formato !== "Virtual"

    );


    // Contraentrega solo está disponible cuando todos
    // los productos son físicos.
    const contraentregaDisponible =

        contieneFisico && !contieneVirtual;


    // Datos del cliente.
    const [ telefono, setTelefono ] = useState( "" );

    const [ direccion, setDireccion ] = useState( "" );

    const [ ciudad, setCiudad ] = useState( "" );

    const [ metodoPago, setMetodoPago ] = useState( "" );


    // Calcula el total.
    const total = productos.reduce(

        ( acc, item ) =>

            acc + item.precio * item.quantity,

        0

    );


    // Confirma el pedido.
    const confirmarPedido = ( e ) =>
    {

        e.preventDefault();


        // Verifica que exista una sesión.
        if ( !usuario )
        {

            alert(

                "Debes iniciar sesión para realizar la compra."

            );

            navigate( "/login" );

            return;

        }


        // Verifica que existan productos.
        if ( productos.length === 0 )
        {

            alert(

                "No hay productos para realizar la compra."

            );

            navigate( "/catalogo" );

            return;

        }


        // Verifica que el método de pago sea válido.
        if (

            metodoPago === "Contraentrega" &&

            !contraentregaDisponible

        )
        {

            alert(

                "El pago contraentrega no está disponible para este pedido."

            );

            return;

        }


        // Si hay productos físicos, los datos de entrega son obligatorios.
        if ( contieneFisico )
        {

            if (

                !telefono ||

                !direccion ||

                !ciudad

            )
            {

                alert(

                    "Completa todos los datos de entrega."

                );

                return;

            }

        }


        // El método de pago siempre es obligatorio.
        if ( !metodoPago )
        {

            alert(

                "Selecciona un método de pago."

            );

            return;

        }


        // Recupera los pedidos existentes.
        const pedidos = JSON.parse(

            localStorage.getItem( "pedidos" )

        ) || [];


        // Genera el siguiente número de pedido.
        const nuevoId = pedidos.length + 1;


        // Crea el pedido.
        const nuevoPedido = {

            id: String( nuevoId ).padStart( 4, "0" ),

            fecha: new Date().toLocaleDateString(

                "es-CO",

                {

                    day: "2-digit",

                    month: "2-digit",

                    year: "numeric"

                }

            ),

            estado: "Pendiente",

            usuario: {

                ...usuario,

                telefono,

                direccion,

                ciudad

            },

            productos: productos.map( ( item ) => ( {

                id: item.id,

                titulo: item.titulo,

                precio: item.precio,

                quantity: item.quantity,

                formato: item.formato || "Fisico",

                imagen: item.imagen

            } ) ),

            total,

            metodoPago

        };


        // Recupera los libros guardados.
        const librosGuardados = JSON.parse(

            localStorage.getItem( "libros" )

        ) || [];


        // Actualiza stock y cantidad de vendidos.
        const librosActualizados = librosGuardados.map( ( libro ) =>
        {

            const productoComprado = productos.find(

                ( item ) =>

                    item.id === libro.id &&

                    item.formato === "Fisico"

            );


            // Si el libro físico fue comprado,
            // reduce el stock y aumenta los vendidos.
            if ( productoComprado )
            {

                return {

                    ...libro,

                    stock: Math.max(

                        0,

                        ( libro.stock || 0 ) -

                        productoComprado.quantity

                    ),

                    vendidos:

                        ( libro.vendidos || 0 ) +

                        productoComprado.quantity

                };

            }


            // Si es virtual o no fue comprado,
            // se conserva sin modificar.
            return libro;

        } );


        // Guarda los libros actualizados.
        localStorage.setItem(

            "libros",

            JSON.stringify( librosActualizados )

        );


        // Guarda el pedido.
        const nuevosPedidos = [

            ...pedidos,

            nuevoPedido

        ];


        localStorage.setItem(

            "pedidos",

            JSON.stringify( nuevosPedidos )

        );


        // Si la compra proviene del carrito,
        // se vacía después de confirmar.
        if ( !compraDirecta )
        {

            clearCart();

        }


        // Redirige a Mis pedidos.
        navigate( "/pedidos" );

    };


    return (

        <main className="checkout-page">

            <section className="checkout-container">

                <div className="checkout-header">

                    <Package size={ 32 } />

                    <div>

                        <h1>

                            Finalizar compra

                        </h1>

                        <p>

                            Completa los datos para realizar tu pedido.

                        </p>

                    </div>

                </div>


                <form

                    className="checkout-content"

                    onSubmit={ confirmarPedido }

                >

                    {

                        contieneFisico && (

                            <div className="checkout-left">

                                {/* Datos de entrega */ }

                                <section className="checkout-section">

                                    <h2>

                                        Datos de entrega

                                    </h2>


                                    <div className="checkout-field">

                                        <label>

                                            Nombre

                                        </label>

                                        <input

                                            type="text"

                                            value={ usuario?.nombre || "" }

                                            disabled

                                        />

                                    </div>


                                    <div className="checkout-field">

                                        <label>

                                            Correo electrónico

                                        </label>

                                        <input

                                            type="email"

                                            value={ usuario?.correo || "" }

                                            disabled

                                        />

                                    </div>


                                    <div className="checkout-field">

                                        <label>

                                            <Phone size={ 17 } />

                                            Teléfono

                                        </label>

                                        <input

                                            type="tel"

                                            placeholder="Ej: 300 123 4567"

                                            value={ telefono }

                                            onChange={ ( e ) =>

                                                setTelefono( e.target.value )

                                            }

                                        />

                                    </div>


                                    <div className="checkout-field">

                                        <label>

                                            <MapPin size={ 17 } />

                                            Dirección

                                        </label>

                                        <input

                                            type="text"

                                            placeholder="Dirección de entrega"

                                            value={ direccion }

                                            onChange={ ( e ) =>

                                                setDireccion( e.target.value )

                                            }

                                        />

                                    </div>


                                    <div className="checkout-field">

                                        <label>

                                            Ciudad

                                        </label>

                                        <input

                                            type="text"

                                            placeholder="Ciudad"

                                            value={ ciudad }

                                            onChange={ ( e ) =>

                                                setCiudad( e.target.value )

                                            }

                                        />

                                    </div>

                                </section>

                            </div>

                        )

                    }


                    {/* Resumen */ }

                    <section className="checkout-summary">

                        <h2>

                            Resumen del pedido

                        </h2>


                        <div className="checkout-products">

                            {

                                productos.map( ( item ) =>
                                {

                                    const esVirtual =

                                        item.formato === "Virtual";


                                    return (

                                        <div

                                            className="checkout-product"

                                            key={ `${ item.id }-${ item.formato }` }

                                        >

                                            <img

                                                src={ item.imagen }

                                                alt={ item.titulo }

                                            />


                                            <div>

                                                <strong>

                                                    { item.titulo }

                                                </strong>


                                                <span className="checkout-format">

                                                    {

                                                        esVirtual

                                                            ? <Monitor size={ 16 } />

                                                            : <Package size={ 16 } />

                                                    }

                                                    {

                                                        esVirtual

                                                            ? "Virtual"

                                                            : "Físico"

                                                    }

                                                </span>


                                                {

                                                    !esVirtual && (

                                                        <span>

                                                            Cantidad: { item.quantity }

                                                        </span>

                                                    )

                                                }

                                            </div>


                                            <strong>

                                                $

                                                {

                                                    (

                                                        item.precio *

                                                        item.quantity

                                                    ).toLocaleString( "es-CO" )

                                                }

                                            </strong>

                                        </div>

                                    );

                                } )

                            }

                        </div>


                        <div className="checkout-total">

                            <span>

                                Total

                            </span>

                            <strong>

                                $

                                {

                                    total.toLocaleString( "es-CO" )

                                }

                            </strong>

                        </div>


                        <div className="checkout-payment">

                            <h3>

                                Método de pago

                            </h3>


                            <div className="payment-options">

                                {

                                    contraentregaDisponible && (

                                        <label

                                            className={

                                                metodoPago === "Contraentrega"

                                                    ? "payment-option selected"

                                                    : "payment-option"

                                            }

                                        >

                                            <input

                                                type="radio"

                                                name="metodoPago"

                                                value="Contraentrega"

                                                checked={

                                                    metodoPago === "Contraentrega"

                                                }

                                                onChange={ ( e ) =>

                                                    setMetodoPago(

                                                        e.target.value

                                                    )

                                                }

                                            />


                                            <Package size={ 20 } />


                                            <span>

                                                Contraentrega

                                            </span>

                                        </label>

                                    )

                                }


                                <label

                                    className={

                                        metodoPago === "Tarjeta"

                                            ? "payment-option selected"

                                            : "payment-option"

                                    }

                                >

                                    <CreditCard size={ 20 } />


                                    <input

                                        type="radio"

                                        name="metodoPago"

                                        value="Tarjeta"

                                        checked={

                                            metodoPago === "Tarjeta"

                                        }

                                        onChange={ ( e ) =>

                                            setMetodoPago(

                                                e.target.value

                                            )

                                        }

                                    />


                                    <span>

                                        Tarjeta

                                    </span>

                                </label>


                                <label

                                    className={

                                        metodoPago === "PSE"

                                            ? "payment-option selected"

                                            : "payment-option"

                                    }

                                >

                                    <CreditCard size={ 20 } />


                                    <input

                                        type="radio"

                                        name="metodoPago"

                                        value="PSE"

                                        checked={

                                            metodoPago === "PSE"

                                        }

                                        onChange={ ( e ) =>

                                            setMetodoPago(

                                                e.target.value

                                            )

                                        }

                                    />


                                    <span>

                                        PSE

                                    </span>

                                </label>

                            </div>

                        </div>


                        <button

                            type="submit"

                            className="confirm-order-button"

                        >

                            <ShoppingBag size={ 20 } />

                            Confirmar pedido

                        </button>

                    </section>

                </form>

            </section>

        </main>

    );

}

export default Checkout;