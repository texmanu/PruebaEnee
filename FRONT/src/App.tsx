import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";


import AddSucursal from "./components/AddSucursal";
import SucursalList from "./components/SucursalList";
import Sucursal from "./components/Sucursal";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/sucursales" className="navbar-brand">
          ENEE
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/sucursales"} className="nav-link">
              Listar Sucursales
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Agregar Sucursal
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<SucursalList/>} />
          <Route path="/sucursales" element={<SucursalList/>} />
          <Route path="/add" element={<AddSucursal/>} />
          <Route path="/sucursal/:id" element={<Sucursal/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
