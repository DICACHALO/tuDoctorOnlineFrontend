import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../api/DoctoresApi';

const FormularioDoctores = () => {
    const navigateTo = useNavigate();
    const {id} = useParams();
    const [doctores, setDoctores] = useState([]);
    const [doctorSeleccionado, setDoctorSeleccionado] = useState({
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
        setDoctorSeleccionado(prevetState =>({
            ...prevetState,
            [name] : value
        }));
    };

    const registrarDoctor = async (event) => {
        event.preventDefault();
        if(doctorSeleccionado.password === doctorSeleccionado.confirmPassword){
            if(id == null){
                delete doctorSeleccionado.confirmPassword;
                await api.registrarDoctor(doctorSeleccionado).then(
                    response => {
                        setDoctores(doctores.concat(response.data));
                        Swal.fire({
                            title : "Exito",
                            text : "Se ha registrado al doctor satisfactoriamente!",
                            icon : "success"
                        });
                        navigateTo("/doctores");
                        
                    }).catch(error =>{
                        console.error(error);
                });
            }else{
                delete doctorSeleccionado.confirmPassword;
                delete doctorSeleccionado.__v;
                await api.modificarDoctor(id, doctorSeleccionado).then(
                    response => {
                        Swal.fire({
                            title : "Exito",
                            text : "Se ha Modificado al doctor satisfactoriamente!",
                            icon : "success"
                        });
                        navigateTo("/doctores");
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

    const cargarDoctor = async () =>{
        if(id != null){
            await api.buscarDoctorById(id).then(
                response => {
                    setDoctorSeleccionado({
                        ...response.data, 
                        confirmPassword : response.data.password
                    });
                }
            ).catch(error => console.error(error));
            setTitulo("Editar Doctor");
            setMensajeBoton("Editar");
        }else{
            setTitulo("Registra Nuevo Doctor");
            setMensajeBoton("Registrar");
        }
    }

    useEffect(() => {
        cargarDoctor();
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
                                    <label htmlFor='nombres' className='my-3 mb-2'>Nombres Doctor</label>
                                    <input type="text" name="nombres" 
                                        className='form-control' 
                                        placeholder='Ingrese nombres completos'
                                        required
                                        onChange={handleChange}
                                        value={doctorSeleccionado && doctorSeleccionado.nombres}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='apellidos' className='my-3 mb-2'>Apellidos Doctor</label>
                                    <input type="text" name="apellidos" 
                                        className='form-control' 
                                        placeholder='Ingrese apellidos completos'
                                        required
                                        onChange={handleChange}
                                        value={doctorSeleccionado && doctorSeleccionado.apellidos}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='documento' className='my-3 mb-2'>Documento Doctor</label>
                                    <input type="text" name="documento" 
                                        className='form-control' 
                                        placeholder='Ingrese el documento del doctor'
                                        required
                                        onChange={handleChange}
                                        value={doctorSeleccionado && doctorSeleccionado.documento}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='direccion' className='my-3 mb-2'>Dirección Doctor</label>
                                    <input type="text" name="direccion" 
                                        className='form-control' 
                                        placeholder='Ingrese la dirección del doctor'
                                        required
                                        onChange={handleChange}
                                        value={doctorSeleccionado && doctorSeleccionado.direccion}/>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='telefono' className='my-3 mb-2'>Telefono Doctor</label>
                                    <input type="text" name="telefono" 
                                        className='form-control' 
                                        placeholder='Ingrese el telefono del doctor'
                                        required
                                        onChange={handleChange}
                                        value={doctorSeleccionado && doctorSeleccionado.telefono}/>
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
                                        value={doctorSeleccionado && doctorSeleccionado.rol}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-4'>
                                <div className="form-group">
                                    <label htmlFor='correo' className='my-3 mb-2'>Correo electrónico Doctor</label>
                                    <input type="email" name="correo" 
                                        className='form-control' 
                                        placeholder='Ingrese el correo del doctor'
                                        required
                                        onChange={handleChange}
                                        value={doctorSeleccionado && doctorSeleccionado.correo}/>
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
                                        value={doctorSeleccionado && doctorSeleccionado.password}/>
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
                                        value={doctorSeleccionado && doctorSeleccionado.confirmPassword}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='card-footer'>
                    <div className="p-2">
                        <div className="d-flex justify-content-center">
                            <a href='/doctores' className='btn btn-dark mx-1'>Cancelar</a>
                            <a  
                                href='/doctores'
                                className='btn btn-success mx-1'
                                onClick={registrarDoctor}
                                >{mensajeBoton}</a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default FormularioDoctores;