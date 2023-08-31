import "../css/CreateForm.css";
import folderImg from '../assets/file-icon.svg'
import React from 'react';

export default function EditForm() {

    return (
        <form className="full-container-form" method="POST" enctype="multipart/form-data">
  
            <input type="hidden" name="_token"/>

            <div className="box-line"><h3>Editar destino</h3></div>

            <div className="form-create">
                <div className="columna1">
                    <div className="label-and-input-container">
                    <label htmlFor="title">Título</label>
                    <input id="title" className="form-control" placeholder="Escribe el título..." />
                    <p id="error-title" className="error"></p>
                    </div>

                    <div className="label-and-input-container">
                    <label htmlFor="location">Ubicación</label>
                    <input id="location" className="form-control" type="text" name="location" placeholder="Escribe la ubicación..." />
                    <p id="error-location" className="error"></p>
                    </div>

                    <div className="add-file">
                        <label className="form-label">Imagen</label>
                        <div className="input-group">
                            <label className="input-group-text" htmlFor="fileInput">
                                <img className={folderImg}  alt="Icono de carpeta"  />
                                <input type="text" className="blue-background" placeholder="Sube una imagen" readOnly />
                            </label>
                        </div>
                        <p id="error-image" className="error"></p>
                    </div>

                </div>

               
                <div className="columna2">
                    <label>¿Por qué quieres viajar allí?</label>
                    <p id="error-description" className="error"></p>
                    <textarea name="description"  className="custom-textarea" id="description"placeholder="Cuéntanos por qué te gusta este destino"></textarea>
                </div>

            
            </div>
            <div className="btn-container">
                <button className="btn-primary" type="submit">Aceptar</button>
                <button className="btn-secondary"> Cancelar</button>
            </div>

        </form>

    );
};

