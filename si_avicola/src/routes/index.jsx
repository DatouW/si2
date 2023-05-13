import Galpon from "../pages/galpones";
import Home from "../pages/home";
import Login from "../pages/login";
import Produccion from "../pages/Produccion";
import Salud from "../pages/salud";
import Cuarentena from "../pages/cuarentena";
import Reporte from "../pages/reporte";
import Usuario from "../pages/usuario";
import Mylayout from "../pages";
import ProdAve from "../pages/Produccion/prod-ave";
import ProdHuevo from "../pages/Produccion/prod-huevo";

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
        path: "galpones",
        element: <Galpon />,
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
