import React, { useEffect, useState } from 'react'
import Estados from '../../enumeradores/Estados';
import ListadoEspecialidadesHelpers from '../../helpers/ListadoEspecialidadesHelpers';

const ListadoEspecialidades = () => {
    const [listaEspecialidades, setListadoEspecialidades] = useState([]);
    const [estado, setEstado] = useState(Estados.CARGANDO);
    const [criterio, setCriterio] = useState("");

    const [ idBorrar, setIdBorrar] = useState("");
    const [ especialidadBorrar,  setEspecialidadBorrar] = useState("");
    

    const cargarEspecialidades = async () => {
        try {
            const respuesta = await ListadoEspecialidadesHelpers.listarEspecialidades();
            if(respuesta.data.length > 0){
                setListadoEspecialidades(respuesta.data);
                setEstado(Estados.OK);
            }else{
                setEstado(Estados.VACIO);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    };

    const confirmarBorrado = (id, especialidad) => {
        setIdBorrar(id);
        setEspecialidadBorrar(especialidad)
    }

    const borrarEspecialidad = async () => {
       try {
        await  ListadoEspecialidadesHelpers.borrarEspecialidad(idBorrar);
        cargarEspecialidades();
       } catch (error) {
        
       }
    }

    useEffect(() => {
        cargarEspecialidades();
    }, [])

    const cambiarCriterio = (event) =>{
        setCriterio(event.target.value);
    }

    const buscarEspecialidad = (event) => {
        event.preventDefault();
        const cargarEspecialidades = async () => {
            try {
                const respuesta = await ListadoEspecialidadesHelpers.buscarEspecialidades(criterio);
                if(respuesta.data.length > 0){
                    setListadoEspecialidades(respuesta.data);
                    setEstado(Estados.OK);
                }else{
                    setEstado(Estados.VACIO);
                }
            } catch (error) {
                setEstado(Estados.ERROR);
            }
        };
        cargarEspecialidades();
    }
    
    return (
        <div className='container'>
            <h3 className='mt-3 mb-1 text-center'>Listado de Especialidades</h3>
            <form>
                <input type ="text" value={criterio} onChange={cambiarCriterio} id="criterio" name="criterio"/>
                <button id="buscar" name="buscar" onClick={buscarEspecialidad}>Buscar</button>
            </form>

            <div className='d-flex flex-row-reverse'>
                <a href='/form/especialidades' 
                    className='btn btn-primary mb-3'
                    title='Botón destinado para registrar una nueva especialidad'
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    Registrar Especialidad
                </a>
            </div>
            <table className="table table-hover table-striped ">
                <thead className='table-dark rounded'>
                    <tr >
                        <th>Nombre Especialidad</th>
                        <th>Descripción</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        estado === Estados.CARGANDO ? 
                            (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="spinner-border" 
                                            role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                    </td>
                                </tr>
                            ) :
                        estado === Estados.ERROR ? 
                            (<tr><td>¡Ha ocurrido un error!</td></tr>):
                        estado === Estados.VACIO ? 
                        (<div className='text-center bg-dark'>No hay Especialidades</div>) : 

                        listaEspecialidades.map((especialidad) => (
                            <tr key={especialidad._id}>
                                <td>{ especialidad.nombreEspecialidad}</td>
                                <td>{ especialidad.descripcionEspecialidad}</td>

                                <div>
                                <a className='btn btn-sm btn-warning me-2' href={"/form/modificar/especialidad/"+especialidad._id} >Editar</a>
                                <button onClick={() => {confirmarBorrado(especialidad._id, especialidad.nombreEspecialidad)}} className='btn btn-sm btn-danger' data-bs-toggle="modal" data-bs-target="#modalBorrado">Eliminar</button>
                                </div>
                                
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>

            <div className="modal fade" id="modalBorrado" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Borrado de especialidad</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Desea eliminar la especialidad {especialidadBorrar} de la base de datos?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">NO</button>
                            <button type="button" onClick={borrarEspecialidad} className="btn btn-danger" data-bs-dismiss="modal">SI</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListadoEspecialidades;