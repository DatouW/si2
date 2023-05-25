import Galpon from "../pages/galpon/galpones";
import Home from "../pages/home";
import Login from "../pages/login";
import Produccion from "../pages/Produccion";
import Salud from "../pages/salud";
import Cuarentena from "../pages/cuarentena";
import Reporte from "../pages/reporte";
import Usuario from "../pages/usuario/usuario";
import Mylayout from "../pages";
import ProdAve from "../pages/Produccion/prod-ave";
import ProdHuevo from "../pages/Produccion/prod-huevo";
import Ambiente from "../pages/galpon/ambiente";
import Rol from "../pages/usuario/rol";
import Ave from "../pages/ave";

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
        path: "galpones",
        element: <Galpon />,
      },
      {
        path: "ambiente",
        element: <Ambiente />,
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
];

export default router;
