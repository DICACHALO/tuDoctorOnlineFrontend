const Header = () =>{
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Doctor
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a className="dropdown-item" href="/doctores">Doctores</a></li>
                                <li><a className="dropdown-item" href="/especialidades">Especialidades</a></li>
                                <li><a className="dropdown-item" href="/pacientes">Pacientes</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Agenda
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a className="dropdown-item" href="/agendas">Agendas</a></li>
                                <li><a className="dropdown-item" href="/citas">Citas</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Historias
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a className="dropdown-item" href="/historias">Historias Clinicas</a></li>
                                <li><a className="dropdown-item" href="/pacientes">Pacientes</a></li>
                                <li><a className="dropdown-item" href="/medicamentos">Medicamentos</a></li>
                                <li><a className="dropdown-item" href="/prescripciones">Prescripciones</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/usuarios" className="nav-link px-2 text-white">Usuarios</a></li>
                    </ul>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
                        </form> 
                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2">Inciar Sesión</button>
                            <button type="button" className="btn btn-warning">Registrarse</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Header;