import Galpon from "../pages/galpon/galpones";
import Home from "../pages/home";
import Login from "../pages/login";
import Produccion from "../pages/Produccion";
import Salud from "../pages/salud/salud";
import Cuarentena from "../pages/cuarentena";
import Reporte from "../pages/reporte";
import Usuario from "../pages/usuario/usuario";
import Mylayout from "../pages";
import ProdAve from "../pages/Produccion/prod-ave";
import ProdHuevo from "../pages/Produccion/prod-huevo";
import Ambiente from "../pages/galpon/ambiente";
import Rol from "../pages/usuario/rol";
import Ave from "../pages/ave";
import Mortandad from "../pages/galpon/mortandad";
import Password from "../pages/password";
import Vacuna from "../pages/salud/vacuna";
import Bitacora from "../pages/usuario/bitacora";
import PdfReport from "../pages/pdf";

const router = [
  {
    path: "/",
    element: <Mylayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "usuario",
        element: <Usuario />,
      },
      {
        path: "rol",
        element: <Rol />,
      },
      {
        path: "log",
        element: <Bitacora />,
      },
      {
        path: "galpones",
        element: <Galpon />,
      },
      {
        path: "ambiente",
        element: <Ambiente />,
      },
      {
        path: "mortandad",
        element: <Mortandad />,
      },
      {
        path: "ave",
        element: <Ave />,
      },
      {
        path: "produccion",
        element: <Produccion />,
        children: [
          {
            path: "aves",
            element: <ProdAve />,
          },
          {
            path: "huevos",
            element: <ProdHuevo />,
          },
        ],
      },

      {
        path: "cuarentena",
        element: <Cuarentena />,
      },

      {
        path: "salud",
        element: <Salud />,
      },
      {
        path: "vacuna",
        element: <Vacuna />,
      },
      {
        path: "usuario",
        element: <Usuario />,
      },
      {
        path: "reporte",
        element: <Reporte />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/changepwd",
    element: <Password />,
  },
  {
    path: "/pdf",
    element: <PdfReport />,
  },
];

export default router;
