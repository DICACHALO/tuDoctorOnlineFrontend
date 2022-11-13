import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../api/PacientesApi';

const FormularioPacientes = () => {
    const navigateTo = useNavigate();
    const {id} = useParams();
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState({
        nombres:    "",
        apellidos:  "",
        documento:  "",
        direccion:  "",
        telefono:   "",
        rol:        "",
        correo:     "",
        password:   "",
        confirmPassword : ""
    });
    const [titulo, setTitulo] = useState("");
    const [mensajeBoton, setMensajeBoton] = useState("");

    const handleChange = ({target}) => {
        const {name, value} = target;
        setPacienteSeleccionado(prevetState =>({
            ...prevetState,
            [name] : value
        }));
    };

    const registrarPaciente = async (event) => {
        event.preventDefault();
        if(pacienteSeleccionado.password === pacienteSeleccionado.confirmPassword){
            if(id == null){
                delete pacienteSeleccionado.confirmPassword;
                await api.registrarPaciente(pacienteSeleccionado).then(
                    response => {
                        setPacientes(pacientes.concat(response.data));
                        Swal.fire({
                            title : "Exito",
                            text : "Se ha registrado al paciente satisfactoriamente!",
                            icon : "success"
                        });
                        navigateTo("/pacientes");
                        
                    }).catch(error =>{
                        console.error(error);
                });
            }else{
                delete pacienteSeleccionado.confirmPassword;
                delete pacienteSeleccionado.__v;
                await api.modificarPaciente(id, pacienteSeleccionado).then(
                    response => {
                        Swal.fire({
                            title : "Exito",
                            text : "Se ha Modificado al paciente satisfactoriamente!",
                            icon : "success"
                        });
                        navigateTo("/pacientes");
                    }
                ).catch(error => console.error(error));
            }
        }else{
            Swal.fire({
                title : "Error",
                text : "Las contraseñas no coinciden",
                icon : "error"
            });
        }
    };

    const cargarPaciente = async () =>{
        if(id != null){
            await api.buscarPacienteById(id).then(
                response => {
                    setPacienteSeleccionado({
                        ...response.data, 
                        confirmPassword : response.data.password
                    });
                }
            ).catch(error => console.error(error));
            setTitulo("Editar Paciente");
            setMensajeBoton("Editar");
        }else{
            setTitulo("Registrar nuevo paciente");
            setMensajeBoton("Registrar");
        }
    }

    useEffect(() => {
        cargarPaciente();
    }, []);
    

    return (
        <div className='container mt-5'>
            <div className="card">
                <div className='card-header bg-dark'>
                    <h3 className='text-center text-white'>{titulo}</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='nombres' className='my-3 mb-2'>Nombres</label>
                                    <input type="text" name="nombres" 
                                        className='form-control' 
                                        placeholder='Ingrese nombres completos'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.nombres}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='apellidos' className='my-3 mb-2'>Apellidos</label>
                                    <input type="text" name="apellidos" 
                                        className='form-control' 
                                        placeholder='Ingrese apellidos completos'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.apellidos}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='documento' className='my-3 mb-2'>Documento </label>
                                    <input type="text" name="documento" 
                                        className='form-control' 
                                        placeholder='Ingrese el documento'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.documento}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='direccion' className='my-3 mb-2'>Dirección</label>
                                    <input type="text" name="direccion" 
                                        className='form-control' 
                                        placeholder='Ingrese la dirección'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.direccion}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='telefono' className='my-3 mb-2'>Telefono</label>
                                    <input type="text" name="telefono" 
                                        className='form-control' 
                                        placeholder='Ingrese el telefono'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.telefono}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='rol' className='my-3 mb-2'>Rol</label>
                                    <input type="text" name="rol" 
                                        className='form-control' 
                                        placeholder='Ingrese un rol para este usuario'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.rol}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='correo' className='my-3 mb-2'>Correo electrónico </label>
                                    <input type="email" name="correo" 
                                        className='form-control' 
                                        placeholder='Ingrese el correo electrónico'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.correo}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='password' className='my-3 mb-2'>Contraseña</label>
                                    <input type="password" name="password" 
                                        className='form-control' 
                                        placeholder='Ingrese contraseña'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.password}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='confirmPassword' className='my-3 mb-2'>Confirmar Contraseña</label>
                                    <input type="password" name="confirmPassword" 
                                        className='form-control' 
                                        placeholder='Confirme contraseña'
                                        required
                                        onChange={handleChange}
                                        value={pacienteSeleccionado && pacienteSeleccionado.confirmPassword}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='card-footer'>
                    <div className="p-2">
                        <div className="d-flex justify-content-center">
                            <a href='/pacientes' className='btn btn-dark mx-1'>Cancelar</a>
                            <a  
                                href='/pacientes'
                                className='btn btn-success mx-1'
                                onClick={registrarPaciente}
                                >{mensajeBoton}</a>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
    );
}

export default FormularioPacientes;