import axios from "axios";
const ListadoEspecialidadesHelpers = {};

ListadoEspecialidadesHelpers.listarEspecialidades = () =>{
   return axios.get("http://localhost:5000/especialidades");
};

ListadoEspecialidadesHelpers.buscarEspecialidades = (criterio) =>{
   return axios.get("http://localhost:5000/especialidades?q="+criterio);
};

ListadoEspecialidadesHelpers.buscarEspecialidad = (id) => {
   return axios.get("http://localhost:5000/especialidades/"+id)
};

ListadoEspecialidadesHelpers.guardarEspecialidad = (especialidad) => {
   return axios.post("http://localhost:5000/especialidades", especialidad);
};

ListadoEspecialidadesHelpers.modificarEspecialidad = (id, especialidad) => {
   return axios.put("http://localhost:5000/especialidades/"+id, especialidad);
};

ListadoEspecialidadesHelpers.borrarEspecialidad = (id) => {
   return axios.delete("http://localhost:5000/especialidades/"+id)
};



export default ListadoEspecialidadesHelpers;