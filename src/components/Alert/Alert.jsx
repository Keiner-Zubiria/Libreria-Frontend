import "./Alert.css";

import { useContext } from "react";

import {

    CircleCheck,

    CircleX,

    TriangleAlert,

    Info,

    X

} from "lucide-react";

import AlertContext from "../../context/AlertContext";

function Alert() {

    const {

        alerta,

        ocultarMensaje

    } = useContext(AlertContext);


    if (!alerta.visible) {

        return null;

    }


    const iconos = {

        success: <CircleCheck size={22} />,

        error: <CircleX size={22} />,

        warning: <TriangleAlert size={22} />,

        info: <Info size={22} />

    };


    return (

        <div className={`alerta ${alerta.tipo}`}>

            <div className="alerta-contenido">

                {iconos[alerta.tipo]}

                <span>

                    {alerta.mensaje}

                </span>

            </div>


            <button

                className="alerta-cerrar"

                onClick={ocultarMensaje}

            >

                <X size={18} />

            </button>

        </div>

    );

}

export default Alert;