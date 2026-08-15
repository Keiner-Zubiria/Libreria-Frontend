import { createContext, useState } from "react";

const AlertContext = createContext();

function AlertProvider({ children }) {

    const [alerta, setAlerta] = useState({
        visible: false,
        tipo: "",
        mensaje: ""
    });

    const mostrarMensaje = (mensaje, tipo = "info") => {

        setAlerta({
            visible: true,
            tipo,
            mensaje
        });

        setTimeout(() => {

            ocultarMensaje();

        }, 3000);

    };

    const ocultarMensaje = () => {

        setAlerta((anterior) => ({
            ...anterior,
            visible: false
        }));

    };

    return (

        <AlertContext.Provider
            value={{
                alerta,
                mostrarMensaje,
                ocultarMensaje
            }}
        >

            {children}

        </AlertContext.Provider>

    );

}

export { AlertProvider };

export default AlertContext;