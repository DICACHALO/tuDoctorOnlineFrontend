import React, { useEffect, useState } from 'react'
import Estados from '../../enumeradores/Estados';
import Swal from 'sweetalert2';
import api from '../../api/PacientesApi';

const ListadoPacientes = () => {
    const [listaPacientes, setListadoPacientes] = useState([]);
    const [estado, setEstado] = useState(Estados.CARGANDO);
    const [page, setPage] = useState(0);

    const cargarDatos = async () => {
        try {
            const respuesta = await api.listarPacientes();
            if(respuesta.data.length > 0){
                setListadoPacientes(respuesta.data);
                setEstado(Estados.OK);
            }else{
                setEstado(Estados.VACIO);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    };
    
    //paginación tabla
    const nextPage = () =>{
        if(listaPacientes.length > page + 5) setPage(page + 5);
    }
    const prevPage = () =>{
        if(page > 0) setPage(page - 5);
    }
    //Paginación propia
    const filtrarTablaPacientes = () => {
        return listaPacientes.slice(page, page + 5);
    }

    const eliminarPaciente = (id, nombres, apellidos) =>{
        Swal.fire({
            title: `¿Estas seguro que quieres eliminar al paciente ${nombres} ${apellidos}?`,
            text: "Si eliminas este registro no se podrá deshacer la acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#212529',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, Eliminar!'

          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Registro Eliminado!',
                text: 'El registro ha sido eliminado satisfactoriamente.',
                icon: 'success',
                confirmButtonColor: '#0d6efd',
              })
            }
          })
    }

    useEffect(() => {
        cargarDatos();
    }, [])
    
    return (
        <div className='container'>
            <h1 className='mt-3 mb-1 text-center'>Listado de Pacientes</h1>

            <div className='d-flex flex-row-reverse'>
                <a href='/form/pacientes' 
                    className='btn btn-primary mb-3'
                    title='Botón destinado para registrar un nuevo paciente'
                    data-bs-toggle="tooltip" data-bs-placement="top">
                    Registrar Paciente
                </a>
            </div>
            <table className="table table-hover table-striped ">
                <thead className='table-dark rounded'>
                    <tr >
                        <th>N°</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Documento</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Correo</th>
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
                        (<div className='text-center bg-dark'>No hay Pacientes</div>) : 
                        filtrarTablaPacientes().map(({_id, nombres, apellidos, documento, 
                                        direccion, telefono, correo}, num) =>(
                            <tr key={_id}>
                                <td>{num + 1}</td>
                                <td>{nombres}</td>
                                <td>{apellidos}</td>
                                <td>{documento}</td>
                                <td>{direccion}</td>
                                <td>{telefono}</td>
                                <td>{correo}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <a href={`/form/pacientes/${_id}`} 
                                            className='btn btn-warning mx-1'>Editar</a>
                                        <button  
                                            onClick={()=>eliminarPaciente(_id, nombres, apellidos)}
                                            className='btn btn-danger mx-1'>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            <div> 
                <div className="d-flex justify-content-center mt-2">
                    <button className='btn btn-dark mx-1'
                        onClick={prevPage}
                        >Anterior</button>
                    <button className='btn btn-dark mx-1'
                        onClick={nextPage}
                        >Siguiente</button>
                </div> 
            </div>
        </div>
    );
}

export default ListadoPacientes;