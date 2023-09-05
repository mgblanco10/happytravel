import React from "react";
import "../css/Modal.css";

const ModalAction = (props) => {
    return (
        <div className={`modal ${props.isOpen ? "open" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <span onClick={props.onClose} className="modal-close-btn">&times;</span>
                <h3 className="modal-title"> ¿Quieres eliminar este destino?</h3>
                <div className="container-btn">
                    <button type="button" className="btn btn-primary" onClick={props.onDelete}>Aceptar</button>
                    <button type="button" className="btn btn-secondary" onClick={props.onClose}>Cancelar</button>
                </div>
            </div>
         </div>
    );
};

export default ModalAction;




