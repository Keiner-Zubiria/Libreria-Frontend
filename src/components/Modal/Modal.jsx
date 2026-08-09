import "./Modal.css";

// Componente reutilizable para mostrar información adicional sobre un elemento.
function Modal({ children, onClose }) {

    return (
        <div className="modal-overlay">

            <div className="modal-content">

                {/* Botón encargado de cerrar la ventana modal */}
                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    X
                </button>

                {/* Contenido dinámico recibido desde el componente padre */}
                {children}

            </div>

        </div>
    );
}

export default Modal;