import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import SucursalService from "../services/SucursalService";

const Sucursal: React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialSucursalState = {
    Id: null,
    Name: "",
    Phone: "",
    Address: "",
    Fax: "",
    Order_numbers: 0,
    Created_at:null,
    Deleted_at:null,
    Administrator_name:"",
    User_id:null
  };
  const [currentSucursal, setCurrentSucursal] = useState(initialSucursalState);
  const [message, setMessage] = useState<string>("");

  const getSucursal = (id: string) => {
    SucursalService.get(id)
      .then((response: any) => {
        setCurrentSucursal(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getSucursal(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentSucursal({ ...currentSucursal, [name]: value });
  };


  const updateSucursal = () => {
    SucursalService.update(currentSucursal, 1)
      .then((response: any) => {
        console.log(response.data);
        setMessage("La sucursal se ha actualizado exitosamente!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteSucursal = () => {
    SucursalService.update2(currentSucursal.Id,1)
      .then((response: any) => {
        console.log(response.data);
        navigate("/sucursales");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSucursal ? (
        <div className="edit-form">
          <h4>Sucursal</h4>
          <form>
            <div className="form-group">
              <label htmlFor="Name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                required
                value={currentSucursal.Name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
            <label htmlFor="Administrator_name">Nombre del Administrador</label>
            <input
              type="text"
              className="form-control"
              id="Administrator_name"
              required
              value={currentSucursal.Administrator_name}
              onChange={handleInputChange}
              name="Administrator_name"
            />
          </div>
            <div className="form-group">
              <label htmlFor="Phone">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="Phone"
                name="Phone"
                value={currentSucursal.Phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Address">Dirrecion</label>
              <input
                type="text"
                className="form-control"
                id="Address"
                name="Address"
                value={currentSucursal.Address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Fax">Fax</label>
              <input
                type="text"
                className="form-control"
                id="Fax"
                name="Fax"
                value={currentSucursal.Fax}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Order_numbers">Numero de Pedidos</label>
              <input
                type="number"
                className="form-control"
                id="Order_numbers"
                name="Order_numbers"
                value={currentSucursal.Order_numbers}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Estado:</strong>
              </label>
              {currentSucursal.Deleted_at==null ? "Activo" : "Inactivo"}
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteSucursal}>
            Eliminar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateSucursal}
          >
            Actualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Porfavor selecione una sucursal...</p>
        </div>
      )}
    </div>
  );
};

export default Sucursal;
