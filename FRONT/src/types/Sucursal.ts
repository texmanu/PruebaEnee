export default interface ISucursalData {
  id?: any | null,
  Name: string,
  Phone: string,
  Address: string,
  Fax?: string,
  Order_numbers?: number,
  Created_at?:Date| null,
  Deleted_at?:Date| null,
  Administrator_name?:string | null,
  User_id?:number| null
}