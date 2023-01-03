import http from "../http-common";
import ISucursalData from "../types/Sucursal";

const getAll = () => {
   return http.get<ISucursalData>("/GetAllBranch");
};

const get = (id: any) => {
  return http.get(`/GetBranch/${id}`);
};

const create = (data: any) => {
  return http.post("/CreatedBranch", data);
};

const update = (data: any, id:any) => {
  return http.put(`/UpdateBranch/`,{ data, id});
};


const update2 = (id: any, user_id: any) => {
  return http.put<any>(`/DeleteBranch/`,{id, user_id});
};
const findByTitle = (Name: any) => {
  return http.get(`/FindName/${Name}`);
};

const SucursalService = {
  getAll,
  get,
  create,
  update,
  findByTitle,
  update2
};

export default SucursalService;
