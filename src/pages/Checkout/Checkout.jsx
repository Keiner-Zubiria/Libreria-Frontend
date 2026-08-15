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
import AlertContext from "../../context/AlertContext";
import { API_URL, UPLOADS_URL, authFetch } from "../../config/api";


// Página para finalizar una compra.
function Checkout()
{

    const navigate = useNavigate();

    const location = useLocation();

    const { cart, clearCart } = useContext( CartContext );

    const { usuario } = useContext( AuthContext );

    const { mostrarMensaje } = useContext(AlertContext);


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

    // Datos del pago con tarjeta o PSE.
    const [ titularTarjeta, setTitularTarjeta ] = useState( "" );

    const [ numeroTarjeta, setNumeroTarjeta ] = useState( "" );

    const [ vencimientoTarjeta, setVencimientoTarjeta ] = useState( "" );

    const [ cvvTarjeta, setCvvTarjeta ] = useState( "" );

    const [ banco, setBanco ] = useState( "" );

    // Indica si el pago se está procesando.
    const [ procesando, setProcesando ] = useState( false );


    // Calcula el total.
    const total = productos.reduce(

        ( acc, item ) =>

            acc + item.precio * item.quantity,

        0

    );


    // Confirma el pedido.
    const confirmarPedido = async ( e ) =>
    {

        e.preventDefault();


        // Verifica que exista una sesión.
        if ( !usuario )
        {

            mostrarMensaje( "Debes iniciar sesión para realizar la compra.", "warning" );

            navigate( "/login" );

            return;

        }


        // Verifica que existan productos.
        if ( productos.length === 0 )
        {

            mostrarMensaje( "Tu carrito está vacío.", "warning" );
            navigate( "/catalogo" );

            return;

        }


        // Verifica que el método de pago sea válido.
        if (

            metodoPago === "Contraentrega" &&

            !contraentregaDisponible

        )
        {

            mostrarMensaje(
                "El pago contraentrega no está disponible para este pedido.",
                "warning"
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

                mostrarMensaje(
                    "Completa todos los datos de entrega.",
                    "warning"
                );

                return;

            }

        }


        // El método de pago siempre es obligatorio.
        if ( !metodoPago )
        {

            mostrarMensaje(
                "Selecciona un método de pago.",
                "warning"
            );

            return;

        }


        // Valida los datos de la tarjeta si ese método fue elegido.
        if ( metodoPago === "Tarjeta" )
        {

            const numeroLimpio =
                numeroTarjeta.replaceAll( " ", "" );

            if ( numeroLimpio.length < 13 )
            {

                mostrarMensaje(
                    "Ingresa un número de tarjeta válido.",
                    "warning"
                );

                return;

            }

            if ( !titularTarjeta )
            {

                mostrarMensaje(
                    "Ingresa el nombre del titular de la tarjeta.",
                    "warning"
                );

                return;

            }

            if ( !vencimientoTarjeta )
            {

                mostrarMensaje(
                    "Ingresa la fecha de vencimiento de la tarjeta.",
                    "warning"
                );

                return;

            }

            if ( cvvTarjeta.length < 3 )
            {

                mostrarMensaje(
                    "Ingresa el código de seguridad de la tarjeta.",
                    "warning"
                );

                return;

            }

        }


        // Valida el banco si el método elegido es PSE.
        if ( metodoPago === "PSE" && !banco )
        {

            mostrarMensaje(
                "Selecciona un banco para el pago.",
                "warning"
            );

            return;

        }


        // Evita enviar el pedido dos veces mientras se procesa.
        if ( procesando )
        {

            return;

        }


        setProcesando( true );

        try
        {

            const pedido = {

                usuarioId: usuario.id,

                telefono,
                direccion,
                ciudad,

                metodoPago,

                titularTarjeta,
                numeroTarjeta,
                vencimientoTarjeta,
                cvvTarjeta,

                banco,

                productos: productos.map( item => ( {

                    id: item.id,
                    quantity: item.quantity,
                    formato: item.formato

                } ) )

            };

            // Simula el tiempo que tarda una pasarela de pago real.
            await new Promise( resolve =>
                setTimeout( resolve, 1200 )
            );

            const response = await authFetch( `${API_URL}/pedidos`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify( pedido )

            } );

            if ( !response.ok )
            {

                const mensaje = await response.text();

                throw new Error( mensaje );

            }

            // Usa el id del pedido creado para la página de confirmación.
            const pedidoCreado = await response.json();

            if ( !compraDirecta )
            {

                clearCart();

            }

            navigate(
                `/confirmacion/${ pedidoCreado.id }`
            );

        }
        catch ( error )
        {

            console.error( error );

            mostrarMensaje(
                error.message,
                "error"
            );

        }
        finally
        {

            setProcesando( false );

        }
    }


    return (

        <main className="checkout-page">

            <section className="checkout-container">


                {/* Encabezado */ }
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

                                            value={

                                                usuario?.nombre || ""

                                            }

                                            disabled

                                        />

                                    </div>


                                    <div className="checkout-field">

                                        <label>

                                            Correo electrónico

                                        </label>

                                        <input

                                            type="email"

                                            value={

                                                usuario?.correo || ""

                                            }

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

                                                setTelefono(

                                                    e.target.value

                                                )

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

                                                setDireccion(

                                                    e.target.value

                                                )

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

                                                setCiudad(

                                                    e.target.value

                                                )

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

                                            key={

                                                `${ item.id }-${ item.formato }`

                                            }

                                        >


                                            {/* Imagen */ }
                                            <img

                                                src={

                                                    item.imagen

                                                        ?

                                                        `${UPLOADS_URL}/${ item.imagen }`

                                                        :

                                                        "/images/default-book.jpg"

                                                }

                                                alt={ item.titulo }

                                            />


                                            <div>

                                                <strong>

                                                    { item.titulo }

                                                </strong>


                                                <span className="checkout-format">

                                                    {

                                                        esVirtual

                                                            ?

                                                            <Monitor

                                                                size={ 16 }

                                                            />

                                                            :

                                                            <Package

                                                                size={ 16 }

                                                            />

                                                    }


                                                    {

                                                        esVirtual

                                                            ?

                                                            "Virtual"

                                                            :

                                                            "Físico"

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

                                                    ).toLocaleString(

                                                        "es-CO"

                                                    )

                                                }

                                            </strong>

                                        </div>

                                    );

                                } )

                            }

                        </div>


                        {/* Total */ }
                        <div className="checkout-total">

                            <span>

                                Total

                            </span>

                            <strong>

                                $

                                {

                                    total.toLocaleString(

                                        "es-CO"

                                    )

                                }

                            </strong>

                        </div>


                        {/* Método de pago */ }
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

                                                    ?

                                                    "payment-option selected"

                                                    :

                                                    "payment-option"

                                            }

                                        >

                                            <input

                                                type="radio"

                                                name="metodoPago"

                                                value="Contraentrega"

                                                checked={

                                                    metodoPago ===

                                                    "Contraentrega"

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

                                            ?

                                            "payment-option selected"

                                            :

                                            "payment-option"

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

                                            ?

                                            "payment-option selected"

                                            :

                                            "payment-option"

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


                        {/* Formulario de la tarjeta */ }
                        {
                            metodoPago === "Tarjeta" && (

                                <div className="card-payment-fields">

                                    <div className="checkout-field">

                                        <label>

                                            Nombre del titular

                                        </label>

                                        <input

                                            type="text"

                                            placeholder="Nombre como aparece en la tarjeta"

                                            value={ titularTarjeta }

                                            onChange={ ( e ) =>

                                                setTitularTarjeta(

                                                    e.target.value

                                                )

                                            }

                                        />

                                    </div>

                                    <div className="checkout-field">

                                        <label>

                                            Número de tarjeta

                                        </label>

                                        <input

                                            type="text"

                                            inputMode="numeric"

                                            placeholder="1234 5678 9012 3456"

                                            maxLength={ 19 }

                                            value={ numeroTarjeta }

                                            onChange={ ( e ) =>

                                                setNumeroTarjeta(

                                                    e.target.value

                                                )

                                            }

                                        />

                                    </div>

                                    <div className="card-fields-row">

                                        <div className="checkout-field">

                                            <label>

                                                Vencimiento

                                            </label>

                                            <input

                                                type="text"

                                                placeholder="MM/AA"

                                                maxLength={ 5 }

                                                value={ vencimientoTarjeta }

                                                onChange={ ( e ) =>

                                                    setVencimientoTarjeta(

                                                        e.target.value

                                                    )

                                                }

                                            />

                                        </div>

                                        <div className="checkout-field">

                                            <label>

                                                CVV

                                            </label>

                                            <input

                                                type="password"

                                                inputMode="numeric"

                                                placeholder="123"

                                                maxLength={ 4 }

                                                value={ cvvTarjeta }

                                                onChange={ ( e ) =>

                                                    setCvvTarjeta(

                                                        e.target.value

                                                    )

                                                }

                                            />

                                        </div>

                                    </div>

                                    <p className="simulated-payment-note">

                                        Pago de demostración: no se hace
                                        ningún cobro real.

                                    </p>

                                </div>

                            )
                        }


                        {/* Selección de banco para PSE */ }
                        {
                            metodoPago === "PSE" && (

                                <div className="card-payment-fields">

                                    <div className="checkout-field">

                                        <label>

                                            Banco

                                        </label>

                                        <select

                                            value={ banco }

                                            onChange={ ( e ) =>

                                                setBanco(

                                                    e.target.value

                                                )

                                            }

                                        >

                                            <option value="">

                                                Selecciona un banco

                                            </option>

                                            <option value="Bancolombia">

                                                Bancolombia

                                            </option>

                                            <option value="Davivienda">

                                                Davivienda

                                            </option>

                                            <option value="BBVA">

                                                BBVA

                                            </option>

                                            <option value="Banco de Bogotá">

                                                Banco de Bogotá

                                            </option>

                                            <option value="Nequi">

                                                Nequi

                                            </option>

                                            <option value="Daviplata">

                                                Daviplata

                                            </option>

                                        </select>

                                    </div>

                                    <p className="simulated-payment-note">

                                        Pago de demostración: no se hace
                                        ningún cobro real.

                                    </p>

                                </div>

                            )
                        }


                        {/* Confirmar pedido */ }
                        <button

                            type="submit"

                            className="confirm-order-button"

                            disabled={ procesando }

                        >

                            <ShoppingBag size={ 20 } />

                            {
                                procesando

                                    ? "Procesando pago..."

                                    : "Confirmar pedido"

                            }

                        </button>

                    </section>

                </form>

            </section>

        </main>

    );

}

export default Checkout;