import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ListadoEspecialidadesHelpers from '../../helpers/ListadoEspecialidadesHelpers';

const FormularioModificarEspecialidad = () => {

    const navigateTo = useNavigate();

    const [ nombreEspecialidad, setNombresEspecialidad ] = useState("");
    const [ descripcionEspecialidad, setDescripcionEspecialidad] = useState("");
    const [ mensaje, setMensaje ] = useState("");

    const {id} = useParams();

    const cargarEspecialidad = async () =>{
       try {
        if (id != null){
            const respuesta = await  ListadoEspecialidadesHelpers.buscarEspecialidad(id);
            if (respuesta.data != null) {
                console.log(respuesta.data)
                setNombresEspecialidad(respuesta.data.nombreEspecialidad);
                setDescripcionEspecialidad(respuesta.data.descripcionEspecialidad);   
            }
        }
       } catch (error) {
        
       }
    };

    const modificarEspecialidad = async (event) => {
        try {
            const especialidad = {
                nombreEspecialidad: nombreEspecialidad,
                descripcionEspecialidad: descripcionEspecialidad
            }
            console.log(especialidad)
            await ListadoEspecialidadesHelpers.modificarEspecialidad(id, especialidad);
            navigateTo("/especialidades")
            
        } catch (error) {
            setMensaje("Error al guaradar especialidad");
        }
    }


    const cambiarNombreEspecialidad = (event) => {
        setNombresEspecialidad(event.target.value);
    }

    const cambiarDescripcionEspecialidad = (event) => {
        setDescripcionEspecialidad(event.target.value);
    }

    useEffect( () => {
        console.log(id)
        cargarEspecialidad()
    }, [])


    return (
        <div className='container mt-5'>
        <div className="card">
            <div className='card-header bg-dark'>
                <h3 className='text-center text-white'>Modificar Especialidad</h3>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className='col-4'>
                        <div className="form-group">
                            <label htmlFor='nombre-especialidad' className='my-3 mb-2'>Nombre Especialidad</label>
                            <input type="text" name="nombre-especialidad" 
                                onChange={cambiarNombreEspecialidad} value={nombreEspecialidad}
                                className='form-control' 
                                placeholder='Ingrese el nombre de la especialidad'
                                id='nombreEspecialidad'
                                required/>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="form-group">
                            <label htmlFor='descipcion' className='my-3 mb-2'>Descripción</label>
                            <input type="text" name="descripcion-especialidad" 
                                onChange={cambiarDescripcionEspecialidad} value={descripcionEspecialidad}
                                className='form-control' 
                                placeholder='Ingrese la descripción de la especialidad'
                                id='descripcionEspecialidad'
                                required/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card-footer'>
                <div className="p-2">
                    <div className="d-flex justify-content-center">
                        <a href='/especialidades' className='btn btn-dark mx-1'>Cancelar</a>
                        <button onClick={modificarEspecialidad} className='btn btn-success mx-1'>Guardar</button>
                        <div id="mensaje">{mensaje}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    );
}

export default FormularioModificarEspecialidad;