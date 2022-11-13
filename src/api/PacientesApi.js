import axios from "axios";
const api = {};

api.listarPacientes = () =>{
   return axios.get("http://localhost:5000/pacientes");
};

api.registrarPaciente = (doctor) =>{
   return axios.post("http://localhost:5000/pacientes", doctor);
};
api.buscarPacienteById = (id) =>{
   return axios.get(`http://localhost:5000/pacientes/${id}`);
};

api.modificarPaciente = (id, doctor) =>{
   return axios.put(`http://localhost:5000/pacientes/${id}`, doctor);
};
export default api;