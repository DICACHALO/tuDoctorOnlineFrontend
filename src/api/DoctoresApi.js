import axios from "axios";
const api = {};

api.listarDoctores = () =>{
   return axios.get("http://localhost:5000/doctores");
};

api.registrarDoctor = (doctor) =>{
   return axios.post("http://localhost:5000/doctores", doctor);
};
api.buscarDoctorById = (id) =>{
   return axios.get(`http://localhost:5000/doctores/${id}`);
};

api.modificarDoctor = (id, doctor) =>{
   return axios.put(`http://localhost:5000/doctores/${id}`, doctor);
};
export default api;