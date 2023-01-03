import React, { useState, useEffect, useMemo, useRef } from "react";
import SucursalService from "../services/SucursalService";
import { useTable } from "react-table";
import { useNavigate} from 'react-router-dom';
const SucursalesList = (props:any) => {
  const [sucursales, setSucursales] = useState<any>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const SucursalesRef = useRef(sucursales);
  const nav = useNavigate()
  SucursalesRef.current = sucursales;

  useEffect(() => {
    retrieveSucursales();
  }, []);

  const onChangeSearchTitle = (e: { target: { value: any; }; }) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveSucursales = () => {
    
    SucursalService.getAll()
      .then((response) => {
        console.log(response)
        setSucursales(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveSucursales();
  };



  const findByTitle = () => {
    SucursalService.findByTitle(searchTitle)
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const OpenSurcusal = (rowIndex: number) => {
    const id = SucursalesRef.current[rowIndex].Id;
    
    nav("/sucursal/" + id);
  };

  const deleteSucursal = (rowIndex: number) => {
    const id = SucursalesRef.current[rowIndex].id;

    SucursalService.update2(id, 1)
      .then((response) => {
        nav("/Sucursales");

        let newSucursales = [...SucursalesRef.current];
        newSucursales.splice(rowIndex, 1);

        setSucursales(newSucursales);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "Id",
      },
      {
        Header: "Nombre",
        accessor: "Name",
      },
      {
        Header: "Telefomo",
        accessor: "Phone",
      },
      {
        Header: "Direccion",
        accessor: "Address",
      },
      {
        Header: "Fax",
        accessor: "Fax",
      },
      {
        Header: "Pedidos",
        accessor: "Order_numbers",
      },
      {
        Header: "Administrador",
        accessor: "Administrator_name",
      },
      {
        Header: "Acciones",
        accessor: "actions",
        Cell: (props: { row: { id: any; }; }) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => OpenSurcusal(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteSucursal(rowIdx)}>
                <i className="fas fa-trash btn-danger action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data:  sucursales
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SucursalesList;