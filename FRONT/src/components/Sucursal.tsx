import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import SucursalService from "../services/SucursalService";

const Sucursal: React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialSucursalState = {
    id: null,
    name: "",
    phone: "",
    address: "",
    fax: "",
    order_numbers: 0,
    created_at:null,
    deleted_at:null,
    administrator_name:"",
    user_id:null
  };
  const [currentSucursal, setCurrentSucursal] = useState(initialSucursalState);
  const [message, setMessage] = useState<string>("");

  const getSucursal = (id: string) => {
    //SucursalService.get(id)
    fetch("https://localhost:44308/Branchs/GetBranch/"+id, {'method':'get','redirect':'follow'})
  .then(response => response.text())
  .then(result => setCurrentSucursal(JSON.parse(result)))
  .catch(error => console.log('error', error));
      // .then((response: any) => {
      //   setCurrentSucursal(response.data);
      //   console.log(response.data);
      // })
      // .catch((e: Error) => {
      //   console.log(e);
      // });
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
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

fetch("https://localhost:44308/Branchs/UpdateBranch", {'method': 'PUT',
'headers': myHeaders,
'body': JSON.stringify(currentSucursal),
'redirect': 'follow'})
  .then(response => response.text())
  .then(result => setMessage("La sucursal se ha actualizado exitosamente!"))
  .catch(error => console.log('error', error));
    // SucursalService.update(currentSucursal, 1)
    //   .then((response: any) => {
    //     console.log(response.data);
    //     setMessage("La sucursal se ha actualizado exitosamente!");
    //   })
    //   .catch((e: Error) => {
    //     console.log(e);
    //   });
  };

  const deleteSucursal = () => {
    fetch("https://localhost:44308/Branchs/DeletedBranch?id="+currentSucursal.id+"&user_id=1", {'method': 'PUT',
    'redirect': 'follow'})
  .then(response => response.text())
  .then(result => navigate("/sucursales"))
  .catch(error => console.log('error', error));
    // SucursalService.update2(currentSucursal.id,1)
    //   .then((response: any) => {
    //     console.log(response.data);
    //     navigate("/sucursales");
    //   })
    //   .catch((e: Error) => {
    //     console.log(e);
    //   });
  };

  return (
    <div>
      {currentSucursal ? (
        <div className="edit-form">
          <h4>Sucursal</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={currentSucursal.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
            <label htmlFor="administrator_name">Nombre del Administrador</label>
            <input
              type="text"
              className="form-control"
              id="administrator_name"
              required
              value={currentSucursal.administrator_name}
              onChange={handleInputChange}
              name="administrator_name"
            />
          </div>
            <div className="form-group">
              <label htmlFor="phone">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={currentSucursal.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirrecion</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={currentSucursal.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fax">Fax</label>
              <input
                type="text"
                className="form-control"
                id="fax"
                name="fax"
                value={currentSucursal.fax}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="order_numbers">Numero de Pedidos</label>
              <input
                type="number"
                className="form-control"
                id="order_numbers"
                name="order_numbers"
                value={currentSucursal.order_numbers}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Estado:</strong>
              </label>
              {currentSucursal.deleted_at==null ? "Activo" : "Inactivo"}
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
