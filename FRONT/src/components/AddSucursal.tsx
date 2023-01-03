import React, { useState, ChangeEvent } from "react";
import SucursalService from "../services/SucursalService";

const AddSucursal: React.FC = () => {
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
  const [sucursal, setSucursal] = useState(initialSucursalState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target)
    setSucursal({ ...sucursal, [name]: value });
  };

  const saveSucursal = () => {
    var data = {
      Name: sucursal.Name,
      Administrator_name: sucursal.Administrator_name,
      User_id: 1,
      Phone: sucursal.Phone,
      Address: sucursal.Address,
      Fax: sucursal.Fax,
      Order_numbers: sucursal.Order_numbers
    };
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

fetch("https://localhost:44308/Branchs/CreatedBranch", {'method': 'POST',
'headers': myHeaders,
'body': JSON.stringify(data),
'redirect': 'follow'})
  .then(response => response.text())
  .then(result => setSubmitted(true))
  .catch(error => console.log('error', error));
    // SucursalService.create(data)
    //   .then((response: any) => {
    //     setSucursal({
    //       Id: response.data.Id,
    //       Name: response.data.Name,
    //       Phone: response.data.Phone,
    //       Address: response.data.Address,
    //       Fax: response.data.Fax,
    //       Order_numbers: response.data.Order_numbers,
    //       Created_at: response.data.Created_at,
    //       Deleted_at: response.data.Deleted_at,
    //       Administrator_name: response.data.Administrator_name,
    //       User_id: response.data.User_id

    //     });
    //     setSubmitted(true);
    //     console.log(response.data);
    //   })
    //   .catch((e: Error) => {
    //     console.log(e);
    //   });
  };

  const newSucursal = () => {
    setSucursal(initialSucursalState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Agregado con exito!</h4>
          <button className="btn btn-success" onClick={newSucursal}>
            Agregar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="Name">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              required
              value={sucursal.Name}
              onChange={handleInputChange}
              name="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Administrator_name">Nombre del Administrador</label>
            <input
              type="text"
              className="form-control"
              id="Administrator_name"
              required
              value={sucursal.Administrator_name}
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
              required
              value={sucursal.Phone}
              onChange={handleInputChange}
              name="Phone"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Address">Direccion</label>
            <input
              type="text"
              className="form-control"
              id="Address"
              required
              value={sucursal.Address}
              onChange={handleInputChange}
              name="Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Fax">Fax</label>
            <input
              type="text"
              className="form-control"
              id="Fax"
              value={sucursal.Fax}
              onChange={handleInputChange}
              name="Fax"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Order_numbers">Numero de pedidos</label>
            <input
              type="number"
              className="form-control"
              id="Order_numbers"
              value={sucursal.Order_numbers}
              onChange={handleInputChange}
              name="Order_numbers"
            />
          </div>

          <button onClick={saveSucursal} className="btn btn-success">
            Crear
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSucursal;