import {
  HomeOutlined,
  TwitterOutlined,
  UserOutlined,
  AlertOutlined,
  LockOutlined,
  DatabaseOutlined,
  ContainerOutlined,
  StarOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "Inicio",
    key: "/home",
    icon: <HomeOutlined />,
  },
  {
    title: "Gestión de Producción",
    key: null,
    icon: <TwitterOutlined />,
    children: [
      {
        title: "Aves",
        key: "/produccion/aves",
        icon: <TwitterOutlined />,
      },
      {
        title: "Huevos",
        key: "/produccion/huevos",
        icon: <StarOutlined />,
      },
    ],
  },
  {
    title: "Gestión de Galpones",
    key: "/galpones",
    icon: <DatabaseOutlined />,
  },
  {
    title: "Gestión de Salud",
    key: "/salud",
    icon: <AlertOutlined />,
  },
  {
    title: "Gestión de Cuarentena",
    key: "/cuarentena",
    icon: <LockOutlined />,
  },
  {
    title: "Gestión de Usuarios",
    key: "/usuario",
    icon: <UserOutlined />,
  },
  {
    title: "Reporte",
    key: "/reporte",
    icon: <ContainerOutlined />,
  },
];

export default menuList;
