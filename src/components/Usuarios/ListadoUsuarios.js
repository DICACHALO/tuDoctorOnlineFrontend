import React from 'react'

const ListadoUsuarios = () => {
  return (
    <div className='container'>
        <h3 className='mt-3 mb-3 text-center'>Listado General de Usuarios</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Documento</th>
                    <th>Dirección</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Esteban Abraham</td>
                    <td>Ruiz Rosero</td>
                    <td>1084228683</td>
                    <td>CRA 29 #15-60</td>
                    <td>3213868107</td>
                    <td>estebanruiz1296@gmail.com</td>
                    <td>
                        <button className='btn btn-warning mx-1'>Editar</button>
                        <button className='btn btn-danger mx-1'>Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default ListadoUsuarios;