import { ajax } from "./ajax";

const LOGIN = "/api";
export const reqLogin = (nombre_usuario, contraseña) =>
  ajax(LOGIN + "/login", { nombre_usuario, contraseña }, "POST");
export const reqRegister = (value) => ajax(LOGIN + "/register", value, "POST");

const USER = "/user";
export const reqUsersList = (id_rol) => ajax(USER, { id_rol });
export const reqChangePwd = (id_user, newpwd) =>
  ajax(USER + "/pwd", { id_user, newpwd }, "PUT");

const ROL = "/role";
export const reqRoleList = () => ajax(ROL);
export const reqAddRole = (nombre) =>
  ajax(ROL + "/addRole", { nombre }, "POST");
export const reqUpdateRole = (id_rol, permisos) =>
  ajax(ROL + "/updateRole", { id_rol, permisos }, "PUT");

const AVE = "/poultry";
export const reqSpeciesList = () => ajax(AVE);
export const reqAddSpecies = (especie) => ajax(AVE, { especie }, "POST");
export const reqUpdateSpecies = (id, especie) =>
  ajax(AVE, { id, especie }, "PUT");

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

const AMBIENTE = "/weather";
export const reqAmbienteList = () => ajax(AMBIENTE);
export const reqAddAmbiente = (ambiente) => ajax(AMBIENTE, ambiente, "POST");
export const reqAddBatchAmbiente = (ambLote) =>
  ajax(AMBIENTE + "/batch", ambLote, "POST");
