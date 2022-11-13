import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/general/Header";
import ListadoDoctores from "./components/Doctores/ListadoDoctores";
import FormularioDoctores from "./components/Doctores/FormularioDoctores";
import ListadoEspecialidades from "./components/Especialidades/ListadoEspecialidades";
import FormularioEspecialidades from "./components/Especialidades/FormularioEspecialidad";
import FormularioModificarEspecialidad from "./components/Especialidades/FormularioModificarEspecialidad";

import FormularioPacientes from "./components/Pacientes/FormularioPacientes";
import ListadoPacientes from "./components/Pacientes/ListadoPacientes";


function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} exact/>
          <Route path="/doctores" element={<ListadoDoctores/>} exact/>
          <Route path="/form/doctores" element={<FormularioDoctores/>} exact/>
          <Route path="/form/doctores/:id" element={<FormularioDoctores/>} exact/>
          <Route path="/especialidades" element={<ListadoEspecialidades/>} exact/>
          <Route path="/form/especialidades" element={<FormularioEspecialidades/>} exact/>
          <Route path="/form/modificar/especialidad/:id" element={<FormularioModificarEspecialidad/>} exact/>
          <Route path="/pacientes" element={<ListadoPacientes/>} exact/>
          <Route path="/form/pacientes" element={<FormularioPacientes/>} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;