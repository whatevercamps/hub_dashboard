import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import MapsAmcharts from "views/MapsAmcharts.jsx";
import UserPage from "views/User.jsx";
import NuevoProyecto from "views/NuevoProyecto.jsx";
import DetailProyecto from "views/DetailProyecto";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/registrarProyecto",
    name: "Registrar Proyecto",
    icon: "nc-icon nc-single-copy-04",
    component: NuevoProyecto,
    layout: "/admin"
  },

  {
    path: "/detailProyecto",
    name: "Detalle Proyecto",
    icon: "nc-icon nc-single-copy-04",
    component: DetailProyecto,
    layout: "/admin"
  },
  // {
  //   path: "/cambios",
  //   name: "Administración",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Mapas",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/maps",
    name: "Mapas",
    icon: "nc-icon nc-pin-3",
    component: MapsAmcharts,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notificaciones (V 2)",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-page",
  //   name: "Equipo control (V 2)",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Otros equipos",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Indicadores",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   pro: true,
  //   path: "/dashboard",
  //   name: "Bootcamps (V 2)",
  //   icon: "nc-icon nc-spaceship",
  //   component: Dashboard,
  //   layout: "/admin"
  // }
];
export default routes;
