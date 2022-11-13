import axios from "axios";
const api = {};

api.listarDoctores = () =>{
   return axios.get("https://tudoctoronlinebackend.herokuapp.com/doctores");
};

api.registrarDoctor = (doctor) =>{
   return axios.post("https://tudoctoronlinebackend.herokuapp.com/doctores", doctor);
};
api.buscarDoctorById = (id) =>{
   return axios.get(`https://tudoctoronlinebackend.herokuapp.com/${id}`);
};

api.modificarDoctor = (id, doctor) =>{
   return axios.put(`https://tudoctoronlinebackend.herokuapp.com/${id}`, doctor);
};
export default api;