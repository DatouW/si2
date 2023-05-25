import {
  HomeOutlined,
  TwitterOutlined,
  UserOutlined,
  AlertOutlined,
  LockOutlined,
  DatabaseOutlined,
  ContainerOutlined,
  StarOutlined,
  BankOutlined,
  CloudOutlined,
  TeamOutlined,
  EditOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "Inicio",
    key: "/home",
    icon: <HomeOutlined />,
  },
  {
    title: "Gestión de Usuarios",
    key: "1",
    icon: <UserOutlined />,
    children: [
      {
        title: "Usuario",
        key: "/usuario",
        icon: <TeamOutlined />,
      },
      {
        title: "Rol",
        key: "/rol",
        icon: <EditOutlined />,
      },
    ],
  },
  {
    title: "Gestión de Ave",
    key: "/ave",
    icon: <TwitterOutlined />,
  },
  {
    title: "Gestión de Producción",
    key: "2",
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
    key: "0",
    icon: <DatabaseOutlined />,
    children: [
      {
        title: "Galpones",
        key: "/galpones",
        icon: <BankOutlined />,
      },
      {
        title: "Ambiente",
        key: "/ambiente",
        icon: <CloudOutlined />,
      },
    ],
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
    title: "Reporte",
    key: "/reporte",
    icon: <ContainerOutlined />,
  },
];

export default menuList;
