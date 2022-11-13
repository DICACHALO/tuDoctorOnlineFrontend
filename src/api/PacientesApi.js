import axios from "axios";
const api = {};

api.listarPacientes = () =>{
   return axios.get("https://tudoctoronlinebackend.herokuapp.com/pacientes");
};

api.registrarPaciente = (doctor) =>{
   return axios.post("https://tudoctoronlinebackend.herokuapp.com/pacientes", doctor);
};
api.buscarPacienteById = (id) =>{
   return axios.get(`https://tudoctoronlinebackend.herokuapp.com/pacientes/${id}`);
};

api.modificarPaciente = (id, doctor) =>{
   return axios.put(`https://tudoctoronlinebackend.herokuapp.com/pacientes/${id}`, doctor);
};
export default api;