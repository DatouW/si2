import { ajax } from "./ajax";

const LOGIN = "/api";
export const reqLogin = (nombre_usuario, contraseña) =>
  ajax(LOGIN + "/login", { nombre_usuario, contraseña }, "POST");
export const reqRegister = (nombre_usuario, contraseña, id_rol) =>
  ajax(LOGIN + "/login", { nombre_usuario, contraseña, id_rol }, "POST");

const PRODAVE = "/prod/aves";
export const reqBatchList = () => ajax(PRODAVE);
export const reqAddBatch = (batch) => ajax(PRODAVE, batch, "POST");
export const reqEditBatch = (batch) => ajax(PRODAVE, batch, "PUT");
export const reqDeleteBatch = (id_lote) => ajax(PRODAVE, { id_lote }, "DELETE");
export const reqSearchBatch = (str) => ajax(PRODAVE + "/search", { str });
export const reqUpdateShedBatch = (id_lote, id_galpon) =>
  ajax(PRODAVE + "/shed", { id_lote, id_galpon }, "PUT");

const GALPON = "/galpon";
export const reqShedList = () => ajax(GALPON);
export const reqAddShed = (galpon) => ajax(GALPON, galpon, "POST");
export const reqUpdateShed = (galpon) => ajax(GALPON, galpon, "PUT");
